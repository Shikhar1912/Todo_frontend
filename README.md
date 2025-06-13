# 📱 Student Registry App (Frontend)

A simple React Native app built using **Expo** that allows you to:

- 📄 Add student details
- 📋 View a list of students
- 🔍 See full details of a student in a modal
- 🌐 Interact with a Node.js + PostgreSQL backend

---

## 🚀 Features

- Form with Name, Roll Number, Age, and Email
- List of all added students
- Modal to show full student details
- Automatically updates the list after a new student is added
- Fully responsive and works on Android

---

## 🧰 Tech Stack

- **Frontend:** React Native + Expo
- **State Management:** useState, useEffect
- **HTTP Client:** Axios
- **Backend (external):** Node.js, Express, PostgreSQL (API URL is hardcoded)

---

## 🖼️ Screens

| Add Student Form | Student List | Modal Detail View |
|------------------|--------------|-------------------|
| ![Form](./screenshots/form.png) | ![List](./screenshots/list.png) | ![Modal](./screenshots/modal.png) |

> Add screenshots inside a `screenshots/` folder.

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/student-registry-app.git
cd student-registry-app
npm install
npx expo start
