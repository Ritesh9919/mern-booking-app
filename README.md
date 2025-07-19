# 🎉 Hotel Booking App

A full-fledged Booking App using the MERN stack!

---

## Tech Stack

React.js, Tailwind CSS, React-Hook-Form, React-Query, Node.js, MongoDB


## 📦 Setup Instructions

### 1. Run backend

```bash
1. git clone https://github.com/Ritesh9919/mern-booking-app
2. cd backend
3. npm install
4. npm run dev
```

### 2. Run frontend

```bash
1. git clone https://github.com/Ritesh9919/mern-booking-app
2. cd frontend
3. npm install
4. npm run dev
```

### 3. Configure Environment Variables

1. Frontend

```bash
VITE_API_BASE_URL=http://localhost:7000
VITE_STRIPE_PUB_KEY=
```

1. Backend

```bash
MONGO_URI=
JWT_SECRET=eUpczMNWPp2wqW5RpFI6bcWZbijJpOJD
FRONTEND_URL=http://localhost:5173

# Cloudinary Variables
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#Stripe
STRIPE_API_KEY=
```

### 🚀 Features

- User Authentication\*\*: Implemented secure login and registration using HTTP cookies and JWT for a seamless user experience.

- Hotel Management\*\*: Adding, editing, and viewing hotels. 

- **Image Uploads**: Integrated image uploads, a crucial feature for any booking platform.

- **Search, Sort, & Filter**: Enhanced the user experience with functionalities to search, sort, and filter hotels, making it easy for users to find their perfect stay.

- **Online Payments**: Integrate Stripe for secure and efficient hotel booking payments.

- **Booking Management**: Implemented the feature to view and manage bookings, essential for any booking application.

- MongoDB persistence using Mongoose

- **Recent Hotels on Home Page**: Displayed recently added hotels on the home page, keeping the content dynamic and engaging.
