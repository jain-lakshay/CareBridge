# 🩺 CareBridge

A guidance-first healthcare web application that helps users safely handle everyday health concerns by connecting them with verified doctors, educational content, and easy consultation booking — without diagnosing or replacing professional medical advice.

---

## 🌐 DEPLOYMENT LINK

🔗 Live Project: https://allergy-chores-ai--lakshayjainent.replit.app/

---

## 🎥 LIVE DEMO

🔗 Demo Video: [Click here to watch the video](https://www.loom.com/share/976cfb6fb9fe4096b0db60629e3b470b)

---

## 📖 ABOUT THE PROJECT

People often face small, day-to-day health problems such as vitamin deficiencies, mild fever, fatigue, numbness, tingling sensations, or minor cuts and injuries.  
Most individuals try to self-medicate using internet advice or past experience because visiting a doctor feels costly, time-consuming, and inconvenient for small issues.

CareBridge acts as a trusted middle layer between self-care and hospitals.

The platform provides:
- Safe, non-diagnostic guidance
- Educational videos uploaded by verified doctors
- Easy online or offline consultation booking when required

⚠️ The platform never diagnoses diseases or prescribes critical medication.

---

## ✅ WHAT CAREBRIDGE DOES

- Helps users understand whether an issue needs professional care
- Shows verified medical education content (not random videos)
- Allows users to consult doctors digitally or book appointments
- Redirects serious cases directly to a doctor
- Avoids unsafe self-medication practices

---

## 🖼️ SCREENSHOTS

### Home
![Home](https://image2url.com/images/1765391678962-23bea6c2-1d96-4997-a1f1-944353d4c018.png)

### Doctor Listing
![Doctors](https://image2url.com/images/1765391675938-ba6c1c3f-4a4d-47fe-be14-035222dc120c.png)

### Slot Booking
![Booking](https://image2url.com/images/1765391672573-ec2ce48a-f0ba-41f8-92c6-2b06fffad1d5.png)


### AI Helper
![helper](https://image2url.com/images/1765391670595-23b6ae1d-0be5-4026-ad2b-f42db5407d4d.png)

---

## ✨ FEATURES

- Verified doctor profiles with specialization and region
- Doctor-uploaded educational videos
- Slot-based appointment booking system
- High-concurrency safe booking (no double booking)
- Automatic booking expiry and slot release
- Admin dashboard for doctor and slot management
- Clean, medical-style UI
- Loading, empty, and error states handled properly

---

## 🛠 TECH STACK

### Frontend
- React.js
- TypeScript
- React Context API
- React Router DOM

### Backend
- Node.js
- Express.js
- PostgreSQL
- Transaction-safe concurrency handling

---

## 📂 FOLDER STRUCTURE

### Backend
```
server/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── config/
├── db/
├── server.js
└── .env
```

### Frontend
```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
```

---

## 🔐 MEDICAL SAFETY RULES

- No disease diagnosis
- No medical decision-making by AI
- AI only provides general health guidance
- Serious symptoms always redirect to doctors
- Doctors remain the final authority

---

## 🚀 SETUP INSTRUCTIONS

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 🗄 DATABASE

- PostgreSQL
- Transaction-based booking system
- Uses row-level locks to prevent double booking
- Automatic booking expiry for inactive sessions

---

## 📌 FUTURE IMPROVEMENTS

- Doctor-specific AI chat assistants
- Multi-language support
- Payment gateway integration
- Mobile app version

---

## 📄 LICENSE

This project is built for learning and demonstration purposes.
