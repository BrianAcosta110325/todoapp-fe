import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { TodoService } from '../../Services/TodoService';

jest.mock('../../Services/TodoService');
const mockedTodoService = TodoService as jest.Mocked<typeof TodoService>;

describe('App Component', () => {
  const fakeResponse = {
    data: [
      { id: 1, text: 'Test Todo', completed: false, priority: 'Low', dueDate: new Date().toISOString() },
    ],
    totalPages: 1,
    averageTimeDifference: '1 day',
    averageLowTimeDifference: '2 hours',
    averageMediumTimeDifference: '5 hours',
    averageHighTimeDifference: '1 hour',
  };

  beforeEach(() => {
    mockedTodoService.getTodos.mockResolvedValue(fakeResponse);
  });

  test('renders all main components', async () => {
    render(<App />);
    
    // Initially show loading
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();

    // Wait for loading to finish
    await waitFor(() => {
        expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();
    });

    // Components should be visible
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/New Todo/i)).toBeInTheDocument();
    expect(screen.getByText(/Average time to finish tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  });

  test('applies filter and updates todos', async () => {
    render(<App />);

    // Wait for data to load
    await waitFor(() => {
      expect(mockedTodoService.getTodos).toHaveBeenCalled();
      expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
    });

    // Simulate filter update
    const input = screen.getByPlaceholderText(/Search by text/i);
    fireEvent.change(input, { target: { value: 'Updated' } });

    const applyBtn = screen.getByText(/Search/i);
    fireEvent.click(applyBtn);

    await waitFor(() => {
      expect(mockedTodoService.getTodos).toHaveBeenCalledTimes(2);
    });
  });
});
