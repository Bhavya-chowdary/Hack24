import { ArrowRight, Brain, CheckCircle2, Clock3, Flame, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import Timeline from "../../components/schedule/Timeline";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { tasks, goals, schedule, replan, updateScheduleItem } = useApp();
  const { user } = useAuth();
  const completed = tasks.filter(t => t.status === "completed").length;

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">SUNDAY, 30 AUGUST</p><h1>Good morning, {user?.name || "Student"} 👋</h1><p className="muted">Here is how your life is shaping up today.</p></div>
        <button className="btn primary" onClick={replan}><Brain size={17} /> Replan my day</button>
      </section>

      <div className="stats-grid">
        <StatCard icon={CheckCircle2} label="Tasks completed" value={`${completed}/${tasks.length}`} helper="Keep the momentum" />
        <StatCard icon={Clock3} label="Planned today" value="7h 45m" helper="Across 4 life areas" />
        <StatCard icon={Target} label="Goal progress" value={`${Math.round(goals.reduce((a,g)=>a+g.progress,0)/goals.length)}%`} helper="Average progress" />
        <StatCard icon={Flame} label="Consistency" value="82%" helper="+6% this week" />
      </div>

      <div className="dashboard-grid">
        <section className="panel large-panel">
          <div className="panel-header"><div><h2>Today's schedule</h2><p className="muted">AI-prioritized around your commitments</p></div><Link to="/today" className="text-link">View full day <ArrowRight size={15} /></Link></div>
          <Timeline items={schedule.slice(0, 6)} onStatusChange={(id, status) => updateScheduleItem(id, { status })} />
        </section>

        <section className="panel">
          <div className="panel-header"><div><h2>AI insight</h2><p className="muted">Why this plan works</p></div><Brain size={20} /></div>
          <div className="ai-insight">
            <div className="ai-icon"><Zap size={18} /></div>
            <p>Your DBMS assignment is your highest-priority task. I placed it before your evening career session so the deadline risk is lower without removing your fitness and sports commitments.</p>
          </div>
          <Link to="/ai" className="btn secondary full-width">Open AI planner</Link>
        </section>
      </div>
    </>
  );
}