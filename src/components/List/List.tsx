import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ListProps {
  todos: any[];
}

function List({ todos }: ListProps) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  return (
    <div className="container">
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
    </div>
  );
}

export default List;