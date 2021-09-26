import React from "react";
const MessageCard = ({ message }) => {
  return (
    <div className = {`${message.bot ? "notification":"message"}`}>
      { !message.bot && <div className="initials">{message.user.username.slice(0, 2)}</div>}
      <div className = "content">
        <span className = "user">
          {message.bot ? <i className="fi fi-rr-exclamation"></i> :message.user.username} <span>{message.createdAt}</span>
        </span>
        <p>{message.body}</p>
      </div>
    </div>
  );
};

export default MessageCard;
