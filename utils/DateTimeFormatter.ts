// utils/dateFormatter.ts
export function formatDate(dateString: string): string {
  const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function formatTime(timeString: string): string {
  return new Date(timeString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
