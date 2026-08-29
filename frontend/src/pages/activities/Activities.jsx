import { Activity, Plus } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Activities() {
  const { activities, addActivity } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("fitness");

  const add = () => {
    if (!title.trim()) return;
    addActivity({ title, category, days: ["Mon", "Wed", "Fri"], duration: 60 });
    setTitle("");
  };

  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">ACTIVITIES</p><h1>Your recurring life</h1><p className="muted">Gym, sports, clubs, hobbies and learning are first-class schedule commitments.</p></div></section>
      <div className="panel add-activity"><Activity size={20} /><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add recurring activity, e.g. Gym" /><select value={category} onChange={e => setCategory(e.target.value)}><option value="fitness">Fitness</option><option value="sports">Sports</option><option value="learning">Learning</option><option value="extracurricular">Extracurricular</option></select><button className="btn primary" onClick={add}><Plus size={16} /> Add</button></div>
      <div className="activity-grid">
        {activities.map(a => <div className="activity-card" key={a.id}><div className="activity-icon"><Activity size={19} /></div><div><h3>{a.title}</h3><p className="muted">{a.category} · {a.duration} min</p><div className="day-pills">{a.days.map(d => <span key={d}>{d}</span>)}</div></div></div>)}
      </div>
    </>
  );
}