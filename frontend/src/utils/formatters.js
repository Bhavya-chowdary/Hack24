export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date(date));
}

export function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function priorityLabel(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function minutesToHours(minutes) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}