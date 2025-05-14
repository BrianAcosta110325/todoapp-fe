import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import List from "./List";
import { Todo } from "../../Interfaces/Todo";
import { TodoService } from "../../Services/TodoService";
import Swal from 'sweetalert2';

// Mocks
jest.mock("../../services/TodoService");
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}));

const mockTodos: Todo[] = [
  {
    id: 1,
    text: "Test Task 1",
    priority: "High",
    dueDate: "2025-04-20",
    completed: false,
    dueDateProximity: 1,
  },
];

const mockPagination = {
  page: 0,
  setPage: jest.fn(),
  totalPages: 1
};

describe("List Component", () => {
  const onEditTodo = jest.fn();
  const onApplySort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders todos table", () => {
    render(
      <List
        onEditTodo={onEditTodo}
        todos={mockTodos}
        pagination={mockPagination}
        onApplySort={onApplySort}
      />
    );

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  test("calls onApplySort when clicking sort headers", () => {
    render(
      <List
        onEditTodo={onEditTodo}
        todos={mockTodos}
        pagination={mockPagination}
        onApplySort={onApplySort}
      />
    );

    fireEvent.click(screen.getByText(/Priority/i));
    expect(onApplySort).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/Due Date/i));
    expect(onApplySort).toHaveBeenCalledTimes(2);
  });

  test("shows the edit form on edit button click", () => {
    render(
      <List
        onEditTodo={onEditTodo}
        todos={mockTodos}
        pagination={mockPagination}
        onApplySort={onApplySort}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByText(/Edit Todo/i)).toBeInTheDocument();
  });
});
