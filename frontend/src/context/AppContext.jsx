import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../constants/app";
import { readStorage, writeStorage } from "../utils/storage";

const AppContext = createContext(null);

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const validTaskCategories = new Set(["academic", "sports", "daily_routine"]);

const normalizeTask = (task) => {
  if (!task || typeof task.title !== "string") return null;

  const category = validTaskCategories.has(task.category) ? task.category : "academic";

  return {
    ...task,
    category,
    targetTime: task.targetTime || "",
    delayMinutes: Number(task.delayMinutes) || 0,
    status: task.status === "completed" ? "completed" : "pending"
  };
};

const defaultTasks = [
  { id: "t1", title: "Finish DBMS assignment", category: "academic", priority: "critical", deadline: "2026-08-31", duration: 90, importance: 5, status: "pending", targetTime: "09:00", delayMinutes: 20 },
  { id: "t2", title: "Football practice", category: "sports", priority: "high", deadline: "2026-08-31", duration: 60, importance: 4, status: "pending", targetTime: "18:30", delayMinutes: 15 },
  { id: "t3", title: "Morning routine", category: "daily_routine", priority: "medium", deadline: "2026-09-01", duration: 45, importance: 3, status: "completed", targetTime: "07:00", delayMinutes: 10 }
];

const defaultGoals = [
  {
    id: "g1",
    title: "Improve CGPA",
    category: "academic",
    goalType: "monthly-plan",
    progress: 72,
    target: "Maintain above 8.5 in end-semester results",
    status: "on-track",
    milestones: ["Revise 2 subjects each week", "Submit all assignments on time", "Practice 3 mock tests this month"]
  },
  {
    id: "g2",
    title: "Build fitness consistency",
    category: "fitness",
    goalType: "weekly-plan",
    progress: 68,
    target: "Complete 4 workouts and 2 recovery days this week",
    status: "on-track",
    milestones: ["Gym 4 times this week", "Track sleep and hydration", "Stretch after each workout"]
  },
  {
    id: "g3",
    title: "Career readiness",
    category: "career",
    goalType: "short-term",
    progress: 54,
    target: "Refine portfolio and complete internship outreach",
    status: "at-risk",
    milestones: ["Update resume and LinkedIn", "Build 2 portfolio projects", "Apply to 5 roles this month"]
  },
  {
    id: "g4",
    title: "Leadership growth",
    category: "personal",
    goalType: "long-term",
    progress: 46,
    target: "Develop a leadership identity through mentoring and communication",
    status: "not-started",
    milestones: ["Lead one student initiative", "Take one leadership course", "Mentor 2 juniors by the end of the semester"]
  },
  {
    id: "g5",
    title: "Research sprint",
    category: "learning",
    goalType: "15-days-plan",
    progress: 81,
    target: "Complete the research summary and proposal outline in 15 days",
    status: "on-track",
    milestones: ["Read 3 relevant papers", "Draft problem statement", "Finalize proposal structure"]
  }
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
  const [tasks, setTasks] = useState(() => {
    const storedTasks = readStorage(STORAGE_KEYS.tasks, defaultTasks);
    return Array.isArray(storedTasks) ? storedTasks.map(normalizeTask).filter(Boolean) : defaultTasks;
  });
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
    const nextTask = normalizeTask({
      id: createId(),
      status: "pending",
      ...task
    });

    if (!nextTask) return;

    setTasks((prev) => [...prev, nextTask]);
  };

  const updateTask = (id, changes) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id !== id) return task;
      const updatedTask = normalizeTask({ ...task, ...changes });
      return updatedTask ?? task;
    }));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, { id: createId(), goalType: "short-term", status: "not-started", milestones: [], ...goal }]);
  };

  const updateGoal = (id, changes) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, ...changes } : goal)));
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
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
      deleteGoal,
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
