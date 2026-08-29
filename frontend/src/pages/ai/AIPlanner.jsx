import { Bot, Brain, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AIPlanner() {
  const { tasks, replan } = useApp();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I understand your tasks, goals, recurring activities and schedule. Tell me what changed and I’ll help you rebalance the day." }
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(m => [...m, { role: "user", text: userText }, { role: "ai", text: `I’ve noted: “${userText}”. In the production version, this request will be sent to the FastAPI AI service, which will consider ${tasks.length} current tasks and your constraints before generating a new plan.` }]);
    setInput("");
  };

  return (
    <>
      <section className="page-heading"><div><p className="eyebrow">AI PLANNER</p><h1>Talk to your schedule</h1><p className="muted">Explain changes naturally instead of manually rebuilding your day.</p></div><button className="btn primary" onClick={replan}><Brain size={17} /> Generate plan</button></section>
      <div className="ai-layout">
        <section className="panel chat-panel">
          <div className="chat-header"><div className="ai-icon"><Bot size={19} /></div><div><strong>LifeSync Copilot</strong><span>Schedule intelligence</span></div><span className="online-dot" /></div>
          <div className="chat-messages">{messages.map((m, i) => <div className={`chat-message ${m.role}`} key={i}><div className="message-avatar">{m.role === "ai" ? <Sparkles size={15} /> : "S"}</div><p>{m.text}</p></div>)}</div>
          <div className="chat-input"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="e.g. I have a test tomorrow, move my gym session..." /><button className="btn primary icon-only" onClick={send}><Send size={17} /></button></div>
        </section>
        <aside className="panel ai-side"><h2>What AI will optimize</h2><ul><li>Deadline urgency</li><li>Task priority</li><li>Available time</li><li>Energy and workload</li><li>Recurring commitments</li><li>Academic, career and fitness balance</li><li>Changes made during the day</li></ul></aside>
      </div>
    </>
  );
}