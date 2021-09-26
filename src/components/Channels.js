import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  saveActiveChannel,
  saveChannels,
  updateUserChannels,
} from "../redux/ducks/user";
import AddChannel from "./AddChannel";
const Channels = ({
  channels,
  saveChannelsToStore,
  saveActiveChannel,
  updateChannels,
  userChannels,
  history,
}) => {
  const [addChannel, openAddChannel] = useState(false);
  useEffect(() => {
    getAllChannels();
  }, []);

  const toggleAddChannel = () => {
    openAddChannel(!addChannel);
  };

  const getAllChannels = () => {
    axios.get("/channel/getChannels").then((result) => {
      saveChannelsToStore(result.data);
    });
  };

  const goToRoom = (channel) => {
    saveActiveChannel(channel);

    history.push("/room");
  };
  return (
    <div className="channels-container">
      <h1>Join a channel</h1>
      <div className="channels">
        {channels.map((channel) => {
          return (
            <div
              className="channel-item"
              key={channel.id}
              onClick={() => {
                let alreadyMemberOfChannel = userChannels.filter(
                  (ch) => ch.id === channel.id
                );
                if (alreadyMemberOfChannel.length <= 0) {
                  updateChannels(channel);
                }
                goToRoom(channel);
              }}
            >
              <div className="initials">{channel.name.slice(0, 2)}</div>
              <span>{channel.name}</span>
              <small>{channel.members.length} Members</small>
            </div>
          );
        })}
        <div className="channel-item add" onClick={toggleAddChannel}>
          <i className="fi fi-rr-plus"></i>
        </div>
        <AddChannel
          show={addChannel}
          toggleAddChannel={toggleAddChannel}
          redirect={goToRoom}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels,
  userChannels: state.loggedInUser.channels,
});

const mapDispatchToProps = (dispatch) => ({
  saveChannelsToStore: (channels) => {
    dispatch(saveChannels(channels));
  },
  saveActiveChannel: (channel) => {
    dispatch(saveActiveChannel(channel));
  },
  updateChannels: (channel) => {
    dispatch(updateUserChannels(channel));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
