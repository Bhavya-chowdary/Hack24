import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import Activities from "../pages/activities/Activities";
import AIPlanner from "../pages/ai/AIPlanner";
import Analytics from "../pages/analytics/Analytics";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Goals from "../pages/goals/Goals";
import Profile from "../pages/profile/Profile";
import Schedule from "../pages/schedule/Schedule";
import Settings from "../pages/settings/Settings";
import Tasks from "../pages/tasks/Tasks";
import Today from "../pages/today/Today";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/today" element={<Today />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/ai" element={<AIPlanner />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
