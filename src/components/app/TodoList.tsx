import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HTMLAttributes } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

export interface TodoListProps extends HTMLAttributes<HTMLDivElement> {
  category: string;
  todos: Todo[];
  draggingTodo?: Todo | null;
  updateTodo: (todo: Todo) => void;
}

export default function TodoList({ category, todos, draggingTodo, updateTodo, ...props }: TodoListProps) {
  const { isOver, setNodeRef } = useDroppable({ id: category });

  return (
    <Card {...props} className={`flex flex-col ${props.className}`}>
      <CardHeader>
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>

      <SortableContext id={category} items={todos.map((t) => t.id)} strategy={rectSortingStrategy}>
        <CardContent ref={setNodeRef} className="flex-grow flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              invisible={draggingTodo?.id === todo.id}
              todo={todo}
              updateTodo={(t) => updateTodo(t)}
            />
          ))}
        </CardContent>
      </SortableContext>
    </Card>
  );
}
