import { Todo } from "@/types/Todo";

export interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <p>{todo.text}</p>
    </div>
  );
}
