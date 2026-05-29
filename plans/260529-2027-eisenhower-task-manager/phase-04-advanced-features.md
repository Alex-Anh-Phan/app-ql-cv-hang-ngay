# Phase 04: Advanced Features (Charts & Alarm)
Status: ⬜ Pending
Dependencies: [Phase 03: Core UI & Drag and Drop](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-03-core-ui-dragdrop.md)

## Objective
Thêm các tính năng nâng cao: Vẽ biểu đồ thống kê trực quan lượng công việc đã làm/còn tồn đọng trong từng nhóm và hệ thống nhắc nhở bằng âm thanh hoặc thông báo trình duyệt (Web Notification).

## Requirements
### Functional
- **Thống kê:**
  - Tích hợp Chart.js hoặc vẽ biểu đồ SVG tùy biến.
  - Hiển thị biểu đồ phân bổ phần trăm công việc theo 4 nhóm.
  - Hiển thị tỷ lệ hoàn thành công việc (Completed vs Pending).
- **Hẹn giờ & Nhắc nhở:**
  - Check hạn chót của công việc định kỳ mỗi 60 giây (bằng `setInterval`).
  - Khi đến giờ hẹn (dueDate), phát âm báo ngắn và gửi Web Notification (nếu người dùng cấp quyền).
  - Có giao diện cài đặt bật/tắt chuông báo.

### Non-Functional
- Kiểm tra và xin quyền Web Notification lịch sự, không gây khó chịu cho người dùng.
- Hiệu suất: dọn dẹp các interval ngầm khi unmount tránh rò rỉ bộ nhớ.

## Implementation Steps
1. [ ] Cài đặt Chart.js và react-chartjs-2: `npm install chart.js react-chartjs-2`.
2. [ ] Tạo component `/src/components/StatsDashboard.jsx` hiển thị biểu đồ phân tích.
3. [ ] Tạo custom hook `/src/hooks/useNotification.js` để xử lý xin quyền và gửi thông báo.
4. [ ] Tạo file `/src/utils/audio.js` chứa mã nguồn kích hoạt âm báo (sử dụng Web Audio API hoặc thẻ Audio).
5. [ ] Tạo background worker nhẹ bằng React Effect để kiểm tra deadline và trigger báo thức.
6. [ ] Tạo giao diện cấu hình bật/tắt báo thức trong app.

## Files to Create/Modify
- `/src/components/StatsDashboard.jsx` - Component hiển thị biểu đồ thống kê.
- `/src/hooks/useNotification.js` - Hook tương tác Web Notification.
- `/src/utils/audio.js` - Helper phát âm thanh báo thức.
- `/src/App.jsx` - Thêm tab hoặc panel cho Thống kê và Cài đặt báo thức.

## Test Criteria
- [ ] Giao diện Thống kê hiển thị biểu đồ phân bổ chính xác số lượng task hiện có.
- [ ] Thử đặt lịch một task sẽ đến hạn trong 1 phút nữa:
  - Đúng giờ, hệ thống gửi thông báo đẩy và phát âm thanh chuông báo.
- [ ] Từ chối quyền thông báo đẩy, app vẫn chạy bình thường và chỉ phát âm thanh.

---
Next Phase: [Phase 05: Testing & Polish](file:///Users/alexanhphan/App-Task-Management/app-quan-ly-cong-viec/plans/260529-2027-eisenhower-task-manager/phase-05-testing-polish.md)
