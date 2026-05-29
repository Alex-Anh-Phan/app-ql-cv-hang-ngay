# Phase 02: State Management & Storage Service
Status: ✅ Complete
Dependencies: [Phase 01: Setup Environment](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-01-setup.md)

## Objective
Xây dựng Data Model cho task, thiết lập React Context hoặc Custom Hook để quản lý trạng thái công việc tập trung, tích hợp đồng bộ dữ liệu tự động với LocalStorage.

## Requirements
### Functional
- Định nghĩa kiểu dữ liệu Task: `{ id, title, description, quadrant (1-4), isCompleted, dueDate, createdAt }`.
- Xây dựng Context API (`TaskContext`) cung cấp các hàm CRUD:
  - `addTask(task)`
  - `updateTask(id, updatedFields)`
  - `deleteTask(id)`
  - `moveTask(id, targetQuadrant)`
  - `toggleTaskComplete(id)`
- Đồng bộ tự động mọi thay đổi vào LocalStorage.
- Khởi tạo mock tasks nếu LocalStorage trống để người dùng trải nghiệm ngay.

### Non-Functional
- Đảm bảo hiệu năng khi lưu trữ (tránh re-render không cần thiết).
- Format date chuẩn ISO cho `dueDate` và `createdAt`.

## Implementation Steps
1. [x] Tạo `/src/context/TaskContext.jsx` để khởi tạo `TaskProvider`.
2. [x] Viết helper `/src/utils/storage.js` để đọc/ghi LocalStorage an toàn (bọc trong try-catch).
3. [x] Implement các hàm CRUD trong `TaskProvider` và tích hợp trigger tự động lưu.
4. [x] Tạo Custom Hook `/src/hooks/useTasks.js` để các component dễ dàng tiêu thụ `TaskContext`.
5. [x] Tạo bộ dữ liệu mẫu (mock tasks) sinh động về cuộc sống/công việc trong `/src/utils/mockData.js`.

## Files to Create/Modify
- `/src/context/TaskContext.jsx` - Provider chính quản lý state.
- `/src/hooks/useTasks.js` - Custom Hook dùng chung.
- `/src/utils/storage.js` - Utility tương tác LocalStorage.
- `/src/utils/mockData.js` - Chứa dữ liệu mẫu ban đầu.

## Test Criteria
- [x] Render app hiển thị danh sách mock tasks.
- [x] Dùng Chrome DevTools check phần Application -> LocalStorage xem dữ liệu có lưu đúng định dạng JSON khi thêm/sửa/xóa task không.
- [x] F5 trình duyệt, dữ liệu vừa thay đổi vẫn được giữ nguyên.

---
Next Phase: [Phase 03: Core UI & Drag and Drop](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-03-core-ui-dragdrop.md)
