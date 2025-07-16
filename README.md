# MERN Stack Todo Application

A professional todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for efficient task management.

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Categories**: Organize tasks by categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant task updates without page refresh

## Technology Stack

- **Frontend**: React.js, React Bootstrap, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap 5, React Icons

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todoapp
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://pmv:meet1234@todoapp.ty7s1eb.mongodb.net/todoapp?retryWrites=true&w=majority&appName=todoapp
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   JWT_EXPIRES_IN=7d
   ```

5. **Start the Application**
   
   **Development Mode (Both servers):**
   ```bash
   # Terminal 1 - Backend server
   npm run dev
   
   # Terminal 2 - Frontend server
   cd client
   npm start
   ```

   **Production Mode:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `POST /api/todos/bulk-delete` - Delete multiple todos

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String,
  createdAt: Date
}
```

### Todo Schema
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  category: String,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
todoapp/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js               # Main server file
├── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Tasks**: Click "Add Task" to create new tasks with title, description, and priority
3. **Edit Tasks**: Click the edit button to modify existing tasks
4. **Delete Tasks**: Click the delete button to remove tasks
5. **Filter/Sort**: Use the available filters to organize your tasks

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Helmet for security headers
- Rate limiting (can be added)

## Deployment

The application is ready for deployment on platforms like:
- **Heroku**: Configure environment variables and MongoDB connection
- **Vercel**: Deploy frontend with serverless functions
- **AWS**: Use EC2 for backend and S3 for frontend
- **Docker**: Containerize the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.
