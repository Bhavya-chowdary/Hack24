import { Brain, RefreshCw } from "lucide-react";
import Timeline from "../../components/schedule/Timeline";
import { useApp } from "../../context/AppContext";

export default function Today() {
  const { schedule, replan, updateScheduleItem } = useApp();

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">TODAY</p><h1>Your complete day</h1><p className="muted">One timeline for study, work, fitness, sports and personal life.</p></div>
        <button className="btn primary" onClick={replan}><RefreshCw size={17} /> Recalculate schedule</button>
      </section>
      <div className="panel">
        <div className="plan-banner"><Brain size={20} /><div><strong>Adaptive plan active</strong><span>Change a task or mark it complete and LifeSync can recalculate the remaining day.</span></div></div>
        <Timeline items={schedule} onStatusChange={(id, status) => updateScheduleItem(id, { status })} />
      </div>
    </>
  );
}