import { categorise } from "@/helpers/Todo";
import { Todo } from "@/types/Todo";
import TodoList from "./TodoList";

export interface TodoCategoriesProps {
  todos: Todo[];
  updateTodo: (index: number, todo: Todo) => void;
}

export default function TodoCategories({ todos, updateTodo }: TodoCategoriesProps) {
  const categories = categorise(todos);

  const handleUpdateTodo = (category: string, index: number, todo: Todo) => {
    const originalTodo = categories.get(category)?.[index];
    if (!originalTodo) {
      throw new Error("Todo not found");
    }

    const todoIndexInArray = todos.indexOf(originalTodo);
    updateTodo(todoIndexInArray, todo);
  };

  return (
    <div className="flex flex-row gap-4 w-full h-full">
      {Array.from(categories.entries()).map(([category, todos]) => (
        <TodoList
          className="flex-grow h-full"
          key={category}
          category={category}
          todos={todos}
          updateTodo={(index, todo) => handleUpdateTodo(category, index, todo)}
        />
      ))}
    </div>
  );
}
