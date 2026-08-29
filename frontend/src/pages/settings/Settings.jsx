import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { logout } = useAuth();
  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">SETTINGS</p><h1>LifeSync settings</h1><p className="muted">Control how your adaptive planner behaves.</p></div></section>
      <div className="panel settings-list">
        <div className="setting-row"><div><strong>Adaptive replanning</strong><span>Recalculate remaining tasks when the day changes.</span></div><input type="checkbox" defaultChecked /></div>
        <div className="setting-row"><div><strong>Protect recurring activities</strong><span>Keep gym, sports and other fixed commitments in the plan.</span></div><input type="checkbox" defaultChecked /></div>
        <div className="setting-row"><div><strong>AI explanations</strong><span>Explain why LifeSync prioritized and moved work.</span></div><input type="checkbox" defaultChecked /></div>
        <button className="btn danger-btn" onClick={logout}><LogOut size={17} /> Sign out</button>
      </div>
    </>
  );
}