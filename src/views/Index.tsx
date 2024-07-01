import TodoCategories from "@/components/app/TodoCategories";
import { Todo } from "@/types/Todo";
import { useState } from "react";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      text: "hello",
      category: "Today",
    },
  ]);

  const updateTodo = (index: number, todo: Todo) => {
    const newTodos = [...todos];
    newTodos[index] = todo;

    setTodos(newTodos);
  };

  return (
    <main className="w-screen h-screen p-8">
      <TodoCategories todos={todos} updateTodo={updateTodo} />
    </main>
  );
}
