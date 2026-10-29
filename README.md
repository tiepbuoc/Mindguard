# Mindguard — Web app (GitHub Pages) + Chrome Extension (Firebase)

Bản clone của POP-AI, đổi tên và giao diện (navy / indigo / cyan). Cấu trúc và cách deploy giống bản gốc:

- Web app tĩnh ở gốc repo (`index.html`, `app.html`, `teacher.html`, `admin.html`, `css/`, `js/`, `icons/`) → GitHub Pages.
- `extension/` → Chrome Extension (Load unpacked, hoặc tải `downloads/mindguard-tracker-extension.zip` ở trang Cài đặt).
- `firebase/` → rules, deploy bằng Firebase CLI: `cd firebase && firebase use mindguard-8ad13 && firebase deploy --only firestore:rules,database`.
- `n8n/` → `popai-gateway.json` (bản sao nguyên vẹn của POP-AI, không dùng cho Mindguard) và **`mindguard-gateway.json`** (luồng riêng của Mindguard, xem `HUONG-DAN-MINDGUARD-GATEWAY.md`).

Firebase project: `mindguard-8ad13` (cấu hình trong `js/firebase-config.js` và `extension/firebase-config.js`, hai file phải giống nhau).

## Việc cần làm sau khi deploy
1. Firebase Console: bật Authentication → Email/Password; tạo Firestore (Production) và Realtime Database (asia-southeast1).
2. Tạo document `config/teacherAccess` với field `code` (mã xác thực giáo viên).
3. Nếu đổi URL deploy, sửa `APP_URL` trong `extension/config.js` rồi nén lại zip trong `downloads/`.
4. Trợ lý AI gọi `/mg-gw-token` và `/mg-gw-chat` trên n8n dùng chung (`js/gateway-config.js`). Import luồng `n8n/mindguard-gateway.json` theo hướng dẫn trước khi dùng.
