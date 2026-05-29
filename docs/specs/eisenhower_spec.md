# 💡 Technical Specification: Eisenhower Task Manager

## 1. Executive Summary
Tài liệu đặc tả kỹ thuật dự án Web App quản lý công việc theo Ma trận Eisenhower. Ứng dụng tập trung vào trải nghiệm mượt mà, lưu trữ dữ liệu local bảo mật, kéo thả trực quan và hỗ trợ phân tích hiệu suất cá nhân qua biểu đồ.

## 2. Tech Stack
- **Frontend:** React JS (Vite)
- **Styling:** CSS3 Custom Properties (Vanilla CSS) với Glassmorphism & Dark Mode.
- **State Management:** React Context API + custom hooks.
- **Storage:** Web LocalStorage API.
- **Charts:** Chart.js + react-chartjs-2.
- **Utilities:** HTML5 Drag and Drop API, Web Notification API.

## 3. Data Model (Schema)
Ứng dụng sử dụng cấu trúc dữ liệu LocalStorage dạng JSON như sau:

### Tasks Collection (`eisenhower_tasks`)
```json
[
  {
    "id": "string (uuid)",
    "title": "string",
    "description": "string",
    "quadrant": "number (1, 2, 3, 4)",
    "isCompleted": "boolean",
    "dueDate": "string (ISO date format)",
    "createdAt": "string (ISO date format)"
  }
]
```

- `quadrant` mapping:
  - `1`: Quan trọng & Khẩn cấp (Do First)
  - `2`: Quan trọng nhưng không Khẩn cấp (Schedule)
  - `3`: Không quan trọng nhưng Khẩn cấp (Delegate)
  - `4`: Không quan trọng và không Khẩn cấp (Eliminate)

### Settings Config (`eisenhower_settings`)
```json
{
  "alarmSound": "boolean",
  "pushNotifications": "boolean"
}
```

## 4. UI/UX Specification (Glassmorphism & Colors)
Hệ màu HSL được sử dụng để tối ưu độ tương phản trong Dark Mode:
- **Background chính:** `hsl(220, 20%, 8%)`
- **Ô Q1 (Đỏ):** `hsla(0, 80%, 60%, 0.1)` với border `hsla(0, 80%, 60%, 0.3)`
- **Ô Q2 (Vàng):** `hsla(45, 90%, 55%, 0.1)` với border `hsla(45, 90%, 55%, 0.3)`
- **Ô Q3 (Xanh):** `hsla(210, 80%, 60%, 0.1)` với border `hsla(210, 80%, 60%, 0.3)`
- **Ô Q4 (Xám):** `hsla(240, 10%, 60%, 0.1)` với border `hsla(240, 10%, 60%, 0.3)`
- **Hiệu ứng kính:** `backdrop-filter: blur(12px) saturate(180%);`

## 5. Build Checklist & Quality Requirements
- [ ] Không có thư viện bên ngoài quá nặng (bundle size tối ưu).
- [ ] Tương thích responsive 100%.
