import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Api } from "../../services/Api";

function List() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useState(() => {
    setLoading(true);
    // Fetch todos from API
    Api.get('todos', new URLSearchParams({page: '0'}).toString()).then((response) => {
      setTodos(response);
      setLoading(false);
    })
  });

  return (
    <div className="container">
      {loading ? (
      <p>Loading...</p>
      ) : (
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Priority</th>
          <th scope="col">Due Date</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {todos.map((todo: any) => (
          <tr key={todo.id}>
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
      )}
    </div>
  );
}

export default List;