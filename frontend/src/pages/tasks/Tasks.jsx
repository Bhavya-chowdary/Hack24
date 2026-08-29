import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";
import { useApp } from "../../context/AppContext";
import { TASK_CATEGORIES } from "../../constants/app";

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useApp();
  const [search, setSearch] = useState("");
  const [openFormCategory, setOpenFormCategory] = useState("academic");

  const normalizedSearch = search.trim().toLowerCase();

  const unfinishedTasks = useMemo(
    () => tasks.filter((task) => task.status !== "completed" && (!normalizedSearch || task.title.toLowerCase().includes(normalizedSearch))),
    [tasks, normalizedSearch]
  );

  const groupedTasks = useMemo(
    () => TASK_CATEGORIES.map((category) => ({
      ...category,
      tasks: tasks.filter((task) => task.category === category.id && (!normalizedSearch || task.title.toLowerCase().includes(normalizedSearch)))
    })),
    [tasks, normalizedSearch]
  );

  return (
    <>
      <section className="page-heading">
        <div><p className="eyebrow">TASKS</p><h1>Organize your day by life area</h1><p className="muted">Keep academics, sports, and daily routines separate and focused.</p></div>
        <button className="btn primary" onClick={() => setOpenFormCategory("academic")}><Plus size={17} /> Add task</button>
      </section>

      <div className="toolbar">
        <div className="search-box"><Search size={17} /><input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      </div>

      <div className="task-sections">
        <div className="task-panel">
          <div className="task-panel-header">
            <h2>Unfinished tasks</h2>
            <span className="count-pill">{unfinishedTasks.length}</span>
          </div>

          {unfinishedTasks.length > 0 ? (
            <div className="task-list">
              {unfinishedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={(id) => updateTask(id, { status: task.status === "completed" ? "pending" : "completed" })}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">You are all caught up. No unfinished tasks right now.</p>
          )}
        </div>

        {groupedTasks.map((category) => (
          <div key={category.id} className="task-group">
            <div className="task-group-header">
              <h2>{category.label}</h2>
              <button type="button" className="btn secondary" onClick={() => setOpenFormCategory(openFormCategory === category.id ? "" : category.id)}>
                {openFormCategory === category.id ? "Close" : "Add task"}
              </button>
            </div>

            {openFormCategory === category.id && (
              <TaskForm
                defaultCategory={category.id}
                onSubmit={(task) => {
                  addTask(task);
                  setOpenFormCategory("");
                }}
                onCancel={() => setOpenFormCategory("")}
              />
            )}

            {category.tasks.length > 0 ? (
              <div className="task-list">
                {category.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={(id) => updateTask(id, { status: task.status === "completed" ? "pending" : "completed" })}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">No tasks in {category.label.toLowerCase()} yet.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}