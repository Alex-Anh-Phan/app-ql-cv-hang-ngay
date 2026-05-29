# 🎨 DESIGN: Eisenhower Task Manager

**Ngày tạo:** 2026-05-29
**Dựa trên:** [eisenhower_spec.md](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/docs/specs/eisenhower_spec.md)
**Thiết kế bởi:** Minh (Antigravity Solution Designer)

---

## 1. Cách Lưu Thông Tin (Database / State Schema)

Ứng dụng chạy phía Client-side (Local Storage) nên dữ liệu sẽ được lưu dưới dạng JSON String trong LocalStorage. Dưới đây là sơ đồ cấu trúc dữ liệu:

```
┌─────────────────────────────────────────────────────────────┐
│  📋 TASKS COLLECTION (Key: "eisenhower_tasks")               │
│  ├── id: string (uuidv4)                                    │
│  ├── title: string                                          │
│  ├── description: string                                    │
│  ├── quadrant: number (1 | 2 | 3 | 4)                       │
│  ├── isCompleted: boolean                                   │
│  ├── dueDate: string (ISO 8601 Date String hoặc null)        │
│  └── createdAt: string (ISO 8601 Date String)               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ⚙️ SETTINGS CONFIG (Key: "eisenhower_settings")              │
│  ├── alarmSound: boolean (Mặc định: true)                    │
│  └── pushNotifications: boolean (Mặc định: false)            │
└─────────────────────────────────────────────────────────────┘
```

- **Mối liên hệ:** Dữ liệu độc lập, được truy xuất trực tiếp và lưu trữ an toàn trong Browser Local Storage.

---

## 2. Thiết Kế Màn Hình (Single Page Layout)

Ứng dụng được thiết kế trên một trang duy nhất (Single Page App) với hiệu ứng **Glassmorphism** mượt mà, bao gồm 3 khối nội dung chính:

### 🏠 Khối 1: Ma Trận 4 Ô (Dashboard chính)
- **Giao diện:** Chia làm 4 ô 2x2. Mỗi ô tương ứng với một quadrant có tiêu đề, màu sắc đại diện (Đỏ, Vàng, Xanh, Xám) có độ trong suốt cao (opacity 10-15%) và viền mờ sáng.
- **Thao tác:** Kéo thả trực quan. Có nút `+` góc mỗi ô để thêm nhanh task vào ô đó.

### 📊 Khối 2: Bảng Thống Kê & Phân Tích (Analytics View)
- **Giao diện:** Biểu đồ donut (hình bánh) thể hiện phần trăm phân bổ công việc ở 4 nhóm và biểu đồ tiến trình hoàn thành.
- **Thao tác:** Nhấp chuột để lọc các tác vụ theo mức độ ưu tiên hoặc xem lịch sử hoàn thành.

### ⚙️ Khối 3: Cài Đặt (Configuration Panel)
- **Giao diện:** Khu vực chuyển đổi (toggle switches) cho tính năng Âm báo thức và Thông báo đẩy của trình duyệt.

---

## 3. Hành Trình Người Dùng (Luồng Hoạt Động)

### 📍 HÀNH TRÌNH 1: Kéo thả đổi độ ưu tiên task
1. Người dùng mở ứng dụng -> Giao diện Glassmorphism mờ mượt mà tải mock data.
2. Người dùng nhấn giữ một thẻ task ở ô **Q2 (Quan trọng - Chưa khẩn cấp)**.
3. Kéo thẻ di chuyển qua ô **Q1 (Quan trọng - Khẩn cấp)** -> Ô Q1 đổi màu nền mờ nhạt để biểu thị sẵn sàng nhận task.
4. Người dùng thả chuột -> Task thay đổi thuộc tính `quadrant` thành `1`. Hệ thống đồng bộ vào `eisenhower_tasks` trong LocalStorage ngay lập tức.

### 📍 HÀNH TRÌNH 2: Hẹn giờ & Cảnh báo deadline
1. Người dùng tạo task mới, nhập `dueDate` là 10 phút tiếp theo và bật bật chuông báo.
2. Ứng dụng chạy vòng lặp ngầm 60 giây một lần kiểm tra `dueDate`.
3. Khi thời gian hiện tại khớp với `dueDate` -> Trình duyệt phát âm chuông tinh tế và hiển thị một thông báo Popup (Web Notification) nếu được cấp quyền.

---

## 4. Quy Tắc Kiểm Tra & Test Cases (Acceptance Criteria)

### 🧪 TC-01: Drag & Drop thay đổi Quadrant
* **Given (Bối cảnh):** Người dùng có ít nhất một task ở Ô Q2.
* **When (Hành động):** Kéo task này thả vào Ô Q1.
* **Then (Kết quả mong đợi):**
  * ✓ Task biến mất khỏi Ô Q2 và xuất hiện ở đầu danh sách Ô Q1.
  * ✓ Thuộc tính `quadrant` của task trong LocalStorage chuyển từ `2` thành `1`.
  * ✓ Hiệu ứng thả (drop animation) diễn ra mượt mà dưới 0.2 giây.

### 🧪 TC-02: Thống kê tự động cập nhật
* **Given (Bối cảnh):** Biểu đồ donut đang hiển thị đúng tỉ lệ phân bổ task.
* **When (Hành động):** Người dùng bấm hoàn thành (check) một task trong Ô Q1.
* **Then (Kết quả mong đợi):**
  * ✓ Task đổi màu mờ nhạt, gạch ngang chữ.
  * ✓ Biểu đồ Doughnut cập nhật lại tỷ lệ hoàn thành tác vụ ngay lập tức.

### 🧪 TC-03: Nhắc nhở khi hết hạn
* **Given (Bối cảnh):** Task có hẹn giờ đến hạn vào lúc `20:40`. App đang mở trên tab trình duyệt.
* **When (Hành động):** Thời gian máy tính chạm mốc `20:40`.
* **Then (Kết quả mong đợi):**
  * ✓ Trình duyệt phát ra âm thanh báo hiệu.
  * ✓ Thông báo Notification hiển thị tiêu đề và nội dung công việc.
