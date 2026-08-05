#!/usr/bin/env bash
# بناء تطبيق SPA مباشر داخل dist لرفعه إلى Apache/public_html
set -euo pipefail

echo "==> بناء نسخة SPA"
npx vite build --config vite.spa.config.ts

if [ ! -s dist/index.html ]; then
  echo "فشل البناء: dist/index.html غير موجود" >&2
  exit 1
fi

# ننسخه صراحة لأن بعض أدوات البناء تتجاهل الملفات المخفية.
cp public/.htaccess dist/.htaccess

echo "تم ✅ تم إنشاء dist/index.html و dist/.htaccess"
echo "للرفع مع ملف .htaccess نفّذ:"
echo "cp -a dist/. /home/lamhaads.sa/public_html/"
ls -la dist | head -20
