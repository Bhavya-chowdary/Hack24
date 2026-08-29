import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../constants/app";
import { readStorage, writeStorage } from "../utils/storage";

const AppContext = createContext(null);

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const defaultTasks = [
  { id: "t1", title: "Finish DBMS assignment", category: "academic", priority: "critical", deadline: "2026-08-31", duration: 90, importance: 5, status: "pending" },
  { id: "t2", title: "Gym session", category: "fitness", priority: "high", deadline: "2026-08-31", duration: 60, importance: 4, status: "pending" },
  { id: "t3", title: "Prepare resume", category: "career", priority: "medium", deadline: "2026-09-02", duration: 45, importance: 3, status: "pending" }
];

const defaultGoals = [
  { id: "g1", title: "Improve CGPA", category: "academic", progress: 72, target: "Maintain above 8.5" },
  { id: "g2", title: "Build fitness consistency", category: "fitness", progress: 68, target: "Train 4 times a week" },
  { id: "g3", title: "Career readiness", category: "career", progress: 54, target: "Complete portfolio updates" }
];

const defaultActivities = [
  { id: "a1", title: "Gym", category: "fitness", days: ["Mon", "Wed", "Fri"], duration: 60 },
  { id: "a2", title: "Football practice", category: "sports", days: ["Tue", "Thu"], duration: 90 },
  { id: "a3", title: "Reading", category: "learning", days: ["Daily"], duration: 30 }
];

const defaultSchedule = [
  { id: "s1", title: "DBMS assignment", category: "academic", time: "09:00", duration: 90, status: "planned" },
  { id: "s2", title: "Gym workout", category: "fitness", time: "18:00", duration: 60, status: "planned" },
  { id: "s3", title: "Career networking", category: "career", time: "20:00", duration: 45, status: "planned" },
  { id: "s4", title: "Study revision", category: "academic", time: "21:00", duration: 60, status: "planned" }
];

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState(() => readStorage(STORAGE_KEYS.tasks, defaultTasks));
  const [goals, setGoals] = useState(() => readStorage(STORAGE_KEYS.goals, defaultGoals));
  const [activities, setActivities] = useState(() => readStorage(STORAGE_KEYS.activities, defaultActivities));
  const [schedule, setSchedule] = useState(() => readStorage(STORAGE_KEYS.schedule, defaultSchedule));

  useEffect(() => {
    writeStorage(STORAGE_KEYS.tasks, tasks);
  }, [tasks]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.goals, goals);
  }, [goals]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.activities, activities);
  }, [activities]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.schedule, schedule);
  }, [schedule]);

  const addTask = (task) => {
    const nextTask = {
      id: createId(),
      status: "pending",
      ...task
    };
    setTasks((prev) => [...prev, nextTask]);
  };

  const updateTask = (id, changes) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...changes } : task)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, { id: createId(), ...goal }]);
  };

  const updateGoal = (id, changes) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, ...changes } : goal)));
  };

  const addActivity = (activity) => {
    setActivities((prev) => [...prev, { id: createId(), duration: 60, ...activity }]);
  };

  const updateScheduleItem = (id, changes) => {
    setSchedule((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  };

  const replan = () => {
    setSchedule((prev) => prev.map((item, index) => ({
      ...item,
      status: index % 2 === 0 ? "done" : "planned"
    })));
  };

  const value = useMemo(
    () => ({
      tasks,
      goals,
      activities,
      schedule,
      addTask,
      updateTask,
      deleteTask,
      addGoal,
      updateGoal,
      addActivity,
      updateScheduleItem,
      replan
    }),
    [tasks, goals, activities, schedule]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}
