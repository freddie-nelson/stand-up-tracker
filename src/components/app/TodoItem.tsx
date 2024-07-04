import { Todo } from "@/types/Todo";
import { Card } from "../ui/card";
import { FocusEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GripVertical, TrashIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface TodoItemProps {
  todo: Todo;
  invisible?: boolean;
  updateTodo: (todo: Todo) => void;
  deleteTodo: () => void;
}

export default function TodoItem({ todo, invisible, updateTodo, deleteTodo }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const [editing, setEditing] = useState(false);

  const handleUpdate = (e: FocusEvent) => {
    setEditing(false);

    const target = e.target as HTMLInputElement;
    if (target.value.length === 0) {
      return;
    }

    updateTodo({
      ...todo,
      text: target.value,
    });
  };

  return (
    <Card
      ref={setNodeRef}
      variant="light"
      className="group flex items-center p-5 gap-3 relative"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: invisible ? 0 : 1,
      }}
    >
      <Button {...attributes} {...listeners} variant="ghost" size="icon" className="cursor-grab">
        <GripVertical size={24} />
      </Button>

      <Button
        variant="destructive"
        onClick={deleteTodo}
        className="rounded-full w-8 h-8 p-0 absolute -top-3 -right-3 justify-center items-center hidden group-hover:flex"
      >
        <TrashIcon size={14} />
      </Button>

      <Input
        id={`todo-${todo.id}-input`}
        variant={editing ? "default" : "no-border"}
        affects="lg"
        className="text-lg"
        type="text"
        placeholder="todo..."
        onFocus={() => setEditing(true)}
        onBlur={handleUpdate}
        minLength={1}
        defaultValue={todo.text}
      />
    </Card>
  );
}
