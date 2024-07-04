import { Button, ButtonProps } from "../ui/button";
import { PlusIcon } from "lucide-react";

export interface TodoItemProps {}

export default function CreateTodoButton(props: ButtonProps) {
  return (
    <Button variant="secondary" {...props} className={`p-8 ${props.className}`}>
      <PlusIcon size={24} className="text-current" />
    </Button>
  );
}
