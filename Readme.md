# VitalTrip: Smart Travel Planning Platform

### Overview
**VitalTrip** is a modern web platform that helps travelers explore Maharashtra with ease.  
It combines **destination discovery**, **health emergency support**, **AI-powered assistance**, and **travel blogs** into one unified MERN-based web application.


---

## Features

**Destination Explorer** — Browse popular and hidden tourist spots in Maharashtra.  
**Health Hub** — Find nearby hospitals and medical help during emergencies.  
**Local Guides & Blogs** — Connect with guides or read community travel blogs.  
**AI Chatbot** — Get real-time travel assistance, tips, and destination suggestions.  
**Mail Query System** — Contact support or send queries directly from the website.  
**User Authentication** — Secure login/signup using JWT authentication.  
**Responsive UI** — Built with React + Vite for fast, mobile-friendly performance.  
**Future Ready** — Booking and payment modules are prepared but not yet active.

---

## Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React.js (Vite) | Modern SPA for UI |
| **Backend** | Node.js + Express.js | REST API |
| **Database** | MongoDB | Stores users, destinations, blogs, guides |
| **Map & Geo Services** | ORS, Geoapify, Mapbox | Routing and location services |
| **Email Service** | Nodemailer | Handles user queries |
| **AI Integration** | GROQ AI | Smart travel chatbot |
| **Environment** | .env | Stores sensitive credentials |

---

## Project Structure
```
VitalTrip/
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── db/
│ ├── utils/
│ ├── app.js
│ └── server.js
│
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── vite.config.js
│ └── package.json
│
├── package.json
├── .env
└── README.md

```
---

## API Integrations

- **Geoapify / ORS / Mapbox** → for map display and routing  
- **Nodemailer** → to send user queries via email  
- **GROQ / AI API** → for chatbot and smart travel recommendations  

---

## Installation and Setup

### Prerequisites
- Node.js (>= 18)
- MongoDB (local or Atlas)
- Git

### Steps

1. Setup Backend
    ```bash
    cd Backend
    npm install
    npm run dev

2. Setup Frontend
    ```bash
    cd ../Frontend
    npm install
    npm run dev