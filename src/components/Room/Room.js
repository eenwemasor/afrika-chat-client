import React, { useState } from "react";
import AddChannel from "../AddChannel";
import Chat from "./Chat";
import SideBar from "./SideBar";

const Room = () => {
  const [addChannel, openAddChannel] = useState(false);
  const [collapseSidebar, openCollapseSidebar] = useState(false);

  const toggleAddChannel = () => {
    openAddChannel(!addChannel);
  };
  const toggleCollapseSidebar = () => {
    openCollapseSidebar(!collapseSidebar);
  };
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard">
          <SideBar
            toggleAddChannel={toggleAddChannel}
            collapseSidebar={collapseSidebar}
          />
          <Chat
            toggleCollapseSidebar={toggleCollapseSidebar}
            collapseSidebar={collapseSidebar}
          />
        </div>
      </div>
      <AddChannel show={addChannel} toggleAddChannel={toggleAddChannel} />
    </>
  );
};

export default Room;
