import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <header className="topbar">
        <button className="icon-button mobile-menu" onClick={() => setOpen(true)}><Menu size={22} /></button>
        <div className="topbar-search">
          <Search size={17} />
          <input placeholder="Search tasks, goals, activities..." />
        </div>
        <div className="topbar-actions">
          <button className="icon-button notification"><Bell size={19} /><span /></button>
          <div className="avatar">{(user?.name || "S").charAt(0).toUpperCase()}</div>
        </div>
      </header>
      {open && <div className="mobile-sidebar"><Sidebar mobileOpen onClose={() => setOpen(false)} /></div>}
    </>
  );
}