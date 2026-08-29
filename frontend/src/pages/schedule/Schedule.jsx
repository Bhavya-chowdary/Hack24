import { CalendarDays, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import Timeline from "../../components/schedule/Timeline";
import { useApp } from "../../context/AppContext";

export default function Schedule() {
  const { schedule, replan, updateScheduleItem } = useApp();

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">SCHEDULE</p><h1>Adaptive schedule</h1><p className="muted">Your plan changes as your priorities and reality change.</p></div>
        <button className="btn primary" onClick={replan}><RefreshCw size={17} /> AI replan</button>
      </section>
      <div className="date-strip">
        <button className="icon-button"><ChevronLeft size={18} /></button>
        <div><CalendarDays size={18} /><strong>Today</strong><span>30 Aug 2026</span></div>
        <button className="icon-button"><ChevronRight size={18} /></button>
      </div>
      <div className="panel"><Timeline items={schedule} onStatusChange={(id, status) => updateScheduleItem(id, { status })} /></div>
    </>
  );
}