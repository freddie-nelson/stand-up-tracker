import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HTMLAttributes } from "react";

export interface TodoListProps extends HTMLAttributes<HTMLDivElement> {
  category: string;
  todos: Todo[];
  updateTodo: (index: number, todo: Todo) => void;
}

export default function TodoList({ category, todos, updateTodo, ...props }: TodoListProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>

      <CardContent>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} updateTodo={(t) => updateTodo(index, t)} />
        ))}
      </CardContent>
    </Card>
  );
}
