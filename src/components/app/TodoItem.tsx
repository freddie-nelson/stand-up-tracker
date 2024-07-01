import { Todo } from "@/types/Todo";
import { Card, CardContent } from "../ui/card";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

export default function TodoItem({ todo, updateTodo }: TodoItemProps) {
  const textInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);

  const handleUpdate = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length === 0) {
      return;
    }

    updateTodo({
      ...todo,
      text: target.value,
    });

    setEditing(false);
  };

  return (
    <Card variant="light" className="flex items-center p-5">
      <Input
        variant={editing ? "default" : "no-border"}
        affects="lg"
        className="text-lg"
        type="text"
        placeholder="todo..."
        onFocus={() => setEditing(true)}
        onBlur={handleUpdate}
        minLength={1}
      />
    </Card>
  );
}
