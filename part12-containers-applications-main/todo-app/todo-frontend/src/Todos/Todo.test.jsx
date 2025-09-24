import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Todo from "./Todo";

test("renders todo text and buttons", async () => {
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  const todo = { text: "Learn Vitest", done: false };

  render(
    <Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />
  );

  // texto do todo
  expect(screen.getByText(/Learn Vitest/i)).toBeInTheDocument();
  // botões
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  expect(screen.getByText(/Set as done/i)).toBeInTheDocument();

  // simular clique
  await userEvent.click(screen.getByText(/Delete/i));
  expect(mockDelete).toHaveBeenCalledWith(todo);

  await userEvent.click(screen.getByText(/Set as done/i));
  expect(mockComplete).toHaveBeenCalledWith(todo);
});
