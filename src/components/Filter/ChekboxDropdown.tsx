import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Option {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxDropdownProps {
  options: Option[];
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: string) => {
    setLocalOptions(prevOptions =>
      prevOptions.map(opt =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const selectedLabels = localOptions
    .filter(option => option.checked)
    .map(option => option.label)
    .join(', ') || 'Select Options';

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={toggleDropdown}
      >
        {selectedLabels}
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton"
      >
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
                {option.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxDropdown;
