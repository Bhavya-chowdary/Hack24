import { useEffect, useState } from "react";
import { PRIORITIES, TASK_CATEGORIES } from "../../constants/app";

const createInitialForm = (category = "academic", status = "pending") => ({
  title: "",
  category,
  priority: "medium",
  deadline: "",
  targetTime: "",
  delayMinutes: 0,
  duration: 60,
  importance: 3,
  status
});

export default function TaskForm({ onSubmit, onCancel, defaultCategory = "academic" }) {
  const [form, setForm] = useState(createInitialForm(defaultCategory));

  useEffect(() => {
    setForm((current) => ({ ...current, category: defaultCategory }));
  }, [defaultCategory]);

  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSubmit({
      ...form,
      title: form.title.trim(),
      targetTime: form.targetTime || "",
      delayMinutes: Number(form.delayMinutes) || 0,
      duration: Number(form.duration),
      importance: Number(form.importance),
      status: form.status || "pending"
    });

    setForm(createInitialForm(defaultCategory, form.status));
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <label className="full">Task title<input name="title" value={form.title} onChange={change} placeholder="e.g. Finish DBMS assignment" /></label>
        <label>Category<select name="category" value={form.category} onChange={change}>{TASK_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>
        <label>Status<select name="status" value={form.status} onChange={change}><option value="pending">Pending</option><option value="completed">Finished</option></select></label>
        <label>Priority<select name="priority" value={form.priority} onChange={change}>{PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}</select></label>
        <label>Target time<input type="time" name="targetTime" value={form.targetTime} onChange={change} /></label>
        <label>Delay time (minutes)<input type="number" min="0" step="5" name="delayMinutes" value={form.delayMinutes} onChange={change} /></label>
        <label>Deadline<input type="date" name="deadline" value={form.deadline} onChange={change} /></label>
        <label>Duration (minutes)<input type="number" min="15" step="15" name="duration" value={form.duration} onChange={change} /></label>
        <label>Importance (1-5)<input type="number" min="1" max="5" name="importance" value={form.importance} onChange={change} /></label>
      </div>
      <div className="form-actions"><button type="button" className="btn secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn primary">Add task</button></div>
    </form>
  );
}