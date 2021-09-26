export const SAVE_LOGGED_USER = "SAVE_LOGGED_USER";
export const SAVE_CHANNELS = "SAVE_CHANNELS";
export const UPDATE_USER_CHANNEL = "UPDATE_USER_CHANNEL";
export const SAVE_ACTIVE_CHANNEL = "SAVE_ACTIVE_CHANNEL";
export const LOGOUT_USER = "LOGOUT_USER";

const defaults = {
  loggedInUser: {},
  activeChannel: {},
  channels: []
};

export const saveLoggedInUser = (user) => {
  return {
    type: SAVE_LOGGED_USER,
    payload: user,
  };
};


export const saveChannels = (channels) => {
  return {
    type: SAVE_CHANNELS,
    payload: channels,
  };
};

export const updateUserChannels = (channel) => {
  return {
    type: UPDATE_USER_CHANNEL,
    payload: channel,
  };
};
export const saveActiveChannel = (channel) => {
  return {
    type: SAVE_ACTIVE_CHANNEL,
    payload: channel,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: null,
  };
};

const userReducer = (state = defaults, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case UPDATE_USER_CHANNEL:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          channels: [...state.loggedInUser.channels, action.payload],
        },
      };
      case SAVE_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };

    case SAVE_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannel: action.payload,
      };
    case LOGOUT_USER:
      return {
        loggedInUser: {},
      };
    default:
      return state;
  }
};

export const shouldUpgrade = (user) => {
  return (
    user.account_level === null || user.account_level?.cost_to_upgrade === 0
  );
};

export const shouldVerifyNumber = (user) => {
  return user.phone_verified === false;
};

export default userReducer;
