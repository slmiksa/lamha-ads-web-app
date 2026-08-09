<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

const DEFAULT_PASSWORD_HASH = '0e2292e0fde71e24022fc18496fd7ba7e25c342b790450ee9897d7bcc6261ce1';

function secretFile(): string
{
    return __DIR__ . DIRECTORY_SEPARATOR . 'admin-secret.json';
}

/** The stored hash is the single source of truth shared by every device. */
function storedPasswordHash(): string
{
    $file = secretFile();
    if (is_readable($file)) {
        $raw = file_get_contents($file);
        $data = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($data) && isset($data['passwordHash']) && is_string($data['passwordHash']) && strlen($data['passwordHash']) === 64) {
            return strtolower($data['passwordHash']);
        }
    }
    $configured = getenv('LAMHA_ADMIN_PASSWORD_HASH');
    if (is_string($configured) && strlen($configured) === 64) {
        return strtolower($configured);
    }
    return DEFAULT_PASSWORD_HASH;
}

function writeAtomic(string $destination, string $contents, string $prefix): bool
{
    $temporary = tempnam(__DIR__, $prefix);
    if ($temporary === false || file_put_contents($temporary, $contents, LOCK_EX) === false) {
        if (is_string($temporary) && file_exists($temporary)) {
            @unlink($temporary);
        }
        return false;
    }
    @chmod($temporary, 0644);
    if (!@rename($temporary, $destination)) {
        @unlink($temporary);
        return false;
    }
    clearstatcache(true, $destination);
    return true;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength < 1 || $contentLength > 12 * 1024 * 1024) {
    respond(413, ['ok' => false, 'message' => 'حجم المحتوى غير صالح']);
}

$raw = file_get_contents('php://input');
if ($raw === false) {
    respond(400, ['ok' => false, 'message' => 'تعذّرت قراءة الطلب']);
}

$request = json_decode($raw, true);
if (!is_array($request)) {
    respond(400, ['ok' => false, 'message' => 'بيانات الطلب غير صالحة']);
}

$action = isset($request['action']) && is_string($request['action']) ? $request['action'] : 'publish';
$password = isset($request['password']) && is_string($request['password']) ? $request['password'] : '';

// Every action requires the current password.
if ($password === '' || !hash_equals(storedPasswordHash(), hash('sha256', $password))) {
    // Slow down brute-force attempts a little.
    usleep(300000);
    respond(401, ['ok' => false, 'message' => 'كلمة المرور غير صحيحة']);
}

if ($action === 'verify') {
    respond(200, ['ok' => true, 'message' => 'تم التحقق']);
}

if ($action === 'change-password') {
    $next = isset($request['newPassword']) && is_string($request['newPassword']) ? trim($request['newPassword']) : '';
    if (mb_strlen($next) < 6) {
        respond(422, ['ok' => false, 'message' => 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل']);
    }
    $payload = json_encode(
        ['passwordHash' => hash('sha256', $next), 'updatedAt' => gmdate('c')],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    if ($payload === false || !writeAtomic(secretFile(), $payload, 'lamha-secret-')) {
        respond(500, ['ok' => false, 'message' => 'تعذّر حفظ كلمة المرور على السيرفر']);
    }
    respond(200, ['ok' => true, 'message' => 'تم تغيير كلمة المرور لجميع الأجهزة']);
}

$content = $request['content'] ?? null;
$requiredSections = ['brand', 'contact', 'assistant', 'nav', 'home', 'partners', 'support', 'privacy', 'footer'];
if (!is_array($content)) {
    respond(422, ['ok' => false, 'message' => 'محتوى الموقع غير صالح']);
}
foreach ($requiredSections as $section) {
    if (!array_key_exists($section, $content) || !is_array($content[$section])) {
        respond(422, ['ok' => false, 'message' => 'قسم مفقود: ' . $section]);
    }
}

$encoded = json_encode($content, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
if ($encoded === false || strlen($encoded) > 10 * 1024 * 1024) {
    respond(422, ['ok' => false, 'message' => 'تعذّر تجهيز ملف المحتوى']);
}

if (!writeAtomic(__DIR__ . DIRECTORY_SEPARATOR . 'content.json', $encoded, 'lamha-content-')) {
    respond(500, ['ok' => false, 'message' => 'تعذّر الكتابة. تأكد من صلاحية مجلد public_html']);
}

respond(200, [
    'ok' => true,
    'message' => 'تم نشر التعديلات لجميع الأجهزة',
    'updatedAt' => gmdate('c'),
]);
