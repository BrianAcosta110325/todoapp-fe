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

  // Manejar clics fuera del componente para cerrar el dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Verifica si todos están seleccionados
  const allChecked = localOptions.every(opt => opt.checked);

  // Maneja cambios de checkboxes
  const handleCheckboxChange = (id: string) => {
    if (id === 'all') {
      // Si se hace clic en "Todos", activa o desactiva todos
      setLocalOptions(prev =>
        prev.map(opt => ({ ...opt, checked: !allChecked }))
      );
    } else {
      // Cambiar individualmente una opción
      setLocalOptions(prev =>
        prev.map(opt =>
          opt.id === id ? { ...opt, checked: !opt.checked } : opt
        )
      );
    }
  };

  // Etiquetas seleccionadas
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
        {/* Opción "Todos" */}
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
              Todos
            </label>
          </div>
        </li>
        <hr className="dropdown-divider" />

        {/* Otras opciones */}
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