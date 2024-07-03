import { Todo } from "@/types/Todo";

export const defaultCategories = ["Previous Day", "Today", "Blockers"];

export function categorise(todos: Todo[]) {
  const categories = new Map<string, Todo[]>();

  for (const category of defaultCategories) {
    categories.set(category, []);
  }

  for (const todo of todos) {
    if (!categories.has(todo.category)) {
      categories.set(todo.category, []);
    }

    categories.get(todo.category)?.push(todo);
  }

  return categories;
}
