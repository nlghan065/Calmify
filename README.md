TÊN DỰ ÁN: CALMIFY – FRONTEND

1. MÔ TẢ
   Calmify là ứng dụng hỗ trợ sức khỏe tinh thần, cho phép người dùng:

- Đăng nhập / đăng ký
- Làm bài test tâm lý (PHQ-9)
- Chat hỗ trợ tinh thần
- Xem thống kê cảm xúc
- Truy cập hotline hỗ trợ

Sinh viên phụ trách: Gia Hân

---

2. CÔNG NGHỆ SỬ DỤNG (TOOLS & FRAMEWORKS)

- Node.js (v18+)
- ReactJS
- Vite
- Ant Design (UI)
- Axios
- React Router DOM
- React Hook Form
- ESLint

---

3. HƯỚNG DẪN CÀI ĐẶT & CHẠY CHƯƠNG TRÌNH

Bước 1: Cài đặt NodeJS  
Tải tại: https://nodejs.org

Bước 2: Giải nén source code

Bước 3: Mở terminal tại thư mục FRONTEND và chạy:

npm install

Bước 4: Chạy chương trình:

npm run dev

Bước 5: Truy cập trên trình duyệt:

http://localhost:5173

---

4. CẤU TRÚC THƯ MỤC CHÍNH

- src/api : Giao tiếp API
- src/pages : Các trang chính (auth, test, profile, ...)
- src/components : Component dùng chung
- src/Layout : Layout, Header, Sidebar
- src/context : Quản lý state toàn cục
- src/style : CSS / Module CSS

---

5. GHI CHÚ

- Thư mục node_modules không được đính kèm theo yêu cầu
- File .env đã được loại bỏ thông tin nhạy cảm (nếu có)
