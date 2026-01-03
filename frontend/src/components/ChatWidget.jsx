import { useState } from "react";
import api from "../api/axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Bot", text: "Hi! Ask me about leave or attendance 😊" },
  ]);
  const [text, setText] = useState("");

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const question = text.toLowerCase();
    addMessage("You", text);
    setText("");

    try {
      // 🟢 LEAVE STATUS
      if (question.includes("leave")) {
        const res = await api.get("/leave/my");
        if (res.data.length === 0) {
          addMessage("Bot", "You have not applied for any leave.");
        } else {
          const last = res.data[res.data.length - 1];
          addMessage("Bot", `Your latest leave status is: ${last.status}`);
        }
      }

      // 🟢 CHECK-IN
      else if (question.includes("check in")) {
        const res = await api.get("/attendance/today");
        if (!res.data || !res.data.checkIn) {
          addMessage("Bot", "You have not checked in today.");
        } else {
          addMessage(
            "Bot",
            `You checked in at ${new Date(
              res.data.checkIn
            ).toLocaleTimeString()}`
          );
        }
      }

      // 🟢 CHECK-OUT
      else if (question.includes("check out")) {
        const res = await api.get("/attendance/today");
        if (!res.data || !res.data.checkOut) {
          addMessage("Bot", "You have not checked out yet.");
        } else {
          addMessage(
            "Bot",
            `You checked out at ${new Date(
              res.data.checkOut
            ).toLocaleTimeString()}`
          );
        }
      }

      // 🔴 UNKNOWN QUESTION
      else {
        addMessage(
          "Bot",
          "I can help with:\n• Leave status\n• Check-in time\n• Check-out time"
        );
      }
    } catch {
      addMessage("Bot", "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* 💬 CHAT ICON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          💬
        </button>
      )}

      {/* 📦 CHAT BOX */}
      {open && (
        <div
          style={{
            width: 280,
            height: 360,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: 10,
              background: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <b>HR Assistant</b>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* CHAT MESSAGES */}
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              fontSize: 14,
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <b>{m.sender}:</b> {m.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", padding: 8, gap: 5 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask here..."
              style={{ flex: 1 }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
