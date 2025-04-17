import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import { QueryParams } from '../../interfaces/QueryParams';

// Mock del componente CheckboxDropdown
jest.mock('./ChekboxDropdown', () => (props: any) => {
  const { options, updateOptions } = props;

  return (
    <div>
      {options.map((option: any) => (
        <label key={option.id}>
          <input
            type="checkbox"
            checked={option.checked}
            onChange={() => {
              const updated = options.map((o: any) =>
                o.id === option.id ? { ...o, checked: !o.checked } : o
              );
              updateOptions(updated);
            }}
          />
          {option.id}
        </label>
      ))}
    </div>
  );
});

describe('Filter component', () => {
  it('should call onApplyFilter with correct query params when Search is clicked', () => {
    const mockApplyFilter = jest.fn();

    render(<Filter onApplyFilter={mockApplyFilter} />);

    // Escribir texto en el input
    const input = screen.getByPlaceholderText('Search by text...');
    fireEvent.change(input, { target: { value: 'test todo' } });

    // Marcar "High" priority
    fireEvent.click(screen.getByLabelText('High'));

    // Marcar "Done" status
    fireEvent.click(screen.getByLabelText('Done'));

    // Click en botón Search
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // Validar parámetros que recibe onApplyFilter
    const expectedParams: QueryParams = {
      text: 'test todo',
      completed: 'true', // porque solo "Done" fue seleccionado
      priorities: 'High',
    };

    expect(mockApplyFilter).toHaveBeenCalledWith(expectedParams);
  });

  it('should omit completed if both status are checked', () => {
    const mockApplyFilter = jest.fn();

    render(<Filter onApplyFilter={mockApplyFilter} />);

    // Marcar ambos estados
    fireEvent.click(screen.getByLabelText('Done'));
    fireEvent.click(screen.getByLabelText('Undone'));

    // Click en Search
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockApplyFilter).toHaveBeenCalledWith({
      text: '',
    });
  });

  it('should omit priorities if none are selected', () => {
    const mockApplyFilter = jest.fn();

    render(<Filter onApplyFilter={mockApplyFilter} />);

    // Marcar "Done"
    fireEvent.click(screen.getByLabelText('Done'));

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockApplyFilter).toHaveBeenCalledWith({
      text: '',
      completed: 'true',
    });
  });
});
