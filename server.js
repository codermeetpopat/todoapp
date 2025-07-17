const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Import Routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ extended: false }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Root route for API status
app.get('/', (req, res) => {
  res.json({
    message: 'Todo API is running successfully!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth (POST /login, POST /register)',
      todos: '/api/todos (GET, POST, PUT, DELETE)'
    },
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API route not found handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: {
      auth: '/api/auth',
      todos: '/api/todos'
    }
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // For non-production, handle any other routes
  app.get('*', (req, res) => {
    res.status(404).json({
      error: 'Route not found',
      message: `The route ${req.originalUrl} does not exist`,
      suggestion: 'Use /api/auth or /api/todos endpoints'
    });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
