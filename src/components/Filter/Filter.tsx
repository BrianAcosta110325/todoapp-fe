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

  return (
    <div className="container mt-4">
      {/* Filter */}
      <div className="card p-3 mb-4">
        <div className="g-3 align-items-center">
          
          {/* Text Input */}
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="search" className="form-label me-2 mb-0">Name</label>
            <input
              type="text"
              id="search"
              className="form-control flex-grow-1"
              placeholder="Search by text..."
            />
          </div>
          
          {/* Priorities */}
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="search" className="form-label me-2 mb-0">Priority</label>
            <CheckboxDropdown options={priorities} />
          </div>

          {/* Status */}
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="search" className="form-label me-2 mb-0">Status</label>
            <CheckboxDropdown options={status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter
