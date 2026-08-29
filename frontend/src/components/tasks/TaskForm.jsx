import { useState } from "react";
import { CATEGORIES, PRIORITIES } from "../../constants/app";

const initial = {
  title: "", category: "academic", priority: "medium", deadline: "",
  duration: 60, importance: 3
};

export default function TaskForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, duration: Number(form.duration), importance: Number(form.importance) });
    setForm(initial);
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <label className="full">Task title<input name="title" value={form.title} onChange={change} placeholder="e.g. Finish DBMS assignment" /></label>
        <label>Category<select name="category" value={form.category} onChange={change}>{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>
        <label>Priority<select name="priority" value={form.priority} onChange={change}>{PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}</select></label>
        <label>Deadline<input type="date" name="deadline" value={form.deadline} onChange={change} /></label>
        <label>Duration (minutes)<input type="number" min="15" step="15" name="duration" value={form.duration} onChange={change} /></label>
        <label>Importance (1-5)<input type="number" min="1" max="5" name="importance" value={form.importance} onChange={change} /></label>
      </div>
      <div className="form-actions"><button type="button" className="btn secondary" onClick={onCancel}>Cancel</button><button className="btn primary">Add task</button></div>
    </form>
  );
}