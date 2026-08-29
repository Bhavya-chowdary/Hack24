import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { formatTime } from "../../utils/formatters";

export default function Timeline({ items, onStatusChange }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div className="timeline-row" key={item.id}>
          <div className="timeline-time">{formatTime(item.time)}</div>
          <div className="timeline-line"><span /></div>
          <div className={`schedule-item ${item.status === "done" ? "done" : ""}`}>
            <div className="schedule-item-main">
              <div className="schedule-item-title">
                <h3>{item.title}</h3>
                <span className="category-pill">{item.category}</span>
              </div>
              <span className="muted"><Clock3 size={14} /> {item.duration} min</span>
            </div>
            <button className="status-button" onClick={() => onStatusChange?.(item.id, item.status === "done" ? "planned" : "done")}>
              {item.status === "done" ? <CheckCircle2 size={21} /> : <Circle size={21} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}