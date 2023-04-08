import axios from "../caller.service";
// Entities
import { Category } from "@/entities/types/Category";

export async function getCategories() {
  const categories = await axios.get(`/category`);

  return categories.data as Category[];
}

export function updateCategory({
  id,
  name,
  description,
}: {
  id: number;
  name: string;
  description: string;
}) {
  axios
    .post(`/category/${id}`, {
      name,
      description,
    })
}

export function deleteCategory(id: number) {
  axios.delete(`/category/${id}`);
}
