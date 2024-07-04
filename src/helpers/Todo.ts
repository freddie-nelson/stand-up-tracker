import { TodoCategories } from "@/types/Todo";

export const defaultCategories = ["Previous Day", "Today", "Blockers"];

export function createCategories(categories = defaultCategories): TodoCategories {
  const categoriesObj: TodoCategories = {};

  categories.forEach((category) => {
    categoriesObj[category] = [];
  });

  return categoriesObj;
}

export function findById(todos: TodoCategories, id: number) {
  for (const category in todos) {
    const todoIndex = todos[category].findIndex((t) => t.id === id);

    if (todoIndex !== -1) {
      return { category, index: todoIndex, todo: todos[category][todoIndex] };
    }
  }

  return null;
}
