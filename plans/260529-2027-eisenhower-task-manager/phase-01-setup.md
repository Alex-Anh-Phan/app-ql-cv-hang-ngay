# Phase 01: Setup Environment
Status: ✅ Complete
Dependencies: None

## Objective
Tạo bộ khung dự án React + Vite, cài đặt các thư viện cơ bản, cấu hình cấu trúc thư mục sạch và thiết kế hệ thống CSS Custom Properties cho Glassmorphism & Dark Mode.

## Requirements
### Functional
- Khởi tạo dự án React + Vite trong thư mục root `app-quan-ly-cong-viec`.
- Cấu hình cấu trúc thư mục rõ ràng: `/src/components`, `/src/context`, `/src/hooks`, `/src/styles`, `/src/utils`.

### Non-Functional
- Cấu hình ESLint & Prettier.
- Setup file `.env.example`.
- Thiết kế hệ thống CSS Custom Properties trong `/src/styles/variables.css` đáp ứng Glassmorphism & Sleek Dark Mode.

## Implementation Steps
1. [x] Khởi chạy lệnh khởi tạo React + Vite (sẽ thực hiện ở bước /code).
2. [x] Dọn dẹp các file CSS và component mặc định không dùng của Vite.
3. [x] Tạo cấu trúc thư mục con trong `/src`.
4. [x] Tạo file `/src/styles/variables.css` chứa định nghĩa màu sắc HSL, hiệu ứng Glassmorphism (backdrop-filter, border-radius, shadows).
5. [x] Tích hợp `variables.css` vào `index.css` và `main.jsx`.
6. [x] Cài đặt Lucide React làm bộ icon: `npm install lucide-react`.

## Files to Create/Modify
- `/src/styles/variables.css` - Chứa CSS variables cho UI.
- `/src/index.css` - Chứa các reset CSS và class utility cơ bản.
- `/src/App.jsx` - Root component hiển thị layout cơ bản.
- `.env.example` - File mẫu môi trường.

## Test Criteria
- [x] Chạy lệnh `npm run dev` không bị lỗi.
- [x] Màn hình trống load được giao diện Dark Mode (màu nền tối HSL và card trong suốt).
- [x] Các icon Lucide hiển thị đúng.

---
Next Phase: [Phase 02: State Management & Storage Service](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-02-state-storage.md)
