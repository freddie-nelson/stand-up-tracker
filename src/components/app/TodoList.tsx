import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";
import Typography from "../ui/typography";
import { Card, CardContent, CardHeader } from "../ui/card";
import { HTMLAttributes } from "react";

export interface TodoListProps extends HTMLAttributes<HTMLDivElement> {
  category: string;
  todos: Todo[];
}

export default function TodoList({ category, todos, ...props }: TodoListProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <Typography variant="h2">{category}</Typography>
      </CardHeader>

      <CardContent>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </CardContent>
    </Card>
  );
}
