# 📚 AcadBud

AcadBud is a **smart academic tracker** designed to help students stay on top of their academics.  
It provides **course management, timetable tracking, attendance insights, and push notifications** for upcoming classes — all in one clean dashboard.

---

## ✨ Features

- 📅 **Timetable & Push Notifications** – Never miss a class with reminders for upcoming lectures.
- 🎯 **Smart Attendance Tracking** – Know exactly how many classes you can miss while staying above the attendance threshold.
- 🔐 **Authentication & Security**
  - JWT-based authentication
  - Email verification
  - Forgot password & password reset
- 🎨 **Modern UI** – Built with React + Tailwind CSS for a fast and responsive experience.
- 🐳 **Containerized Deployment** – Dockerized for consistent and easy setup.
- ⚡ **CI/CD Pipeline** – Automated build & deployment using GitHub Actions.
- ☁️ **Cloud Ready** – Deployed on AWS EC2 (currently paused due to cost).

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT, Email verification  
**DevOps:** Docker, GitHub Actions, AWS EC2  

---

## 📂 Project Structure

```
acadbud/
├── client/       # React + Tailwind frontend
├── server/       # Node.js + Express backend
├── docker/       # Docker configs
└── .github/      # GitHub Actions CI/CD workflows
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/acadbud.git
cd acadbud
```

### 2. Setup environment variables

Create a `.env` file inside `server/` with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

### 3. Run with Docker
```bash
docker-compose up --build
```

This will spin up both **frontend** and **backend** services.

### 4. Without Docker (manual run)

**Backend**
```bash
cd server
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

---

## 📸 Screenshots (Coming Soon)
_Add screenshots of the dashboard and attendance tracker once backend is fully integrated._

---

## 📦 CI/CD Pipeline

- Pushes to `main` branch trigger GitHub Actions workflow
- Workflow builds Docker images and deploys to AWS EC2

---

## 📌 Roadmap

- [ ] Backend integration for dashboard  
- [ ] Calendar sync with Google Calendar  
- [ ] Improved analytics & attendance insights  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and open a PR.


## 👨‍💻 Author

**Aryan Agrahari**  
- 💼 [LinkedIn](https://www.linkedin.com/in/valak70/)  
- 💻 [GitHub](https://github.com/valak70)  
