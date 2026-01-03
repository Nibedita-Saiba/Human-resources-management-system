import { useState } from "react";
import api from "../api/axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I can help with leave & attendance." },
  ]);
  const [text, setText] = useState("");

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const question = text.toLowerCase();
    addMessage("user", text);
    setText("");

    try {
      if (question.includes("leave")) {
        const res = await api.get("/leave/my");
        if (res.data.length === 0) {
          addMessage("bot", "You have not applied for any leave.");
        } else {
          const last = res.data[res.data.length - 1];
          addMessage("bot", `Your latest leave status is ${last.status}.`);
        }
      } else if (question.includes("check in")) {
        const res = await api.get("/attendance/today");
        if (!res.data?.checkIn) {
          addMessage("bot", "You have not checked in today.");
        } else {
          addMessage(
            "bot",
            `You checked in at ${new Date(res.data.checkIn).toLocaleTimeString()}`
          );
        }
      } else if (question.includes("check out")) {
        const res = await api.get("/attendance/today");
        if (!res.data?.checkOut) {
          addMessage("bot", "You have not checked out yet.");
        } else {
          addMessage(
            "bot",
            `You checked out at ${new Date(res.data.checkOut).toLocaleTimeString()}`
          );
        }
      } else {
        addMessage(
          "bot",
          "I can help with:\n• Leave status\n• Check-in time\n• Check-out time"
        );
      }
    } catch {
      addMessage("bot", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .chat-launcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #4f46e5;
          color: white;
          font-size: 24px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }

        .chat-box {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 320px;
          height: 420px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          background: #4f46e5;
          color: white;
          padding: 14px 16px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-body {
          flex: 1;
          padding: 14px;
          overflow-y: auto;
          background: #f5f6fa;
        }

        .msg {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 14px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 1.4;
          white-space: pre-line;
        }

        .bot {
          background: white;
          align-self: flex-start;
          border-top-left-radius: 4px;
        }

        .user {
          background: #4f46e5;
          color: white;
          align-self: flex-end;
          border-top-right-radius: 4px;
        }

        .chat-footer {
          display: flex;
          gap: 8px;
          padding: 10px;
          border-top: 1px solid #e5e7eb;
        }

        .chat-footer input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
        }

        .chat-footer button {
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          font-weight: 600;
          cursor: pointer;
        }
          .msg {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 14px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-line;
}

.msg.bot {
  background: #ffffff;
  color: #111827;
  align-self: flex-start;
  border-top-left-radius: 4px;
}

.msg.user {
  background: #4f46e5;
  color: #ffffff;
  align-self: flex-end;
  border-top-right-radius: 4px;
}

      `}</style>

      {!open && (
        <button className="chat-launcher" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            Dayflow  Assistant
            <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg ${m.sender === "user" ? "user" : "bot"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask about leave or attendance..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
