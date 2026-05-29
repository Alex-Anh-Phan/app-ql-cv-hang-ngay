# Design Specifications: DeepWork Orbit

Bản đặc tả kỹ thuật giao diện được trích xuất trực tiếp từ bản vẽ Mockup của người dùng.

---

## 1. Hệ Màu Sắc (Color Palette)

Hệ màu sử dụng phong cách Dark Mode cao cấp với độ tương phản cao cho các vùng trạng thái (Accent Colors) của Ma trận Eisenhower.

| Tên Màu | Giá Trị Hex / HSL | Vùng Sử Dụng |
| :--- | :--- | :--- |
| **Main Background** | `#08121f` | Nền chính của toàn bộ trang |
| **Sidebar Background** | `#03070d` | Nền thanh điều hướng trái |
| **Glass Card Surface** | `rgba(13, 25, 41, 0.6)` | Nền mờ kính của các ô và thẻ công việc |
| **Text Primary** | `#ffffff` | Tiêu đề, văn bản chính |
| **Text Secondary/Muted**| `#72849a` | Mô tả ngắn, nhãn phụ |
| **Active Nav Link** | `#1bb1d7` | Màu chữ và icon menu đang chọn |
| **Nút Accent (Cyan)** | `#74ebfe` | Nút "+ Add Task", hover sang `#4fd6eb` |

### 🎨 4 Mức Độ Ma Trận (Eisenhower Quadrants accents):
*   **Q1: Do Immediately (Urgent & Important)**
    *   Màu chủ đạo: `#ff4d4d` (Đỏ Neon)
    *   Nền Glass Card: `rgba(255, 77, 77, 0.05)` kèm viền trái màu `#ff4d4d` dày `3px`.
*   **Q2: Schedule & Plan (Important - Not Urgent)**
    *   Màu chủ đạo: `#ffb41d` (Vàng Gold)
    *   Nền Glass Card: `rgba(255, 180, 29, 0.05)` kèm viền trái màu `#ffb41d` dày `3px`.
*   **Q3: Delegate Tasks (Urgent - Not Important)**
    *   Màu chủ đạo: `#26beff` (Xanh Cyan)
    *   Nền Glass Card: `rgba(38, 190, 255, 0.05)` kèm viền trái màu `#26beff` dày `3px`.
*   **Q4: Eliminate & Drop (Not Urgent - Not Important)**
    *   Màu chủ đạo: `#516277` (Xám Slate)
    *   Nền Glass Card: `rgba(81, 98, 119, 0.05)` kèm viền trái màu `#516277` dày `3px`.

---

## 2. Font Chữ & Typography

Sử dụng Google Fonts: **Inter** (hoặc **Outfit** để tạo cảm giác bo cong công nghệ cao).

*   **App Logo Name (DeepWork Orbit):** Font-weight `800`, màu `#74ebfe`
*   **Tiêu đề lớn (Workspace Priority):** Font-size `32px`, font-weight `700`
*   **Tiêu đề Ô Ma Trận (Q1, Q2...):** Font-size `18px`, font-weight `700`, uppercase
*   **Tên Task:** Font-size `14px`, font-weight `500`

---

## 3. Cấu Trúc Các Component Giao Diện

### 🧭 3.1. Sidebar (Trái)
*   **Logo & App Name:** Hiển thị `DeepWork Orbit` rực rỡ, kèm text phụ `Orbit - HIGH PERFORMANCE`.
*   **Navigation Links:** Dashboard, Analytics, Focus Mode, Archive. Các liên kết có icon tinh tế dạng outline.
*   **Upgrade Banner:** Khối glassmorphism nhỏ "Upgrade to Pro" kèm nút nhấn "UPGRADE NOW" chuyển sắc thái mờ.
*   **Footer Links:** Settings, Support.

### 🔍 3.2. Topbar
*   **Search Box:** Ô tìm kiếm bo tròn góc rộng với icon kính lúp mờ `Search tasks...`.
*   **Add Task Button:** Nút nổi bật rực rỡ với icon `+ Add Task` có bo góc mềm, chữ đen đậm tương phản nền cyan.
*   **User Avatar Profile:** Tên `Alex Rivera`, subtitle `Focus Level: High` đi kèm avatar hình tròn cao cấp.

### 🔲 3.3. Ma Trận 2x2 Grid (Eisenhower Board)
*   **Layout:** Grid 2 cột trên Desktop, responsive thành 1 cột trên Mobile.
*   **Quadrant Cards:** Nền mờ kính (`backdrop-filter: blur(16px)`), viền mờ sáng xung quanh (`border: 1px solid rgba(255, 255, 255, 0.05)`).
*   **Task Item Row:** Thẻ glassmorphism nằm ngang. Có nút checkbox hình tròn màu theo Accent của quadrant. Tên task khi check sẽ gạch ngang và mờ đi 50%.
*   **Action button:** Nút `ADD TASK TO QX` mờ nằm ở cuối mỗi Ô Ma trận để thêm nhanh task tương ứng.

### 🎯 3.4. Floating Stats Badge (Góc dưới phải)
*   Khối hiển thị tiến trình: `TODAY'S FOCUS` đạt `84%` kèm nhãn vòng tròn xếp hạng `A+` tỏa sáng neon.

---

## 4. Hiệu Ứng Nâng Cao (Micro-animations)
*   **Hover states:** Thẻ task hơi nhấc lên (`transform: translateY(-2px)`) và bóng đổ neon sáng nhẹ khi di chuột qua.
*   **Drag & Drop active:** Khi bắt đầu kéo một task, các ô ma trận đích sẽ hiện viền phát sáng mờ ảo theo màu accent tương ứng để thu hút điểm nhìn.
