import React, { useState } from "react";
import { connect } from "react-redux";
import { saveActiveChannel } from "../../redux/ducks/user";
import LoggedIn from "./LoggedIns";
import Search from "./Search";

const SideBar = ({
  channels,
  toggleAddChannel,
  saveActiveChannel,
  activeChannel,
  collapseSidebar
}) => {
  return (
    <div className={`sidebar-container ${collapseSidebar ? "close-sidebar":"open-sidebar"}`}>
      <div className="sidebar-icon">
       
      </div>
      <div className="top">
        <div className="nav-bar">
          <h2>Channels</h2>
          <div className="add" onClick={toggleAddChannel}>
            +
          </div>
        </div>
        <Search />
      </div>
      <div className="middle">
        {channels.map((channel) => {
          return (
            <div key={channel.id}>
              <div
                className={`channel-item ${
                  channel?.id === activeChannel?.id ? "active" : ""
                }`}
                key={channel?.id}
                onClick={() => saveActiveChannel(channel)}
              >
                <div className="initials">{channel?.name?.slice(0, 2)}</div>
                <span>{channel?.name}</span>
              </div>
              <div className="members">
                <h3>Members</h3>
                {channel.members.map((member) => {
                  return (
                    <div key={member.id} className="member-item">
                      <div className="initials">
                        {member?.username?.slice(0, 2)}
                      </div>
                      <span>{member?.username}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <LoggedIn />
    </div>
  );
};
const mapStateToProps = (state) => ({
  channels: state.loggedInUser.channels,
  activeChannel: state.activeChannel,
});

const mapDispatchStateToProps = (dispatch) => ({
  saveActiveChannel: (channel) => {
    dispatch(saveActiveChannel(channel));
  },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(SideBar);
