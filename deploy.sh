#!/bin/bash

echo "🚀 Badminton Registration App Deployment Script"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Create environment files if they don't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    echo "VITE_API_URL=http://localhost:3001/api" > .env
    echo "✅ Frontend .env created"
fi

if [ ! -f "server/.env" ]; then
    echo "📝 Creating backend .env file..."
    echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badminton_registration?retryWrites=true&w=majority" > server/.env
    echo "PORT=3001" >> server/.env
    echo "✅ Backend .env created"
    echo "⚠️  Please update server/.env with your MongoDB Atlas connection string"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your MongoDB Atlas connection string"
echo "2. Start the backend server: cd server && npm run dev"
echo "3. Start the frontend server: npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For deployment:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Deploy: vercel"
echo ""
