import { CalendarClock, Check, Clock3, Trash2 } from "lucide-react";
import { priorityLabel } from "../../utils/formatters";

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div className={`task-card ${task.status === "completed" ? "completed" : ""}`}>
      <button className="check-button" onClick={() => onComplete(task.id)} aria-label="Complete task">
        {task.status === "completed" && <Check size={16} />}
      </button>
      <div className="task-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`badge ${task.priority}`}>{priorityLabel(task.priority)}</span>
        </div>
        <div className="task-meta">
          <span>{task.category}</span>
          <span><Clock3 size={14} /> {task.duration} min</span>
          {task.deadline && <span><CalendarClock size={14} /> {task.deadline}</span>}
        </div>
      </div>
      <button className="icon-button danger" onClick={() => onDelete(task.id)}><Trash2 size={17} /></button>
    </div>
  );
}