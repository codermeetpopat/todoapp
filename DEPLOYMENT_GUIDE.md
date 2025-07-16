# Heroku Deployment Guide

## Prerequisites
- Node.js installed on your machine
- Git installed on your machine
- Heroku CLI installed
- MongoDB Atlas account (for database)

## Step-by-Step Deployment Process

### 1. Install Heroku CLI
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
# Or install via npm:
npm install -g heroku
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create a Heroku Application
```bash
heroku create your-todo-app-name
```

### 4. Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret_key
heroku config:set JWT_EXPIRES_IN=7d
```

### 5. Deploy to Heroku
```bash
git push heroku main
```

### 6. Open Your App
```bash
heroku open
```

## Environment Variables Setup

### MongoDB Atlas Setup:
1. Create account at https://cloud.mongodb.com/
2. Create a new cluster
3. Create a database user
4. Get connection string
5. Replace password and database name in connection string

### JWT Secret:
Generate a strong secret key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting

### View Logs:
```bash
heroku logs --tail
```

### Check App Status:
```bash
heroku ps
```

### Restart App:
```bash
heroku restart
```

## API Endpoints (after deployment)

### Authentication:
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/user` - Get current user

### Todos:
- GET `/api/todos` - Get all todos for user
- POST `/api/todos` - Create new todo
- PUT `/api/todos/:id` - Update todo
- DELETE `/api/todos/:id` - Delete todo

## Testing Your Deployment

Test your API endpoints using tools like:
- Postman
- curl
- Frontend application

Example curl command:
```bash
curl -X POST https://your-app-name.herokuapp.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```
