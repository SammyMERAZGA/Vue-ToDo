import axios from "../caller.service";
// Entities
import { Todo } from "@/entities/types/Todo";

export async function getTodos() {
  const todos = await axios.get(`/todo`);

  return todos.data as Todo[];
}

export async function updateTodo({
  id,
  title,
  description,
  completed,
  category_id,
  status_id,
  is_favorite,
}: {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category_id: number;
  status_id: number;
  is_favorite: boolean;
}) {
  await axios.post(`/todo/${id}`, {
    title,
    description,
    completed,
    category_id,
    status_id,
    is_favorite,
  });
}

export async function deleteTodo(id: number) {
  await axios.delete(`/todo/${id}`);
}

export async function getFavoriteTodos() {
  const favorites = await getTodos().then((todos) => {
    return todos.filter((todo) => todo.is_favorite === true);
  });

  console.log(favorites);

  return favorites;
}
