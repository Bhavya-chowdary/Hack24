import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const submit = (e) => {
    e.preventDefault();
    login(email || "student@example.com", name || "Student");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo"><Sparkles size={24} /></div>
        <p className="eyebrow">LIFESYNC AI</p>
        <h1>Your day, intelligently planned.</h1>
        <p className="auth-subtitle">Manage academics, fitness, sports, career growth and personal goals in one adaptive schedule.</p>
        <form onSubmit={submit}>
          <label>Name<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></label>
          <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
          <button className="btn primary full-width">Enter LifeSync <ArrowRight size={17} /></button>
        </form>
        <small>Demo mode: authentication will connect to FastAPI in the backend phase.</small>
      </div>
    </div>
  );
}