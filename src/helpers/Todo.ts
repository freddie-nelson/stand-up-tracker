import { Todo } from "@/types/Todo";

export const defaultCategories = ["Previous Day", "Today", "Blockers"];

export function categorise(todos: Todo[]) {
  const categories = new Map<string, Todo[]>();

  for (const todo of todos) {
    if (!categories.has(todo.category)) {
      categories.set(todo.category, []);
    }

    categories.get(todo.category)?.push(todo);
  }

  for (const category of defaultCategories) {
    if (!categories.has(category)) {
      categories.set(category, []);
    }
  }

  return categories;
}
