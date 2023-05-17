import axios from "../caller.service";
// Entities
import { Status } from "@/entities/types/Status";

export async function createStatus({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  await axios.post(`/status`, {
    name,
    icon,
    color,
    created_at: new Date(),
  });
  getStatuses();
}

export async function getStatuses() {
  const status = await axios.get(`/status`);

  return status.data as Status[];
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
  axios.put(`/status/${id}`, {
    name,
    icon,
    color,
  });
  getStatuses();
}

export function deleteStatus(id: number) {
  axios.delete(`/status/${id}`);
  getStatuses();
}
