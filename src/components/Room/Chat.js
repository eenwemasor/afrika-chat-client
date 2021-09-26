import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import MessageCard from "./MessageCard";
import { io } from "socket.io-client";

const Chat = ({ channel, user, collapseSidebar, toggleCollapseSidebar}) => {
  const [inputs, setInputs] = useState({});
  const [messages, setMessages] = useState([]);
  const chatContainer = useRef();

  const socket = io(process.env.REACT_APP_BASE_URL, {
    extraHeaders: {
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  });

  useEffect(() => {
    setInputs("");
    setMessages([]);
    socket.on("connect", () => {
      socket.emit("channel::join", channel);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [channel]);

  socket.on("chat::message", (payload) => {
    setMessages((state) => [...state, payload]);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("chat::bot", (payload) => {
    setInputs("");
    setMessages([]);
    setMessages((state) => [
      ...state,
      ...payload.previousChannelMessages,
      payload.message,
    ]);
  });

  const sendMessage = () => {
    socket.emit("chat::message", {
      channelId: channel.id,
      userId: user.id,
      body: inputs.body,
    });
    setInputs((state) => ({ ...state, body: "" }));
  };

  useEffect(() => {
    scrollToMyRef();
  }, [messages]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
  };

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="top">
          {collapseSidebar ? (
            <i class="fi fi-rr-menu-burger" onClick={toggleCollapseSidebar}></i>

          ) : (
            <i class="fi fi-rr-cross" onClick={toggleCollapseSidebar}></i>

          )}
          <div className="title">
            <h3>{channel?.name}</h3>
          </div>
        </div>
        <div className="messages" ref={chatContainer}>
          <div>
            {messages.map((message, index) => (
              <MessageCard message={message} key={index} />
            ))}
          </div>
        </div>
        <div className="input-container">
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
              if (inputs.body) {
                sendMessage();
              }
            }}
          >
            <input
              name="body"
              id="body"
              placeholder="Type a message here"
              onChange={handleInput}
              value={inputs.body ?? ""}
            />
            <button autoFocus={true}>
              <i className="fi fi-ss-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  channel: state.activeChannel,
  user: state.loggedInUser,
});

export default connect(mapStateToProps)(Chat);
