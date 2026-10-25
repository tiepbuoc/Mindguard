// Cấu hình Firebase của dự án Mindguard.
// Lấy từ: Firebase Console > Project settings > General > Your apps > Web app.
// Lưu ý: apiKey của Firebase Web KHÔNG phải mật khẩu — nó chỉ định danh dự án.
// Việc bảo vệ dữ liệu phụ thuộc vào firestore.rules, không phụ thuộc vào việc giấu key này.
export const firebaseConfig = {
  apiKey: "AIzaSyD6TrLmQSyHv4vGRjlJpxe2Pdg1khihaK8",
  authDomain: "mindguard-8ad13.firebaseapp.com",
  databaseURL: "https://mindguard-8ad13-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mindguard-8ad13",
  storageBucket: "mindguard-8ad13.firebasestorage.app",
  messagingSenderId: "99340421156",
  appId: "1:99340421156:web:6a3643e44cfc20a77330b1",
  measurementId: "G-NLSK7ZHER5"
};

// Dùng cho extension (gọi Firestore/Auth qua REST API, không qua SDK)
export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
export const FIREBASE_API_KEY = firebaseConfig.apiKey;
