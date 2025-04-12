import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from '../../Utils/CreateEditTodoForm';
import { TodoService } from '../../services/TodoService';
import { Todo } from '../../interfaces/Todo';

interface CreateTodoProps {
  onCreateTodo: () => void;
}

function CreateTodo({ onCreateTodo }: CreateTodoProps) {
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  // Input data
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  // Function to handle form submission
  const submitForm = () => {
    const newTodo: Todo = {
      text,
      priority,
      dueDate,
    };
    TodoService.addTodo(newTodo).then((response: any) => {
      onCreateTodo();
      setIsFormVisible(false);
    })
  }

  useEffect(() => {
    if (!isFormVisible) {
      setText("");
      setPriority("High");
      setDueDate("");
    }
  }, [isFormVisible]);

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setIsFormVisible(true)}
      >
        + New Todo
      </button>

      {isFormVisible && 
      <TodoForm 
        text={text} 
        setText={setText} 
        priority={priority} 
        setPriority={setPriority} 
        dueDate={dueDate} 
        setDueDate={setDueDate} 
        title='Create Todo'
        submitForm={submitForm} 
        setIsFormVisible={setIsFormVisible}
      />}
    </div>
  );
}

export default CreateTodo;