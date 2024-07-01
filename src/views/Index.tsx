import TodoCategories from "@/components/app/TodoCategories";
import { Todo } from "@/types/Todo";
import { useState } from "react";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <main className="w-screen h-screen p-8">
      <TodoCategories todos={todos} />
    </main>
  );
}
