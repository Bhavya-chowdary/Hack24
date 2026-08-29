export const TASK_CATEGORIES = [
  { id: "academic", label: "Academics", icon: "BookOpen" },
  { id: "sports", label: "Sports", icon: "Trophy" },
  { id: "daily_routine", label: "Daily Routine", icon: "Clock3" }
];

export const CATEGORIES = [
  ...TASK_CATEGORIES,
  { id: "career", label: "Career", icon: "BriefcaseBusiness" },
  { id: "fitness", label: "Fitness", icon: "Dumbbell" },
  { id: "learning", label: "Learning", icon: "GraduationCap" },
  { id: "personal", label: "Personal", icon: "User" },
  { id: "extracurricular", label: "Extracurricular", icon: "Users" }
];

export const PRIORITIES = ["low", "medium", "high", "critical"];

export const STORAGE_KEYS = {
  tasks: "lifesync_tasks",
  goals: "lifesync_goals",
  activities: "lifesync_activities",
  schedule: "lifesync_schedule",
  profile: "lifesync_profile",
  settings: "lifesync_settings",
  token: "lifesync_token"
};