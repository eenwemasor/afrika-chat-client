import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUserChannels } from "../redux/ducks/user";
const AddChannel = ({ show, updateChannels, toggleAddChannel, redirect }) => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      .post("channel/createChannel", inputs)
      .then((res) => {
        setSuccess(`${inputs.name} channel created successfully, redirecting`);
        setTimeout(() => {
          updateChannels(res.data)
          setInputs({});
          setError("");
          setSuccess("");

          if(redirect){
            redirect(res.data)
          }
          toggleAddChannel();
        }, 500);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className={` modal ${show ? "show-modal" : ""}`}
      onClick={toggleAddChannel}
    >
      <div className="container">
        <div className="form" onClick={(e) => e.stopPropagation()}>
          <h2>New Channel</h2>
          {error && <span className="error">{error}</span>}
          {success && <span className="success">{success}</span>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createAccount();
            }}
          >
            <input
              type="text"
              name="name"
              id="name"
              value={inputs.name ?? ""}
              onChange={handleInput}
              placeholder="Name"
            />
            <textarea
              rows="5"
              type="description"
              name="description"
              id="description"
              value={inputs.description ?? ""}
              placeholder="Description"
              onChange={handleInput}
            />

            <button> {loading ? "Saving" : "Save"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapDispatchStateToProps = (dispatch) => ({
  updateChannels: (channel) => {
    dispatch(updateUserChannels(channel));
  },
});
export default connect(null, mapDispatchStateToProps)(AddChannel);
