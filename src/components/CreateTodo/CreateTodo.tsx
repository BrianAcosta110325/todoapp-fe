import React, { useState } from 'react';
import { Api } from '../../services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateTodo() {
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  // Data for priorities
  const priorities = [
    "High",
    "Medium",
    "Low",
  ]

  // Input data
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");


  // Function to handle form submission
  const submitForm = () => {
    // e.preventDefault();
    const newTodo = {
      text,
      priority,
      dueDate,
    };
    Api.post('todos', newTodo).then((response: any) => {
      // console.log(response);
    })
  }

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setIsFormVisible(true)}
      >
        + New Todo
      </button>

      {isFormVisible && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Todo</h5>
                <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Text Input */}
                  <div className="d-flex align-items-center mb-3">
                    <label htmlFor="text" className="form-label me-2 mb-0" style={{ width: '100px' }}>Name</label>
                    <input
                      type="text"
                      id="text"
                      className="form-control flex-grow-1"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  {/* Priorities */}
                  <div className="d-flex align-items-center mb-3">
                    <label htmlFor="priority" className="form-label me-2 mb-0" style={{ width: '100px' }}>Priority</label>
                    <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    >
                      {priorities.map((p) => (
                        <option key={p} value={p}>
                        {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Due Date */}
                  <div className="d-flex align-items-center mb-3">
                    <label htmlFor="dueDate" className="form-label me-2 mb-0" style={{ width: '100px' }}>Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      className="form-control flex-grow-1"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary justify-content-end" 
                      onClick={() => {
                        submitForm();
                        setIsFormVisible(false);
                      }}
                    >Create Todo</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTodo;