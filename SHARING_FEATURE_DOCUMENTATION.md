# Todo Sharing Feature Documentation

## Overview
The todo app now supports sharing todos with other users through three visibility levels: private, public, and shared. Users can also assign todos to other users.

## New Features

### 1. Visibility Levels
- **Private**: Only the todo owner can see and manage the todo (default)
- **Public**: All authenticated users can see the todo
- **Shared**: Only selected users can see the todo

### 2. User Assignment
- Todos can be assigned to specific users
- Assigned users can see and update the todo regardless of visibility

### 3. Enhanced Todo Management
- View todos from multiple sources (own, public, shared, assigned)
- Share existing todos with other users
- Manage sharing permissions

## API Endpoints

### Sharing Management
```
PUT /api/todos/:id/share
```
**Body:**
```json
{
  "visibility": "private|public|shared",
  "sharedWith": ["userId1", "userId2"], // Required if visibility is "shared"
  "assignedTo": "userId" // Optional
}
```

### Get Public Todos
```
GET /api/todos/public
```

### Get Shared Todos
```
GET /api/todos/shared
```

### Get Assigned Todos
```
GET /api/todos/assigned
```

### Get Users for Sharing
```
GET /api/auth/users?search=searchTerm
```

## Usage Examples

### 1. Make a Todo Public
```javascript
const shareData = {
  visibility: 'public'
};
await shareTodo(todoId, shareData);
```

### 2. Share with Specific Users
```javascript
const shareData = {
  visibility: 'shared',
  sharedWith: ['user1Id', 'user2Id']
};
await shareTodo(todoId, shareData);
```

### 3. Assign Todo to User
```javascript
const shareData = {
  visibility: 'private',
  assignedTo: 'userId'
};
await shareTodo(todoId, shareData);
```

### 4. Fetch Different Todo Types
```javascript
// Get public todos
const publicTodos = await fetchPublicTodos();

// Get shared todos
const sharedTodos = await fetchSharedTodos();

// Get assigned todos
const assignedTodos = await fetchAssignedTodos();
```

## Database Schema Changes

### Todo Model Updates
```javascript
{
  // ... existing fields
  visibility: {
    type: String,
    enum: ['private', 'public', 'shared'],
    default: 'private'
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}
```

### New Indexes
- `{ visibility: 1 }`
- `{ sharedWith: 1 }`
- `{ assignedTo: 1 }`
- `{ visibility: 1, sharedWith: 1 }`
- `{ user: 1, visibility: 1 }`

## Frontend Integration

### ShareTodoModal Component
A modal component that allows users to:
- Change todo visibility
- Select users to share with
- Assign todos to specific users
- Search for users

### Updated TodoContext
The context now includes:
- `shareTodo(id, shareData)` - Share a todo
- `fetchPublicTodos()` - Get public todos
- `fetchSharedTodos()` - Get shared todos
- `fetchAssignedTodos()` - Get assigned todos
- `fetchUsers(search)` - Get users for sharing

## Security Considerations

1. **Authorization**: Only todo owners can modify sharing settings
2. **Access Control**: Users can only see todos they own, are shared with, assigned to, or are public
3. **User Privacy**: User searches are limited to basic info (name, email)
4. **Validation**: All sharing requests are validated on the server

## How It Solves the Original Problem

The original issue was that users could only see their own todos. Now:

1. **Public Todos**: Users can make todos public for everyone to see
2. **Shared Todos**: Users can share specific todos with selected people
3. **Assigned Todos**: Users can assign todos to others for collaboration
4. **Unified View**: The main todo list now shows all relevant todos (owned, public, shared, assigned)

## Testing the Feature

1. **Create two user accounts**
2. **Create a todo with User A**
3. **Share it as public or with User B**
4. **Login as User B and verify the todo appears**
5. **Test assignment functionality**
6. **Test different visibility levels**

## Future Enhancements

- Team/workspace concept
- Real-time notifications for shared todos
- Comments on shared todos
- Bulk sharing operations
- Role-based permissions (viewer, editor, admin)
