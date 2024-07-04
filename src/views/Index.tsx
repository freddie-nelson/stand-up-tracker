import TodoCategories from "@/components/app/TodoCategories";
import { createCategories, findById } from "@/helpers/Todo";
import { Todo, TodoCategories as TodoCategoriesType } from "@/types/Todo";
import { useEffect, useState } from "react";

export default function Index() {
  const [todos, setTodos] = useState<TodoCategoriesType>(createCategories());
  useEffect(() => {
    const newTodos = { ...todos };
    newTodos["Today"] = [
      {
        id: 1,
        text: "Add drag and drop",
      },
      {
        id: 2,
        text: "Add a new todo",
      },
    ];

    setTodos(newTodos);
  }, []);

  const updateTodo = (todo: Todo) => {
    const found = findById(todos, todo.id);
    if (!found) {
      throw new Error("Could not find todo, you may have changed the id of the todo, don't do this.");
    }

    const newTodos = { ...todos };
    newTodos[found.category][found.index] = todo;

    setTodos(newTodos);
  };

  const moveTodo = (todo: Todo, newCategory: string, newIndex: number) => {
    const found = findById(todos, todo.id);
    if (!found) {
      throw new Error("Could not find todo, you may have changed the id of the todo, don't do this.");
    }

    const newTodos = { ...todos };
    newTodos[found.category].splice(found.index, 1);
    newTodos[newCategory].splice(newIndex, 0, todo);
  };

  return (
    <main className="w-screen h-screen p-8">
      <TodoCategories todos={todos} updateTodo={updateTodo} moveTodo={moveTodo} />
    </main>
  );
}
