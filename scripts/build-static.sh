#!/usr/bin/env bash
# بناء نسخة ثابتة (HTML جاهز) داخل مجلد dist لرفعها إلى public_html
set -euo pipefail

PORT="${STATIC_PORT:-4399}"
ROUTES=("/" "/privacy" "/support")

echo "==> 1/4 بناء المشروع"
npx vite build

OUT=".static-out"
rm -rf "$OUT"
cp -r dist/client "$OUT"

echo "==> 2/4 تشغيل الخادم المؤقت لتوليد HTML"
npx wrangler dev -c dist/server/wrangler.json --port "$PORT" --ip 127.0.0.1 > /tmp/lamha-static-server.log 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT

for i in $(seq 1 90); do
  curl -sf -o /dev/null "http://127.0.0.1:$PORT/" && break
  sleep 2
done

echo "==> 3/4 توليد الصفحات"
for route in "${ROUTES[@]}"; do
  if [ "$route" = "/" ]; then
    target="$OUT/index.html"
  else
    mkdir -p "$OUT$route"
    target="$OUT$route/index.html"
  fi
  code=$(curl -s -o "$target" -w "%{http_code}" "http://127.0.0.1:$PORT$route")
  if [ "$code" != "200" ]; then
    echo "فشل توليد $route (HTTP $code)" >&2
    exit 1
  fi
  echo "   ✔ $route"
done

cleanup
trap - EXIT

echo "==> 4/4 تجهيز مجلد dist"
[ -f public/.htaccess ] && cp public/.htaccess "$OUT/.htaccess"
rm -rf dist
mv "$OUT" dist

echo "تم ✅ الملفات جاهزة في dist/ — ارفعها بـ: cp -r dist/. /path/to/public_html/"
ls -la dist | head -20
