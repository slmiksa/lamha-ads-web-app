#!/usr/bin/env bash
# بناء نسخة ثابتة (HTML جاهز) داخل مجلد dist لرفعها إلى public_html
set -euo pipefail

PORT="${PORT:-4183}"
ROUTES=("/" "/privacy" "/support")
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "==> 1/4 بناء المشروع"
rm -rf dist
npx vite build

if [ ! -d dist/client ]; then
  echo "فشل البناء: مجلد dist/client غير موجود" >&2
  exit 1
fi

echo "==> 2/4 تشغيل خادم مؤقت لتوليد صفحات HTML"
npx wrangler@latest --cwd dist/server dev --port "$PORT" --ip 127.0.0.1 > /tmp/lamha-preview.log 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; rm -rf "$STAGE"; }
trap cleanup EXIT

ready=0
for _ in $(seq 1 60); do
  if curl -sf -o /dev/null "http://127.0.0.1:$PORT/"; then ready=1; break; fi
  sleep 1
done
if [ "$ready" != "1" ]; then
  echo "تعذّر تشغيل الخادم المؤقت:" >&2
  cat /tmp/lamha-preview.log >&2
  exit 1
fi

echo "==> 3/4 توليد الصفحات"
cp -a dist/client/. "$STAGE/"
for route in "${ROUTES[@]}"; do
  if [ "$route" = "/" ]; then
    out="$STAGE/index.html"
  else
    mkdir -p "$STAGE$route"
    out="$STAGE$route/index.html"
  fi
  curl -sf "http://127.0.0.1:$PORT$route" -o "$out"
  if [ ! -s "$out" ]; then
    echo "فشل توليد الصفحة $route" >&2
    exit 1
  fi
  echo "   ✔ $route"
done

kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true

echo "==> 4/4 تجهيز مجلد dist للرفع"
[ -f public/.htaccess ] && cp public/.htaccess "$STAGE/.htaccess"
cp "$STAGE/index.html" "$STAGE/404.html" 2>/dev/null || true
rm -rf dist
mkdir -p dist
cp -a "$STAGE/." dist/

echo "تم ✅ الملفات جاهزة في dist/"
echo "للرفع نفّذ: cp -a dist/. /home/lamhaads.sa/public_html/"
ls -la dist | head -20
