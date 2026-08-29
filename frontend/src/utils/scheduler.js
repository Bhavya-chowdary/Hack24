const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };

export function calculatePriorityScore(task) {
  const priority = priorityWeight[task.priority] || 1;
  const deadlinePressure = task.deadline
    ? Math.max(0, 7 - Math.ceil((new Date(task.deadline) - new Date()) / 86400000))
    : 0;
  const urgency = Math.min(deadlinePressure, 7);
  const importance = Number(task.importance || 1);
  const durationPenalty = Math.min(Number(task.duration || 30) / 120, 2);
  return Math.round(priority * 25 + urgency * 7 + importance * 8 - durationPenalty * 3);
}

export function rankTasks(tasks) {
  return [...tasks]
    .map((task) => ({ ...task, score: calculatePriorityScore(task) }))
    .sort((a, b) => b.score - a.score);
}