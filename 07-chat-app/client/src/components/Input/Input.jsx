import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div>
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={(e) =>
                e.key === "Enter" ? sendMessage(e) : null
                }
            />
            <button type="button" className="send-btn" onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    </div>
  );
};

export default Input;
