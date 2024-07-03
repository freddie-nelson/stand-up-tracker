import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HTMLAttributes } from "react";
import { useDroppable } from "@dnd-kit/core";

export interface TodoListProps extends HTMLAttributes<HTMLDivElement> {
  category: string;
  todos: Todo[];
  updateTodo: (index: number, todo: Todo) => void;
}

export default function TodoList({ category, todos, updateTodo, ...props }: TodoListProps) {
  const { isOver, setNodeRef } = useDroppable({ id: category });

  return (
    <Card {...props} className={`flex flex-col ${props.className}`}>
      <CardHeader>
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>

      <CardContent ref={setNodeRef} className="flex-grow flex flex-col gap-4">
        {todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={(t) => updateTodo(index, t)} />
        ))}
      </CardContent>
    </Card>
  );
}
