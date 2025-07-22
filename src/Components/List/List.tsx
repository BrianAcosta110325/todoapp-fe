import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Todo } from "../../Interfaces/Todo";
import PaginationMenu from "./PaginationMenu";
import { TodoService } from "../../Services/TodoService";
import CreateEditTodoForm from "../../Utils/CreateEditTodoForm";
import Swal from 'sweetalert2';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

interface ListProps {
  onEditTodo: () => void;
  todos: Todo[];
  pagination: PaginationProps;
  onApplySort: (sortField: Map<String,String>) => void;
}


function List({ onEditTodo, todos, pagination, onApplySort }: ListProps) {
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  // Sort data
  const [dueDateSort, setDueDateSort] = useState<'' | 'asc' | 'desc'>('');
  const [prioritySort, setPrioritySort] = useState<'' | 'asc' | 'desc'>('');

  // Input data
  const [editTodo, setEditTodo] = useState<Todo>({
    id: -1,
    text: "",
    priority: "High",
    dueDate: "",
    completed: false,
    dueDateProximity: 0,
  });

  // Function to handle edit form
  const submitForm = () => {
    TodoService.updateTodo(editTodo).then(() => {
      setIsFormVisible(false);
      onEditTodo();
      Swal.fire({
        icon: 'success',
        title: 'Todo updated successfully!',
        text: 'Your todo has been updated successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    }).catch((error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update Todo',
        text: 'Please verify your text input and try again.',
      });
    });
  }

  const deleteTodo = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won’t be able to revert this... unless you have a time machine.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        TodoService.deleteTodo(id).then(() => {
          Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
          );
          onEditTodo();
        }).catch((error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error deleting Todo',
            text: error.message,
          });
        });
      }
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

  const handleSort = (field: string) => {
    let newPrioritySort = prioritySort;
    let newDueDateSort = dueDateSort;

    const toggleSortDirection = (current: '' | 'asc' | 'desc'): 'asc' | 'desc' =>
      current === 'asc' ? 'desc' : 'asc';
  
    if (field === "priority") {
      const newDirection = toggleSortDirection(prioritySort);
      setPrioritySort(newDirection);
    } else if (field === "dueDate") {
      const newDueDateSort = toggleSortDirection(dueDateSort);
      setDueDateSort(newDueDateSort);
    }
  
    const sortMap = new Map<String, String>([
      ['priority', newPrioritySort],
      ['dueDate', newDueDateSort],
    ]);
  
    onApplySort(sortMap);
  };

  const getDueDateClass = (proximity: number) => {
    switch (proximity) {
      case 1:
        return 'table-danger';   // Urgente (rojo)
      case 2:
        return 'table-warning';  // Moderado (amarillo)
      case 3:
        return 'table-success';  // Tranquilo (verde)
      default:
        return '';               // Sin dueDate o sin color
    }
  };  

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
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('priority')}>
                Priority {prioritySort === "asc" ? '↓' : prioritySort === "desc" ? '↑' : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('dueDate')}>
                Due Date {dueDateSort === "asc" ? '↓' : dueDateSort === "desc" ? '↑' : ''}
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: Todo) => (
              <tr key={todo.id} className={getDueDateClass(todo.dueDateProximity)}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo)}
                  />
                </td>
                <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </td>
                <th>{todo.priority}</th>
                <td>{todo.dueDate ? todo.dueDate : "No Due date"}</td>
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