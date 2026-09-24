"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!message.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAnswer(data.error || "Something went wrong.");
        return;
      }

      setAnswer(data.answer || "No answer was returned.");
    } catch {
      setAnswer("Unable to connect to Never End AI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="ne-page">
      <div className="ne-container">
        <header className="ne-header">
          <div className="ne-brand">
            ∞ NEVER END <span>AI</span>
          </div>
        </header>

        <section className="ne-hero">
          <div className="ne-badge">AI for learning, creating & research</div>

          <h1 className="ne-title">
            Your AI.
            <br />
            Your Ideas.
            <br />
            Never End.
          </h1>

          <p className="ne-subtitle">
            Never End AI is a general-purpose artificial intelligence
            platform designed to help you learn, create, research, solve
            problems, and turn ideas into action.
          </p>

          <p className="ne-founder">
            Founded by <strong>Koppula Charan Teja Reddy</strong>
          </p>

          <div className="ne-card">
            <textarea
              className="ne-textarea"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask Never End AI anything..."
            />

            <button
              className="ne-button"
              onClick={askAI}
              disabled={loading || !message.trim()}
            >
              {loading ? "Thinking..." : "Ask Never End AI"}
            </button>

            {answer && (
              <div className="ne-answer">
                {answer}
              </div>
            )}
          </div>
        </section>

        <footer className="ne-footer">
          <p>© {new Date().getFullYear()} Never End AI.</p>
          <p>
            Founded by Koppula Charan Teja Reddy.
          </p>
          <p>Your AI. Your Ideas. Never End.</p>
        </footer>
      </div>
    </main>
  );
}
