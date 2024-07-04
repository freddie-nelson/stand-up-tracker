export interface Todo {
  id: number;
  text: string;
}

export interface TodoCategories {
  [category: string]: Todo[];
}
