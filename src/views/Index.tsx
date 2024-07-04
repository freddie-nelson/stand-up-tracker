import TodoCategories from "@/components/app/TodoCategories";
import { createCategories, findById } from "@/helpers/Todo";
import { Todo, TodoCategories as TodoCategoriesType } from "@/types/Todo";
import { useEffect, useState } from "react";

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState<TodoCategoriesType>(createCategories());

  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      return;
    }

    const savedTodos = JSON.parse(localStorage.getItem("todos")!);
    setTodos(savedTodos);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (todo: Todo) => {
    const found = findById(todos, todo.id);
    if (!found) {
      throw new Error("Could not find todo, you may have changed the id of the todo, don't do this.");
    }

    const newTodos = { ...todos };
    newTodos[found.category][found.index] = todo;

    setTodos(newTodos);
  };

  const createTodo = (category: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: "",
    };

    const newTodos = { ...todos };
    newTodos[category].unshift(newTodo);

    setTodos(newTodos);

    const focusInterval = setInterval(() => {
      const input = document.getElementById(`todo-${newTodo.id}-input`);
      if (input) {
        input.focus();
        clearInterval(focusInterval);
      }
    }, 10);
  };

  const deleteTodo = (todo: Todo) => {
    const found = findById(todos, todo.id);
    if (!found) {
      throw new Error("Could not find todo, you may have changed the id of the todo, don't do this.");
    }

    const newTodos = { ...todos };
    newTodos[found.category].splice(found.index, 1);

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
      <TodoCategories
        todos={todos}
        updateTodo={updateTodo}
        moveTodo={moveTodo}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
      />
    </main>
  );
}
