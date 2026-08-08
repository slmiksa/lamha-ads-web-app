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

$password = isset($request['password']) && is_string($request['password']) ? $request['password'] : '';
$configuredHash = getenv('LAMHA_ADMIN_PASSWORD_HASH');
$passwordHash = is_string($configuredHash) && strlen($configuredHash) === 64
    ? strtolower($configuredHash)
    : '0e2292e0fde71e24022fc18496fd7ba7e25c342b790450ee9897d7bcc6261ce1';

if ($password === '' || !hash_equals($passwordHash, hash('sha256', $password))) {
    respond(401, ['ok' => false, 'message' => 'كلمة المرور غير صحيحة']);
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

$destination = __DIR__ . DIRECTORY_SEPARATOR . 'content.json';
$temporary = tempnam(__DIR__, 'lamha-content-');
if ($temporary === false || file_put_contents($temporary, $encoded, LOCK_EX) === false) {
    if (is_string($temporary) && file_exists($temporary)) {
        @unlink($temporary);
    }
    respond(500, ['ok' => false, 'message' => 'تعذّر الكتابة. تأكد من صلاحية مجلد public_html']);
}

@chmod($temporary, 0644);
if (!@rename($temporary, $destination)) {
    @unlink($temporary);
    respond(500, ['ok' => false, 'message' => 'تعذّر استبدال ملف content.json']);
}

clearstatcache(true, $destination);
respond(200, [
    'ok' => true,
    'message' => 'تم نشر التعديلات لجميع الأجهزة',
    'updatedAt' => gmdate('c'),
]);