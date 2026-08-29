import { UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">PROFILE</p><h1>Your profile</h1><p className="muted">Your preferences help LifeSync make better scheduling decisions.</p></div></section>
      <div className="panel profile-card"><div className="profile-avatar"><UserRound size={32} /></div><div><h2>{user?.name}</h2><p className="muted">{user?.email}</p><span className="category-pill">Student</span></div></div>
      <div className="panel"><h2>Scheduling preferences</h2><div className="form-grid"><label>Preferred wake time<input type="time" defaultValue="06:30" /></label><label>Preferred sleep time<input type="time" defaultValue="22:30" /></label><label>Deep-work duration<select defaultValue="60"><option value="45">45 minutes</option><option value="60">60 minutes</option><option value="90">90 minutes</option></select></label></div></div>
    </>
  );
}