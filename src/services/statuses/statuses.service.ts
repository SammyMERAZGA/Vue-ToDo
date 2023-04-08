import axios from "../caller.service";
// Entities
import { Status } from "@/entities/types/Status";

export async function getStatuses() {
  const statuses = await axios.get(`/status`);

  return statuses.data as Status[];
}

export function updateStatus({
  id,
  name,
  icon,
  color,
}: {
  id: number;
  name: string;
  icon: string;
  color: string;
}) {
  axios.post(`/status/${id}`, {
    name,
    icon,
    color,
  });
}

export function deleteStatus(id: number) {
  axios.delete(`/status/${id}`);
}
