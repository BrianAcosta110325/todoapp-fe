import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxDropdown from './ChekboxDropdown';

function Filter() {
  let priorities = [
    { id: '1', label: 'High', checked: false },
    { id: '2', label: 'Medium', checked: false },
    { id: '3', label: 'Low', checked: false },
  ]
  let status = [
    { id: '1', label: 'Done', checked: false },
    { id: '2', label: 'Undone', checked: false }
  ]

  const applyFilter = () => {
    fetch('http://localhost:9090/api/todos/1')  // Usa una ruta relativa, no la ruta completa
      // .then(res => res.json())  // Asegúrate de convertir la respuesta en JSON
      .then(data => console.log("arreglo", data))
      .catch(err => console.error(err));
  };  

  return (
    <div className="container mt-4">
      {/* Filter */}
      <div className="card p-3 mb-4">
        <div className="g-3 align-items-center">
          
          {/* Text Input */}
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="search" className="form-label me-4 mb-0">Name</label>
            <input
              type="text"
              id="search"
              className="form-control flex-grow-1"
              placeholder="Search by text..."
            />
          </div>
      
          <div className="row align-items-center mb-3">
            {/* Priorities */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="priority" className="form-label me-2 mb-0" style={{ width: '60px' }}>Priority</label>
              <CheckboxDropdown options={priorities} />
            </div>

            {/* Status */}
            <div className="col d-flex align-items-center mb-3">
              <label htmlFor="status" className="form-label me-2 mb-0" style={{ width: '60px' }}>Status</label>
              <CheckboxDropdown options={status} />
            </div>
            <button
              className="col-auto btn btn-primary me-2 mb-0"
              type="button"
              id="applyFilterButton"
              onClick={applyFilter}
              style={{ width: '100px' }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter
