# Stask - Todo Management Application

Stask is a full-stack todo management application that allows users to create, read, update, and delete tasks efficiently.

## Use Case

Stask is designed for individuals who want to:
- Keep track of their daily tasks
- Manage their to-do lists effectively
- Mark tasks as completed
- Edit existing tasks
- Remove tasks they no longer need

## Tech Stack

### Frontend
- React.js
- Axios for API calls
- React Icons for UI elements
- React Toastify for notifications
- Tailwind CSS for styling

### Backend
- Flask (Python)
- PyMongo for MongoDB integration
- Flask-CORS for handling Cross-Origin Resource Sharing

### Database
- MongoDB

## Project Details

### Frontend (App.jsx)
The frontend is built with React and provides a user-friendly interface for managing todos. Key features include:
- Adding new todos
- Editing existing todos
- Marking todos as complete/incomplete
- Deleting todos with confirmation
- Filtering to show/hide completed todos
- Real-time notifications for user actions

### Backend (app.py)
The backend is powered by Flask and handles all the CRUD operations for todos. It includes:
- GET endpoint to fetch all todos
- POST endpoint to add a new todo
- PUT endpoint to update an existing todo
- DELETE endpoint to remove a todo

The backend uses MongoDB to store the todos, with each todo having an id, text, and completed status.

## How to Run

1. Run the Frontend React
2. Start the MongoDB server
3. Run the Flask backend:
