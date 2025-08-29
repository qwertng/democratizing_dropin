# Badminton Registration - Next.js Version

A full-stack event registration application built with Next.js, React, and MongoDB.

## Features

- **Event Registration**: Users can register for badminton events with different time slots
- **Guest Management**: Add up to 5 guests per registration
- **Registration Editing**: Users can edit or cancel their registrations using their phone number
- **Real-time List**: View all active registrations organized by time slots
- **Responsive Design**: Mobile-first design with beautiful UI

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd democratizing_dropin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badminton_registration?retryWrites=true&w=majority
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── pages/                 # Next.js pages and API routes
│   ├── api/              # API routes (replaces Express server)
│   │   ├── registrations.js
│   │   ├── registrations/[id].js
│   │   └── registrations/phone/[phone].js
│   ├── _app.js           # App wrapper
│   ├── index.js          # Home page (redirects to register)
│   ├── register.js       # Registration form
│   ├── confirmation.js   # Confirmation page
│   ├── edit.js           # Edit registration page
│   └── list.js           # Sign-up list page
├── src/
│   ├── components/       # Reusable UI components
│   ├── services/         # API service functions
│   └── index.css         # Global styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json           # Vercel deployment config
```

## API Endpoints

- `POST /api/registrations` - Create a new registration
- `GET /api/registrations` - Get all active registrations
- `GET /api/registrations/phone/[phone]` - Get registration by phone number
- `PUT /api/registrations/[id]` - Update registration
- `GET /api/health` - Health check

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
4. Deploy!

### Environment Variables

- `MONGODB_URI`: MongoDB connection string (required)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Changes from Vite + Express

1. **Routing**: Replaced React Router with Next.js file-based routing
2. **API**: Converted Express routes to Next.js API routes
3. **Build System**: Replaced Vite with Next.js build system
4. **Deployment**: Single deployment on Vercel (frontend + backend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
