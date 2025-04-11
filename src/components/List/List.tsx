import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Api } from "../../services/Api";
import { Todo } from "../../interfaces/Todo";

interface ListProps {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
}

function List({ todos, setTodos }: ListProps) {
  // const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(0);

  const handleCheckboxChange = (todo: Todo) => {
    const url = `todos/${todo.id}/${todo.completed ? 'undone' : 'done' }`;

    try {
      const request = todo.completed
        ? Api.put(url)
        : Api.post(url);

      request.then(() => {
        // Update the state using React hooks (if needed, add state management logic here)
        setTodos(
          todos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
          )
        );
      });
    } catch (error) {
      console.error('Request failed:', error);
    }  
  }

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Name</th>
          <th scope="col">Priority</th>
          <th scope="col">Due Date</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
          {todos.map((todo: Todo) => (
            <tr key={todo.id}>
            <td>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => handleCheckboxChange(todo)}
                />
            </td>
            <td>{todo.text}</td>
            <td>{todo.priority}</td>
            <td>{todo.dueDate || "N/A"}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;