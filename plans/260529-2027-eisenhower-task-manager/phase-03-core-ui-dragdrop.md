# Phase 03: Core UI & Drag and Drop
Status: ⬜ Pending
Dependencies: [Phase 02: State Management & Storage Service](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-02-state-storage.md)

## Objective
Xây dựng giao diện Ma trận Eisenhower 4 phần tư bằng Glassmorphism, hiển thị danh sách task dưới dạng thẻ (Task Card) và cài đặt tính năng kéo thả mượt mà để thay đổi mức độ ưu tiên của task.

## Requirements
### Functional
- Giao diện chia làm 4 ô phần tư với màu sắc đại diện khác nhau (Đỏ, Vàng, Xanh, Xám) bằng CSS HSL mượt mà.
- Thiết kế Component `TaskCard`: hiển thị tiêu đề, mô tả ngắn, ngày đến hạn, trạng thái hoàn thành và nút thao tác nhanh (sửa/xóa/check).
- Tích hợp HTML5 Drag & Drop:
  - Cho phép người dùng nhấn giữ thẻ task và kéo.
  - Các ô phần tư đổi màu nền nhẹ (hover state) khi có thẻ task rê qua.
  - Khi thả thẻ task vào ô mới, trạng thái `quadrant` của task sẽ được cập nhật ngay lập tức.
- Form thêm mới/chỉnh sửa Task (Modal hoặc Sidebar trượt Glassmorphism sang trọng).

### Non-Functional
- Responsive layout: Hiển thị 2x2 trên màn hình máy tính lớn, 1x4 (dọc) trên điện thoại di động để dễ đọc.
- Transition mượt mà (0.2s - 0.3s) khi rê chuột, kéo thả, hoặc check hoàn thành.

## Implementation Steps
1. [ ] Tạo component `/src/components/Quadrant.jsx` đại diện cho một ô phần tư.
2. [ ] Tạo component `/src/components/TaskCard.jsx` hiển thị chi tiết task.
3. [ ] Tạo component `/src/components/TaskModal.jsx` (hoặc Sidebar) chứa form Thêm/Sửa task.
4. [ ] Implement HTML5 Drag events (`onDragStart` trên TaskCard, `onDragOver`, `onDragLeave`, `onDrop` trên Quadrant).
5. [ ] Tích hợp CSS Glassmorphism (`backdrop-filter: blur()`, `background: rgba()`, `border: 1px solid rgba()`) vào các component.
6. [ ] Cấu hình Responsive grid và layout trong CSS.

## Files to Create/Modify
- `/src/components/Quadrant.jsx` - Ô phần tư ma trận.
- `/src/components/TaskCard.jsx` - Thẻ công việc.
- `/src/components/TaskModal.jsx` - Form modal thêm/sửa công việc.
- `/src/App.jsx` - Lắp ráp các ô phần tư thành ma trận Eisenhower hoàn chỉnh.

## Test Criteria
- [ ] Giao diện hiển thị đúng 4 ô phần tư 2x2 trên Desktop và 1 cột trên Mobile.
- [ ] Kéo thả task từ ô này sang ô khác thành công, UI cập nhật tức thì và LocalStorage đồng bộ.
- [ ] Thêm mới task qua form hoạt động chuẩn xác, render đúng ô phần tư đã chọn.

---
Next Phase: [Phase 04: Advanced Features (Charts & Alarm)](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-04-advanced-features.md)
