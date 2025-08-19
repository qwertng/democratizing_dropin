# Badminton Drop-in Registration App

A modern, responsive web application for managing badminton drop-in registrations. Built with React, Vite, TailwindCSS, ShadCN, and MongoDB Atlas.

## 🚀 Features

- **Registration Page**: Complete registration form with name, phone, guests, and slot selection
- **Confirmation Page**: Success confirmation with edit functionality
- **Edit Registration**: Update registration details or cancel registration
- **Sign-up List**: View all active registrations grouped by slot type
- **Mobile-First Design**: Responsive design that works on all devices
- **Real-time Updates**: Live registration list with refresh functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **ShadCN** - Beautiful UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting
- **Cloudflare** - Domain management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd badminton-registration
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup

#### Frontend Environment
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

#### Backend Environment
Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badminton_registration?retryWrites=true&w=majority
PORT=3001
```

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace the `MONGODB_URI` in your server `.env` file

### 5. Start Development Servers

```bash
# Start backend server (in server directory)
cd server
npm run dev

# Start frontend server (in root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📱 Pages Overview

### 1. Registration Page (`/register`)
- **Full Name**: Text input for participant name
- **Phone Number**: Text input for contact information
- **Number of Guests**: Dropdown (0-5 guests)
- **Slot Type**: Radio card selection (Early Bird 7pm / Regular 8pm)
- **Register Now**: Saves to MongoDB and redirects to confirmation
- **View Sign-up List**: Navigates to list page

### 2. Confirmation Page (`/confirmation`)
- Success confirmation message
- Phone number input for editing registration
- **Edit Response**: Navigates to edit page
- **View Sign-up List**: Shows all registrations

### 3. Edit Registration Page (`/edit`)
- Pre-filled form with current registration details
- **Number of Guests**: Editable dropdown
- **Slot Type**: Editable radio cards
- **Cancel Registration**: Option to cancel
- **Save Changes**: Updates MongoDB

### 4. Sign-up List Page (`/list`)
- Displays all active registrations
- Grouped by slot type (Early Bird first, then Regular)
- Shows name, guests, and slot type
- **Refresh List**: Updates the list
- **Register**: Returns to registration page

## 🗄️ Database Schema

```json
{
  "name": "string",
  "phone": "string", 
  "guests": "number",
  "slot": "string", // "early-bird" or "regular"
  "cancelled": "boolean",
  "createdAt": "date"
}
```

## 🚀 Deployment

### Frontend (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   - Go to Vercel dashboard
   - Set `VITE_API_URL` to your backend API URL

### Backend (Vercel Functions)

1. **Create API Routes**:
   - Move server logic to `api/` directory
   - Update Vercel configuration

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Custom Domain (Cloudflare)

1. **Add Domain to Vercel**:
   - Go to Vercel dashboard
   - Add custom domain

2. **Configure DNS**:
   - Point domain to Vercel nameservers
   - Or configure CNAME records

## 🔧 API Endpoints

### Registrations
- `POST /api/registrations` - Create new registration
- `GET /api/registrations` - Get all active registrations
- `GET /api/registrations/phone/:phone` - Get registration by phone
- `PUT /api/registrations/:id` - Update registration

### Health Check
- `GET /api/health` - Server health status

## 🎨 UI Components

The app uses ShadCN components for consistent design:
- **Button**: Various styles and variants
- **Input**: Form inputs with validation
- **Card**: Content containers
- **Select**: Dropdown selections
- **Checkbox**: Boolean inputs

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for all screen sizes

## 🔒 Security Features

- Input validation
- CORS configuration
- Environment variable protection
- MongoDB injection prevention

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for the badminton community**
