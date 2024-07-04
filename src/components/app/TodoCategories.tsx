import { Todo, TodoCategories as TodoCategoriesType } from "@/types/Todo";
import TodoList from "./TodoList";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { findById } from "@/helpers/Todo";
import TodoItem from "./TodoItem";

export interface TodoCategoriesProps {
  todos: TodoCategoriesType;
  updateTodo: (todo: Todo) => void;
  createTodo: (category: string) => void;
  deleteTodo: (todo: Todo) => void;
  moveTodo: (todo: Todo, newCategory: string, newIndex: number) => void;
}

export default function TodoCategories({
  todos,
  updateTodo,
  createTodo,
  deleteTodo,
  moveTodo,
}: TodoCategoriesProps) {
  const [draggingTodo, setDraggingTodo] = useState<Todo | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const todoId = parseInt(event.active.id.toString());

    const found = findById(todos, todoId);
    if (!found) {
      throw new Error("Could not find todo");
    }

    setDraggingTodo(found.todo);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!draggingTodo || !event.over) {
      return false;
    }

    const found = findById(todos, draggingTodo.id);
    if (!found) {
      throw new Error("Could not find todo");
    }

    const category = event.over.data?.current
      ? event.over.data.current?.sortable.containerId
      : event.over.id.toString();
    const index = event.over.data?.current ? event.over.data.current?.sortable.index : found.index;
    if (category === found.category && index === found.index) {
      return;
    }

    console.log(event.delta);
    moveTodo(draggingTodo, category, index);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingTodo(null);

    if (!draggingTodo || !event.over) {
      return;
    }

    const found = findById(todos, draggingTodo.id);
    if (!found) {
      throw new Error("Could not find todo");
    }

    const category = event.over.data?.current
      ? event.over.data.current?.sortable.containerId
      : event.over.id.toString();
    const index = event.over.data?.current ? event.over.data.current?.sortable.index : found.index;
    if (category === found.category && index === found.index) {
      return;
    }

    moveTodo(draggingTodo, category, index);
  };

  return (
    <div className="flex flex-row gap-4 w-full h-full">
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        {Array.from(Object.entries(todos)).map(([category, todos]) => (
          <TodoList
            className="w-full h-full"
            key={category}
            category={category}
            todos={todos}
            draggingTodo={draggingTodo}
            updateTodo={updateTodo}
            createTodo={() => createTodo(category)}
            deleteTodo={deleteTodo}
          />
        ))}

        <DragOverlay>
          {draggingTodo && (
            <TodoItem
              todo={draggingTodo}
              updateTodo={updateTodo}
              deleteTodo={() => deleteTodo(draggingTodo)}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
