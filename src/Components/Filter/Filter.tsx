import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxDropdown from './ChekboxDropdown';
import { QueryParams } from '../../Interfaces/QueryParams';

interface FilterProps {
  onApplyFilter: (filterData: QueryParams) => void;
  loading: boolean;
}

interface CheckboxOption {
  id: string;
  checked: boolean;
}

function Filter({ onApplyFilter, loading }: FilterProps) {
  const [searchText, setSearchText] = useState("");

  const [priorities, setPriorities] = useState([
    { id: 'High', checked: false },
    { id: 'Medium', checked: false },
    { id: 'Low', checked: false },
  ]);

  const [status, setStatus] = useState([
    { id: 'Done', checked: false },
    { id: 'Undone', checked: false },
  ]);

  const updatePriorities = (updatedPriorities: CheckboxOption[]) => {
    setPriorities(updatedPriorities);
  };

  const updateStatus = (updatedStatus: CheckboxOption[]) => {
    setStatus(updatedStatus);
  };

  const applyFilter = () => {
    const completed = status[0].checked === status[1].checked ? null : status[0].checked;
    const prioritiesChecked: string[] = priorities.filter(option => option.checked).map(option => option.id);

    const queryParams: QueryParams = {
      text: searchText,
    };

    if (completed != null) queryParams.completed = completed.toString();
    if (prioritiesChecked.length > 0) queryParams.priorities = prioritiesChecked.join(',');

    onApplyFilter(queryParams);
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
      
          <div className="row align-items-center mb-3">
            {/* Priorities */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="priority" className="form-label me-2 mb-0" style={{ width: '60px' }}>Priority</label>
              <CheckboxDropdown options={priorities} updateOptions={updatePriorities} />
            </div>

            {/* Status */}
            <div className="col d-flex align-items-center mb-3">
              <label htmlFor="status" className="form-label me-2 mb-0" style={{ width: '60px' }}>Status</label>
              <CheckboxDropdown options={status} updateOptions={updateStatus} />
            </div>

            <button
              className="col-auto btn btn-primary me-2 mb-0"
              type="button"
              onClick={applyFilter}
              style={{ width: '100px' }}
              disabled={loading}
            >
              {loading ? 'Filtering...' : 'Apply Filter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter
