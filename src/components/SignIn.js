import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveActiveChannel, saveLoggedInUser } from "../redux/ducks/user";

const SignUp = ({ saveUser, saveActiveChannel, history }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const createAccount = () => {
    setLoading(true);
    axios
      .post("user/signIn", inputs)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("auth_token", token);
        saveUser(res.data);
        if (res.data.channels.length > 0) {
          saveActiveChannel(res.data.channels[0]);
          history.push("/room");
        } else {
          window.location.href = "/channels";
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="form">
        <h2>Sign in</h2>
        {error && <span className="error">{error}</span>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
          }}
        >
          <input
            type="text"
            name="username"
            autoComplete="off"
            id="username"
            value={inputs.username}
            onChange={handleInput}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            autoComplete="off"
            id="password"
            value={inputs.password}
            placeholder="Password"
            onChange={handleInput}
          />

          <button> {loading ? "Signing" : "Sign"} In</button>
        </form>
        <div className="re">
          Don't have an account? <Link to="/">sign up here</Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => {
    dispatch(saveLoggedInUser(user));
  },
  saveActiveChannel: (channel) => {
    dispatch(saveActiveChannel(channel));
  },
});

export default connect(null, mapDispatchToProps)(SignUp);
