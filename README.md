# Breakable Toy I - Todo App front-end

This is the front-end of the Todo application, developed with **React** and **TypeScript** as part of an activity. It includes custom components for task management, filtering, and displaying metrics.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager)

Additionally, make sure to install the project dependencies by running:

```bash
npm install
```

## Features

- **Task Management**: Create, edit, delete, and mark tasks as completed or not completed.
- **Filtering**: Filter tasks by text, priority, or completion status.
- **Metrics**: View statistics like average completion time, broken down by priority.
- **Pagination and Sorting**: Navigate through tasks and sort them by priority or due date.
- **Dynamic Styling**: Tasks are styled based on their due date proximity.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Starts the app in development mode.  
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The app reloads automatically when you save changes, and lint errors are displayed in the console.

### `npm run test`

Runs the test suite in interactive watch mode.  
This is useful for ensuring the app works as expected during development.

## Components Overview

### `App`

The main component that initializes the app and combines all other components.  
It sets up the layout and handles global state where necessary.

---

### `Filter`

A component for filtering tasks based on:

- Text
- Priority
- Completion status

It sends query parameters to the backend API to fetch filtered results.

---

### `CreateTodo`

A form component for creating new tasks.  
It collects user input and sends it as JSON to the backend API to add a new task.

---

### `Metrics`

Displays statistics about tasks, including:

- Average time to complete a task
- Priority-based average completion time

All data is fetched from the backend.

---

### `List`

Displays the list of tasks fetched from the backend.  
It includes several interactive features:

- **Edit**: Update an existing task using the same form as task creation.
- **Pagination**: Navigate through multiple pages of tasks.
- **Mark as Done/Undone**: Toggle the completion status of a task.
- **Sorting**: Order tasks by priority or due date.
- **Delete**: Remove a task from the list.
- **Due Date Color Coding**: Tasks are styled based on how close their due date is.