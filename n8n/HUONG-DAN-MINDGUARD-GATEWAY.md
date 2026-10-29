# Mindguard Gateway — luồng n8n riêng (cơ chế y hệt POP-AI)

File: `n8n/mindguard-gateway.json` (22 node). Dùng chung **cùng n8n, cùng credential `LLM API Key`**, nhưng tách biệt hoàn toàn với luồng POP-AI:

| | POP-AI | Mindguard |
|---|---|---|
| Webhook | `/popai-gw-token`, `/popai-gw-chat`, `/popai-gw-admin` | `/mg-gw-token`, `/mg-gw-chat`, `/mg-gw-admin` |
| Tên node | `Config`, `LLM 1`… | `MG Config`, `MG LLM 1`… |
| Firebase xác minh đăng nhập | project `tuanizz` | project `mindguard-8ad13` (apiKey riêng trong `MG Config`) |
| Bộ nhớ (hạn mức, log, thống kê, công tắc tắt, khoá ký token) | static data gốc | static data nhánh riêng `mg` |
| Token (JWT) | `iss: popai-gw` | `iss: mindguard-gw`, ký bằng khoá riêng → token của bên này không dùng được cho bên kia |
| Prompt trợ lý | "Trợ lý POP-AI" | "Trợ lý Mindguard" |

Luồng POP-AI không bị sửa gì.

## Cách đưa vào n8n (chọn 1)

**A. Cùng một workflow với POP-AI (đúng yêu cầu "cùng workflow")**
1. Mở workflow `POP-AI Gateway` hiện có.
2. Mở `mindguard-gateway.json` bằng trình soạn thảo, **Ctrl+A → Ctrl+C**.
3. Quay lại canvas n8n, bấm vào vùng trống, **Ctrl+V** → 22 node MG xuất hiện (tên đều có tiền tố `MG `, không trùng node cũ).
4. Ở `MG LLM 1/2/3` chọn credential `LLM API Key` (cùng credential POP-AI đang dùng).
5. **Save** rồi bật lại workflow (Active/Publish).

**B. Workflow riêng:** n8n → Workflows → Import from File → chọn `mindguard-gateway.json` → gán credential → Active. Cách này tách luôn cả bộ nhớ lẫn vòng đời bật/tắt.

## Việc cần chỉnh trong `MG Config`
- `allowedOrigins`: mặc định `https://tiepbuoc.github.io`. Host ở domain khác thì thêm vào (không có đường dẫn).
- `adminKey`: chuỗi ngẫu nhiên ≥ 16 ký tự (để rỗng = tắt endpoint admin).
- Hạn mức (`perUserPerDay`, `dailyTokenCap`…) tách riêng với POP-AI.

## Kiểm tra nhanh sau khi bật
```bash
H="https://n8nhosting-67079049.phoaify.com/webhook"
curl -i -X POST $H/mg-gw-token -H "Origin: https://tiepbuoc.github.io" -d '{"id_token":"abc"}'
# mong đợi: 400 bad_request (id_token quá ngắn) -> webhook đã sống và đúng origin
curl -s -X POST $H/mg-gw-admin -H "x-admin-key: <adminKey>" -d '{"action":"stats"}'
```

Cơ chế, mã lỗi, giới hạn cần biết: giống `HUONG-DAN-N8N-GATEWAY.md` của POP-AI.
