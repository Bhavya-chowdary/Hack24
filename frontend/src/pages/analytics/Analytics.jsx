import { BarChart3, CheckCircle2, Clock3, Target } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import StatCard from "../../components/common/StatCard";
import { useApp } from "../../context/AppContext";

const data = [
  { day: "Mon", study: 4.2, fitness: 1 },
  { day: "Tue", study: 3.5, fitness: 1.5 },
  { day: "Wed", study: 5.1, fitness: 1 },
  { day: "Thu", study: 4.4, fitness: 1.5 },
  { day: "Fri", study: 3.8, fitness: 1 },
  { day: "Sat", study: 2.5, fitness: 1.5 },
  { day: "Sun", study: 3.2, fitness: 0.5 }
];

export default function Analytics() {
  const { tasks, goals } = useApp();
  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">ANALYTICS</p><h1>Your life balance</h1><p className="muted">See where your time is going and whether your goals are moving.</p></div></section>
      <div className="stats-grid">
        <StatCard icon={Clock3} label="Focus time" value="26.7h" helper="This week" />
        <StatCard icon={CheckCircle2} label="Completion rate" value={`${Math.round(tasks.filter(t=>t.status==="completed").length / Math.max(tasks.length,1)*100)}%`} helper="Tasks" />
        <StatCard icon={Target} label="Active goals" value={goals.length} helper="Across life areas" />
        <StatCard icon={BarChart3} label="Schedule adherence" value="82%" helper="7-day average" />
      </div>
      <section className="panel chart-panel"><div className="panel-header"><div><h2>Weekly time allocation</h2><p className="muted">Hours planned by category</p></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="study" name="Study" /><Bar dataKey="fitness" name="Fitness" /></BarChart></ResponsiveContainer></div></section>
    </>
  );
}