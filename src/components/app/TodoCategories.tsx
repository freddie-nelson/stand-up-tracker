import { categorise } from "@/helpers/Todo";
import { Todo } from "@/types/Todo";
import TodoList from "./TodoList";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";

export interface TodoCategoriesProps {
  todos: Todo[];
  updateTodo: (index: number, todo: Todo) => void;
}

export default function TodoCategories({ todos, updateTodo }: TodoCategoriesProps) {
  const categories = categorise(todos);

  const [draggingTodo, setDraggingTodo] = useState<Todo | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const todoId = parseInt(event.active.id.toString());

    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) {
      throw new Error("Todo not found");
    }

    setDraggingTodo(todo);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!draggingTodo || !event.over) {
      return;
    }

    const category = event.over.id.toString();
    draggingTodo.category = category;

    setDraggingTodo(null);
  };

  const handleUpdateTodo = (category: string, index: number, todo: Todo) => {
    const originalTodo = categories.get(category)?.[index];
    if (!originalTodo) {
      throw new Error("Todo not found");
    }

    const todoIndexInArray = todos.indexOf(originalTodo);
    updateTodo(todoIndexInArray, todo);
  };

  return (
    <div className="flex flex-row gap-4 w-full h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {Array.from(categories.entries()).map(([category, todos]) => (
          <TodoList
            className="w-full h-full"
            key={category}
            category={category}
            todos={todos}
            updateTodo={(index, todo) => handleUpdateTodo(category, index, todo)}
          />
        ))}
      </DndContext>
    </div>
  );
}
