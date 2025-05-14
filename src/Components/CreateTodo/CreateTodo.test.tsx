import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTodo from './CreateTodo';
import { TodoService } from '../../Services/TodoService';
import Swal from 'sweetalert2';

jest.mock('../../Services/TodoService');
jest.mock('sweetalert2');

describe('CreateTodo', () => {
    test("renders the CreateTodo button", () => {
        render(<CreateTodo onCreateTodo={() => {}} />);
        const buttonElement = screen.getByText('+ New Todo');  
        expect(buttonElement).toBeInTheDocument();
    });
  const mockOnCreateTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays the form when clicking "+ New Todo"', () => {
    render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
    fireEvent.click(screen.getByText('+ New Todo'));
    expect(screen.getByText('Create Todo')).toBeInTheDocument();
  });

  test('submits the form successfully and calls onCreateTodo', async () => {
    (TodoService.addTodo as jest.Mock).mockResolvedValueOnce({});

    render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
    fireEvent.click(screen.getByText('+ New Todo'));

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test todo' },
    });

    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2025-05-01' },
    });

    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: 'Low' },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Todo Created',
        text: 'Your new todo has been successfully created!',
        "timer": 1500,
        "showConfirmButton": false,
      });
      expect(mockOnCreateTodo).toHaveBeenCalled();
    });
  });

  test('shows an error alert if submission fails', async () => {
    (TodoService.addTodo as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
    fireEvent.click(screen.getByText('+ New Todo'));

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Error',
        text: 'Please verify your text input and try again.',
      });
    });
  });
});
