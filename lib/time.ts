export default function formatDate(date: string) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 8);
  return newDate.toLocaleString();
}
export function formatDateShort(date: string) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 8);
  return newDate.toLocaleDateString();
}
