import { Goal, Plus } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Goals() {
  const { goals, addGoal, updateGoal } = useApp();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("academic");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addGoal({ title, category, progress: 0, target: "Define your target" });
    setTitle(""); setShow(false);
  };

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">GOALS</p><h1>Build the life you want</h1><p className="muted">LifeSync balances short-term tasks against long-term goals.</p></div>
        <button className="btn primary" onClick={() => setShow(!show)}><Plus size={17} /> New goal</button>
      </section>
      {show && <form className="form-card inline-form" onSubmit={submit}><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Goal name" /><select value={category} onChange={e => setCategory(e.target.value)}><option value="academic">Academics</option><option value="career">Career</option><option value="fitness">Fitness</option><option value="personal">Personal</option></select><button className="btn primary">Create</button></form>}
      <div className="goals-grid">
        {goals.map(goal => (
          <div className="goal-card" key={goal.id}>
            <div className="goal-icon"><Goal size={20} /></div>
            <span className="category-pill">{goal.category}</span>
            <h2>{goal.title}</h2>
            <p className="muted">{goal.target}</p>
            <div className="progress-row"><strong>{goal.progress}%</strong><input type="range" min="0" max="100" value={goal.progress} onChange={e => updateGoal(goal.id, { progress: Number(e.target.value) })} /></div>
            <div className="progress-track"><span style={{ width: `${goal.progress}%` }} /></div>
          </div>
        ))}
      </div>
    </>
  );
}