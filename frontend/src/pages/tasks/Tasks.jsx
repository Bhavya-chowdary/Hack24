import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";
import { useApp } from "../../context/AppContext";

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => tasks.filter(t =>
    (filter === "all" || t.category === filter || t.status === filter) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  ), [tasks, filter, search]);

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">TASKS</p><h1>Everything you need to do</h1><p className="muted">Capture work once. Let priority drive the schedule.</p></div>
        <button className="btn primary" onClick={() => setShowForm(!showForm)}><Plus size={17} /> Add task</button>
      </section>
      {showForm && <TaskForm onSubmit={(task) => { addTask(task); setShowForm(false); }} onCancel={() => setShowForm(false)} />}
      <div className="toolbar">
        <div className="search-box"><Search size={17} /><input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All tasks</option><option value="pending">Pending</option><option value="completed">Completed</option>
          <option value="academic">Academics</option><option value="career">Career</option><option value="fitness">Fitness</option><option value="sports">Sports</option>
        </select>
      </div>
      <div className="task-list">
        {filtered.map(task => <TaskCard key={task.id} task={task} onComplete={id => updateTask(id, { status: task.status === "completed" ? "pending" : "completed" })} onDelete={deleteTask} />)}
      </div>
    </>
  );
}