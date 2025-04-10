import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Option {
  id: string;
  checked: boolean;
}

interface CheckboxDropdownProps {
  options: Option[];
  updateOptions: (updatedOptions: Option[]) => void; // Recibe la función para actualizar el estado
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ options, updateOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if all options are checked
  const allChecked = localOptions.every(opt => opt.checked);

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    if (id === 'all') {
      // If "all" is checked/unchecked, toggle all options
      const updatedOptions = localOptions.map(opt => ({ ...opt, checked: !allChecked }));
      setLocalOptions(updatedOptions);
      updateOptions(updatedOptions); // Update the parent state
    } else {
      const updatedOptions = localOptions.map(opt =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt
      );
      setLocalOptions(updatedOptions);
      updateOptions(updatedOptions); // Update the parent state
    }
  };

  // Selected labels
  const selectedLabels = localOptions
    .filter(option => option.checked)
    .map(option => option.id)
    .join(', ') || 'Select Options';

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={toggleDropdown}
      >
        {selectedLabels}
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton"
      >
        {/* "All" option */}
        <li className="px-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="all"
              checked={allChecked}
              onChange={() => handleCheckboxChange('all')}
            />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>
        </li>
        <hr className="dropdown-divider" />

        {/* Other options */}
        {localOptions.map(option => (
          <li key={option.id} className="px-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={option.id}
                checked={option.checked}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.id}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxDropdown;