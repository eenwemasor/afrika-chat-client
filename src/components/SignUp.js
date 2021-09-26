import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveLoggedInUser } from "../redux/ducks/user";
const SignUp = ({ saveUser, history }) => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
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
      .post("user/signUp", inputs)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("auth_token", token);
        saveUser(res.data);
        window.location.href = "/channels"
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
        <h2>Create Account</h2>
        {error && <span className="error">{error}</span>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
          }}
          autoComplete = "off"
        >
          <input
            type="text"
            name="username"
            id="username"
            value={inputs.username}
            onChange={handleInput}
            autoComplete = "off"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            placeholder="Email"
            autoComplete = "off"
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            placeholder="Password"
            autoComplete = "off"
            onChange={handleInput}
          />

          <button> {loading ? "Creating" : "Create"} Account</button>
        </form>
        <div className="re">
          Already have an account? <Link to="/sign-in">sign in here</Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => {
    dispatch(saveLoggedInUser(user));
  },
});

export default connect(null, mapDispatchToProps)(SignUp);
