#!/usr/bin/env bash
# بناء نسخة ثابتة (HTML جاهز) داخل مجلد dist لرفعها إلى public_html
set -euo pipefail

ROUTES=("/" "/privacy" "/support")

echo "==> 1/3 بناء النسخة الثابتة"
npx vite build

echo "==> 2/3 التحقق من الصفحات"
for route in "${ROUTES[@]}"; do
  if [ "$route" = "/" ]; then
    target="dist/index.html"
  else
    target="dist$route/index.html"
  fi
  if [ ! -f "$target" ]; then
    echo "فشل البناء: الملف $target غير موجود" >&2
    exit 1
  fi
  echo "   ✔ $route"
done

echo "==> 3/3 إضافة إعدادات Apache"
[ -f public/.htaccess ] && cp public/.htaccess dist/.htaccess

echo "تم ✅ الملفات جاهزة في dist/"
echo "للرفع نفّذ: cp -a dist/. /home/lamhaads.sa/public_html/"
ls -la dist | head -20
