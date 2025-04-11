import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateTodo() {
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setIsFormVisible(true)}
      >
        + New Todo
      </button>

      
    </div>
  );
}

export default CreateTodo;