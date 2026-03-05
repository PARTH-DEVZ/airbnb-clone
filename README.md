Airbnb Clone

Production-grade full-stack accommodation booking platform inspired by Airbnb, engineered with secure authentication, scalable architecture, and real-world reservation logic.

🔗 Live Application: https://airbnb-nine-plum.vercel.app/

🔗 Repository: https://github.com/PARTH-DEVZ/airbnb-clone

🔗 Portfolio Page: https://parthdevz.vercel.app/project/airbnb

📌 Overview

This project is a full-stack Airbnb-inspired booking platform designed to simulate real-world travel marketplace systems.

The application implements:

Secure authentication workflows

Role-based host & guest experiences

Dynamic property listing management

Reservation validation with booking conflict prevention

Geo-location powered property discovery

The architecture emphasizes scalability, maintainability, and strong authorization boundaries, mirroring production-level travel platforms.

🛠 Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

Zustand (Global State Management)

Backend

Next.js API Routes

Prisma ORM

PostgreSQL

Authentication

NextAuth (Credentials + OAuth Providers)

Server-side session validation

Protected API routes

Media & Maps

Cloudinary (Image upload & optimization)

Leaflet (Interactive geo-location mapping)

Deployment

Vercel

Managed PostgreSQL database

✨ Core Features
🔐 Authentication & Authorization

Credential & OAuth login support

Secure session management

Role-based access (Host / Guest)

API-level authorization enforcement

🏠 Property Management

Create, update, and delete listings

Cloudinary-powered image uploads

Pricing & location configuration

Interactive map preview

📅 Reservation System

Date-based availability validation

Booking conflict prevention logic

Secure reservation flow

Reservation management dashboard

🗺 Map-Based Discovery

Interactive Leaflet map rendering

Dynamic location markers

Location-aware browsing experience

👤 User Dashboards

Guests:

Manage trips

View reservations

Hosts:

Manage listings

Track bookings

Role-specific data rendering

⚡ Architecture & Performance

Modular component structure

Prisma-optimized relational schema

Efficient booking query handling

Clean separation of UI, business logic, and data layer

Fully responsive cross-device experience

🧠 Architecture Highlights

Scalable Next.js App Router structure

Clear separation of concerns

Centralized state management with Zustand

Secure route protection with session validation

Conflict-safe booking algorithm

📂 Project Structure
/app            → Pages & API handlers
/components     → Reusable UI components
/actions        → Server-side logic
/prisma         → Database schema & migrations
/hooks          → Custom React hooks
/public         → Static assets
⚙️ Local Setup
git clone https://github.com/PARTH-DEVZ/airbnb-clone
cd airbnb-clone
npm install
npm run dev
🔑 Environment Variables

Create a .env file in the root directory:

DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GITHUB_ID=
GITHUB_SECRET=
CLOUDINARY_URL=

Ensure OAuth providers and database credentials are properly configured.

🚀 Future Improvements

Real-time booking updates

Payment gateway integration

Advanced search filters

AI-powered property recommendations

Load testing & performance benchmarking

👨‍💻 Author

Parth Kulkarni
Full-Stack Developer focused on scalable systems, secure architecture, and AI-driven engineering.

📄 License

Developed for portfolio and educational purposes.
