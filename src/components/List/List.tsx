import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Todo } from "../../interfaces/Todo";
import PaginationMenu from "./Pagination/PaginationMenu";
import { TodoService } from "../../services/TodoService";
import CreateEditTodoForm from "../../Utils/CreateEditTodoForm";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

interface ListProps {
  onEditTodo: () => void;
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  pagination: PaginationProps;
}


function List({ onEditTodo, todos, setTodos, pagination }: ListProps) {
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  // Input data
  const [editTodo, setEditTodo] = useState<Todo>({
    id: -1,
    text: "",
    priority: "High",
    dueDate: "",
    completed: false,
  });

  // Function to handle form submission
  const submitForm = () => {
    TodoService.updateTodo(editTodo).then((response: any) => {
      onEditTodo();
      setIsFormVisible(false);
    })
  }

  const deleteTodo = (id: number) => {
    TodoService.deleteTodo(id).then(() => {
      onEditTodo();
    });
  }

  const handleCheckboxChange = (todo: Todo) => {
    try {
      if(todo.id !== undefined) {
        const request = todo.completed
          ? TodoService.setAsUndone(todo.id)
          : TodoService.setAsDone(todo.id);

        request.then(() => {
          onEditTodo();
        });
      } else {
        throw new Error("Todo ID is undefined");
      }
    } catch (error) {
      console.error('Request failed:', error);
    }  
  }

  return (
    <div className="container">
      {todos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No results. Try a different search or consult the filter wizard. 🧙‍♂️
        </div>
      ) : (
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
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => {
                      setEditTodo(todo);
                      setIsFormVisible(true);
                    }}
                  >
                  Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTodo(todo.id!)}
                  >
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {pagination.totalPages > 1 && (
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <PaginationMenu
                    page={pagination.page}
                    setPage={pagination.setPage}
                    totalPages={pagination.totalPages}
                  />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      )}

      {isFormVisible && (
      <CreateEditTodoForm 
        todo={editTodo}
        setTodo={setEditTodo}
        submitForm={submitForm}
        setIsFormVisible={setIsFormVisible}
        title="Edit Todo"
      />)}
    </div>
  );
}

export default List;