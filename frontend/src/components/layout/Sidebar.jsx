import {
  BarChart3, CalendarDays, CheckSquare, Dumbbell, Goal,
  Home, ListTodo, Settings, Sparkles, UserRound, Users, X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  ["/dashboard", Home, "Dashboard"],
  ["/today", CalendarDays, "Today"],
  ["/schedule", ListTodo, "Schedule"],
  ["/tasks", CheckSquare, "Tasks"],
  ["/goals", Goal, "Goals"],
  ["/activities", Dumbbell, "Activities"],
  ["/ai", Sparkles, "AI Planner"],
  ["/analytics", BarChart3, "Analytics"]
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Sparkles size={20} /></div>
        <div><strong>LifeSync</strong><span>AI Scheduler</span></div>
        <button className="icon-button mobile-close" onClick={onClose}><X size={20} /></button>
      </div>

      <nav>
        <p className="nav-label">Workspace</p>
        {items.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Icon size={18} /> <span>{label}</span>
          </NavLink>
        ))}

        <p className="nav-label">Account</p>
        <NavLink to="/profile" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <UserRound size={18} /> <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Settings size={18} /> <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <Users size={17} />
        <div><strong>Life balance</strong><span>7 areas tracked</span></div>
      </div>
    </aside>
  );
}