import React from 'react'

function Filter() {
  return (
    <div className="container mt-4">
      {/* Filtro */}
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
        </div>
      </div>
    </div>
  );
}

export default Filter
