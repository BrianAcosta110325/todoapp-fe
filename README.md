# Breakable Toy I - Todo App

This is a simple React app built with TypeScript. It includes custom components like a loading screen and others to manage tasks. It's a good starting point to experiment with state management, hooks, and writing tests in React.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in development mode.  
Open [http://localhost:8080](http://localhost:8080) to check it in the browser.

The page reloads automatically when you save changes.  
You’ll also see lint errors directly in the console.

### `npm run test`

Launches the test runner in interactive watch mode.  
Useful to make sure everything works while developing.

## Components Overview

### `App`

Main component that combines and structures all the smaller components.  
It also handles the initialization of variables and sets up the basic layout.

---

### `Filter`

Allows filtering Todos by:

- Text
- Priority
- Completed status

The filter sends query parameters to the backend API to get the filtered results.

---

### `CreateTodo`

Displays a form to create a new Todo.  
It collects the input data and sends it as JSON to the backend via the API so the Todo can be added.

---

### `Metrics`

Shows stats about Todos, including:

- General average time to complete a Todo
- Priority-based average completion time

All data is provided by the backend.

---

### `List`

Displays all the Todos returned from the backend.  
Includes a bunch of features to interact with the list:

- **Edit**: Update an existing Todo (uses the same logic as creation)
- **Pagination**: Navigate through multiple pages of Todos
- **Mark as Done/Undone**: Toggle the completed status
- **Sorting**: Order by priority or due date
- **Delete**: Remove a Todo
- **Due Date Color Coding**: Each Todo is styled based on how close the due date is, according to the backend
