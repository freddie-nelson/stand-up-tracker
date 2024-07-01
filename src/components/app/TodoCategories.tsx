import { categorise } from "@/helpers/Todo";
import { Todo } from "@/types/Todo";
import TodoList from "./TodoList";

export interface TodoCategoriesProps {
  todos: Todo[];
}

export default function TodoCategories({ todos }: TodoCategoriesProps) {
  const categories = categorise(todos);

  return (
    <div className="flex flex-row gap-4 w-full h-full">
      {Array.from(categories.entries()).map(([category, todos]) => (
        <TodoList className="flex-grow h-full" key={category} category={category} todos={todos} />
      ))}
    </div>
  );
}
