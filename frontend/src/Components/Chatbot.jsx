import React, { useState } from "react";
import { askBlogAssistant } from "../services/ChatApi";

export default function ChatbotWidget({ postId, mode = "floating" }) {
  const [open, setOpen] = useState(mode === "inline");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async (payload, label) => {
    if (label) setMessages((p) => [...p, { role: "user", text: label }]);
    setLoading(true);
    try {
      const res = await askBlogAssistant({ postId, ...payload });
      setMessages((p) => [
        ...p,
        { role: "assistant", text: res.data.answer, suggestion: res.data.suggested_blog },
      ]);
    } catch (err) {
      setMessages((p) => [...p, { role: "assistant", text: err.response?.data?.message || err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const send = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    ask({ question, mode: "qa" }, question);
    setQuestion("");
  };

  const box = (
    <div className="chatbot-box">
      <div className="chatbot-actions">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => ask({ mode: "summary" }, "Summarize this blog")}>Summary</button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => ask({ mode: "keypoints" }, "Key points")}>Key Points</button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => ask({ mode: "apply" }, "How to apply")}>Apply</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className="chatbot-message">
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
            {m.suggestion && (
              <div style={{ marginTop: 4, fontSize: 13 }}>
                📖 Related read: <a href={`/post/${m.suggestion.id}`}>{m.suggestion.title}</a>
              </div>
            )}
          </div>
        ))}
        {loading && <div>Thinking...</div>}
      </div>

      <form onSubmit={send}>
        <input className="form-control mb-2" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about this blog..." />
        <button className="btn btn-primary w-100" disabled={loading}>Send</button>
      </form>
    </div>
  );

  if (mode === "inline") return box;

  return (
    <div className="chatbot-floating">
      <button onClick={() => setOpen(!open)} className="btn btn-dark">{open ? "Close AI" : "Ask AI"}</button>
      {open && <div className="chatbot-popup">{box}</div>}
    </div>
  );
}