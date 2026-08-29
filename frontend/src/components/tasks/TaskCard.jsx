import { CalendarClock, Check, Clock3, TimerReset, Trash2 } from "lucide-react";
import { TASK_CATEGORIES } from "../../constants/app";
import { priorityLabel } from "../../utils/formatters";

export default function TaskCard({ task, onComplete, onDelete }) {
  const categoryLabel = TASK_CATEGORIES.find((category) => category.id === task.category)?.label ?? task.category?.replace(/_/g, " ") ?? "General";
  const targetTimeLabel = task.targetTime ? `Target time: ${task.targetTime}` : "Target time: Not set";
  const delayLabel = Number(task.delayMinutes) > 0 ? `Delay: ${task.delayMinutes} min` : "Delay: 0 min";

  return (
    <div className={`task-card ${task.status === "completed" ? "completed" : ""}`}>
      <button type="button" className="check-button" onClick={() => onComplete(task.id)} aria-label={task.status === "completed" ? "Mark task as unfinished" : "Mark task as finished"}>
        {task.status === "completed" && <Check size={16} />}
      </button>
      <div className="task-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`badge ${task.priority}`}>{priorityLabel(task.priority)}</span>
        </div>
        <div className="task-meta">
          <span>{categoryLabel}</span>
          <span><Clock3 size={14} /> {task.duration} min</span>
          {task.targetTime && <span><Clock3 size={14} /> {targetTimeLabel}</span>}
          {Number(task.delayMinutes) > 0 && <span><TimerReset size={14} /> {delayLabel}</span>}
          {task.deadline && <span><CalendarClock size={14} /> {task.deadline}</span>}
        </div>
      </div>
      <button type="button" className="icon-button danger" onClick={() => onDelete(task.id)}><Trash2 size={17} /></button>
    </div>
  );
}