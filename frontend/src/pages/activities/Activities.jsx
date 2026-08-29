import { Activity, MoreHorizontal, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Daily"];

const defaultForm = {
  title: "",
  category: "fitness",
  days: ["Mon", "Wed", "Fri"],
  duration: 60
};

const addDays = (baseDate, days) => {
  const next = new Date(baseDate);
  next.setDate(next.getDate() + days);
  return next;
};

export default function Activities() {
  const { activities, addActivity, updateActivity, freezeActivity, unfreezeActivity } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("fitness");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [freezeActivityId, setFreezeActivityId] = useState(null);
  const [freezePreset, setFreezePreset] = useState("1-week");
  const [customFreezeDate, setCustomFreezeDate] = useState("");
  const [now, setNow] = useState(Date.now());
  const [editForm, setEditForm] = useState(defaultForm);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const isActivityFrozen = (activity) => {
    if (!activity.freezeEndsAt) return false;
    return new Date(activity.freezeEndsAt).getTime() > now;
  };

  const add = () => {
    if (!title.trim()) return;
    addActivity({ title, category, days: ["Mon", "Wed", "Fri"], duration: 60 });
    setTitle("");
  };

  const openEdit = (activity) => {
    setEditingActivity(activity);
    setEditForm({
      title: activity.title,
      category: activity.category,
      days: Array.isArray(activity.days) ? [...activity.days] : [],
      duration: Number(activity.duration) || 60
    });
    setMenuOpenId(null);
  };

  const closeEdit = () => {
    setEditingActivity(null);
    setEditForm(defaultForm);
  };

  const openFreeze = (activity) => {
    setFreezeActivityId(activity.id);
    setFreezePreset("1-week");
    setCustomFreezeDate("");
    setMenuOpenId(null);
  };

  const closeFreeze = () => {
    setFreezeActivityId(null);
    setFreezePreset("1-week");
    setCustomFreezeDate("");
  };

  const toggleDay = (day) => {
    setEditForm((prev) => {
      const hasDay = prev.days.includes(day);
      return {
        ...prev,
        days: hasDay ? prev.days.filter((item) => item !== day) : [...prev.days, day]
      };
    });
  };

  const saveEdit = () => {
    if (!editingActivity || !editForm.title.trim()) return;

    updateActivity(editingActivity.id, {
      title: editForm.title.trim(),
      category: editForm.category,
      days: editForm.days.length ? editForm.days : ["Mon"],
      duration: Number(editForm.duration) || 60
    });

    closeEdit();
  };

  const applyFreeze = () => {
    if (!freezeActivityId) return;

    let freezeEndsAt = null;
    if (freezePreset === "1-week") {
      freezeEndsAt = addDays(new Date(), 7).toISOString();
    } else if (freezePreset === "2-weeks") {
      freezeEndsAt = addDays(new Date(), 14).toISOString();
    } else if (freezePreset === "1-month") {
      freezeEndsAt = addDays(new Date(), 30).toISOString();
    } else if (freezePreset === "custom" && customFreezeDate) {
      const dateValue = new Date(customFreezeDate);
      if (!Number.isNaN(dateValue.getTime())) {
        freezeEndsAt = dateValue.toISOString();
      }
    }

    if (!freezeEndsAt) return;

    freezeActivity(freezeActivityId, freezeEndsAt);
    closeFreeze();
  };

  const handleUnfreeze = (activityId) => {
    unfreezeActivity(activityId);
    setMenuOpenId(null);
  };

  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">ACTIVITIES</p><h1>Your recurring life</h1><p className="muted">Gym, sports, clubs, hobbies and learning are first-class schedule commitments.</p></div></section>
      <div className="panel add-activity"><Activity size={20} /><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add recurring activity, e.g. Gym" /><select value={category} onChange={e => setCategory(e.target.value)}><option value="fitness">Fitness</option><option value="sports">Sports</option><option value="learning">Learning</option><option value="extracurricular">Extracurricular</option></select><button className="btn primary" onClick={add}><Plus size={16} /> Add</button></div>
      <div className="activity-grid">
        {activities.map((a) => {
          const frozen = isActivityFrozen(a);
          return (
            <div className={`activity-card${frozen ? " frozen" : ""}`} key={a.id}>
              <div className="activity-icon"><Activity size={19} /></div>
              <div className="activity-card-main">
                <div className="activity-title-row">
                  <h3>{a.title}</h3>
                  {frozen && <span className="activity-status frozen">Frozen</span>}
                </div>
                <p className="muted">{a.category} · {a.duration} min</p>
                <div className="day-pills">{a.days.map((d) => <span key={d}>{d}</span>)}</div>
              </div>
              <div className="activity-menu-wrap">
                <button
                  type="button"
                  className="activity-menu-button"
                  aria-label={`Open options for ${a.title}`}
                  onClick={() => setMenuOpenId((currentId) => currentId === a.id ? null : a.id)}
                >
                  <MoreHorizontal size={16} />
                </button>
                {menuOpenId === a.id && (
                  <div className="activity-menu">
                    <button type="button" onClick={() => openEdit(a)}>Edit</button>
                    {frozen ? (
                      <button type="button" onClick={() => handleUnfreeze(a.id)}>Unfreeze</button>
                    ) : (
                      <button type="button" onClick={() => openFreeze(a)}>Freeze</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editingActivity && (
        <div className="modal-backdrop" onClick={closeEdit}>
          <div className="modal-card panel" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit activity</h2>
              <button type="button" className="icon-button modal-close" aria-label="Close edit modal" onClick={closeEdit}><X size={18} /></button>
            </div>

            <div className="form-grid modal-form-grid">
              <label>
                Title
                <input value={editForm.title} onChange={(event) => setEditForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Activity title" />
              </label>
              <label>
                Category
                <select value={editForm.category} onChange={(event) => setEditForm((prev) => ({ ...prev, category: event.target.value }))}>
                  <option value="fitness">Fitness</option>
                  <option value="sports">Sports</option>
                  <option value="learning">Learning</option>
                  <option value="extracurricular">Extracurricular</option>
                </select>
              </label>
              <label>
                Duration (minutes)
                <input type="number" min="15" step="15" value={editForm.duration} onChange={(event) => setEditForm((prev) => ({ ...prev, duration: event.target.value }))} />
              </label>
            </div>

            <div className="day-picker">
              {dayOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={editForm.days.includes(day) ? "day-option selected" : "day-option"}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={closeEdit}>Cancel</button>
              <button type="button" className="btn primary" onClick={saveEdit}>Save changes</button>
            </div>
          </div>
        </div>
      )}

      {freezeActivityId && (
        <div className="modal-backdrop" onClick={closeFreeze}>
          <div className="modal-card panel" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>Freeze activity</h2>
              <button type="button" className="icon-button modal-close" aria-label="Close freeze modal" onClick={closeFreeze}><X size={18} /></button>
            </div>

            <div className="freeze-options">
              {[
                { value: "1-week", label: "1 week" },
                { value: "2-weeks", label: "2 weeks" },
                { value: "1-month", label: "1 month" },
                { value: "custom", label: "Custom date" }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={freezePreset === option.value ? "freeze-option selected" : "freeze-option"}
                  onClick={() => setFreezePreset(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {freezePreset === "custom" && (
              <label className="freeze-custom-date">
                Freeze until
                <input type="date" value={customFreezeDate} onChange={(event) => setCustomFreezeDate(event.target.value)} />
              </label>
            )}

            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={closeFreeze}>Cancel</button>
              <button type="button" className="btn primary" onClick={applyFreeze}>Freeze</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}