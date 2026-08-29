import { Goal, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";

const goalTypes = [
  { id: "weekly-plan", label: "Weekly plan" },
  { id: "15-days-plan", label: "15 days plan" },
  { id: "monthly-plan", label: "Monthly plan" },
  { id: "short-term", label: "Short term goal" },
  { id: "long-term", label: "Long term goal" }
];

const statusLabel = {
  "not-started": "Not started",
  "on-track": "On track",
  "at-risk": "At risk",
  completed: "Completed"
};

const defaultForm = {
  title: "",
  category: "academic",
  goalType: "weekly-plan",
  target: "",
  progress: 0,
  milestones: ["", "", ""]
};

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useApp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const summary = useMemo(
    () => goalTypes.map((type) => {
      const items = goals.filter((goal) => goal.goalType === type.id);
      const average = items.length ? Math.round(items.reduce((sum, goal) => sum + (goal.progress || 0), 0) / items.length) : 0;
      return { ...type, count: items.length, average };
    }),
    [goals]
  );

  const updateProgress = (goalId, progress) => {
    const nextProgress = Math.min(100, Math.max(0, Number(progress) || 0));
    const status = nextProgress >= 100 ? "completed" : nextProgress >= 60 ? "on-track" : nextProgress >= 30 ? "at-risk" : "not-started";
    updateGoal(goalId, { progress: nextProgress, status });
  };

  const submit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const target = form.target.trim();
    if (!title || !target) return;

    const milestones = form.milestones.map((item) => item.trim()).filter(Boolean);
    const nextProgress = Number(form.progress) || 0;
    const status = nextProgress >= 100 ? "completed" : nextProgress >= 60 ? "on-track" : nextProgress >= 30 ? "at-risk" : "not-started";

    addGoal({
      title,
      category: form.category,
      goalType: form.goalType,
      target,
      progress: nextProgress,
      status,
      milestones: milestones.length ? milestones : ["Start with the first step and keep moving daily"]
    });

    setForm(defaultForm);
    setShow(false);
  };

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">GOALS</p>
          <h1>Build the life you want</h1>
          <p className="muted">Track weekly, 15-day, monthly, short-term, and long-term progress in one place.</p>
        </div>
        <button className="btn primary" onClick={() => setShow(!show)}><Plus size={17} /> New goal</button>
      </section>

      <div className="goal-summary-grid">
        {summary.map((item) => (
          <div className="goal-summary-card" key={item.id}>
            <span className="goal-summary-label">{item.label}</span>
            <strong>{item.count}</strong>
            <small>{item.average}% avg progress</small>
          </div>
        ))}
      </div>

      {show && (
        <form className="form-card goals-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              Goal name
              <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Example: Improve CGPA" />
            </label>
            <label>
              Category
              <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
                <option value="academic">Academics</option>
                <option value="career">Career</option>
                <option value="fitness">Fitness</option>
                <option value="personal">Personal</option>
                <option value="learning">Learning</option>
                <option value="sports">Sports</option>
              </select>
            </label>
            <label>
              Goal type
              <select value={form.goalType} onChange={(e) => setForm((prev) => ({ ...prev, goalType: e.target.value }))}>
                {goalTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </label>
            <label>
              Target
              <input value={form.target} onChange={(e) => setForm((prev) => ({ ...prev, target: e.target.value }))} placeholder="Define your target" />
            </label>
          </div>

          <div className="form-grid form-grid-tight">
            <label>
              Current progress
              <input type="range" min="0" max="100" value={form.progress} onChange={(e) => setForm((prev) => ({ ...prev, progress: Number(e.target.value) }))} />
            </label>
            <div className="progress-badge"><strong>{form.progress}%</strong></div>
          </div>

          <div className="form-grid form-grid-tight">
            {form.milestones.map((milestone, index) => (
              <label key={index}>
                Milestone {index + 1}
                <input value={milestone} onChange={(e) => setForm((prev) => {
                  const next = [...prev.milestones];
                  next[index] = e.target.value;
                  return { ...prev, milestones: next };
                })} placeholder="Add a checkpoint" />
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn secondary" onClick={() => setShow(false)}>Cancel</button>
            <button className="btn primary">Create goal</button>
          </div>
        </form>
      )}

      <div className="goals-grid">
        {goals.map((goal) => {
          const typeLabel = goalTypes.find((type) => type.id === goal.goalType)?.label || "Goal";
          const status = statusLabel[goal.status] || "Not started";

          return (
            <div className="goal-card" key={goal.id}>
              <div className="goal-card-top">
                <div className="goal-icon"><Goal size={20} /></div>
                <div className="goal-header-meta">
                  <span className="category-pill">{goal.category}</span>
                  <span className={`status-pill ${goal.status || "not-started"}`}>{status}</span>
                </div>
              </div>

              <div className="goal-card-header">
                <div>
                  <span className="goal-type-tag">{typeLabel}</span>
                  <h2>{goal.title}</h2>
                </div>
                <button type="button" className="icon-btn" aria-label="Delete goal" onClick={() => deleteGoal(goal.id)}>
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="muted">{goal.target}</p>

              <ul className="milestone-list">
                {(goal.milestones?.length ? goal.milestones : ["Keep progressing one step at a time"]).map((item, index) => (
                  <li key={`${goal.id}-checkpoint-${index}`}>{item}</li>
                ))}
              </ul>

              <div className="progress-row">
                <strong>{goal.progress || 0}%</strong>
                <input type="range" min="0" max="100" value={goal.progress || 0} onChange={(e) => updateProgress(goal.id, e.target.value)} />
              </div>

              <div className="progress-track">
                <span style={{ width: `${goal.progress || 0}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}