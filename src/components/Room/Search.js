import axios from "axios";
import React, { useState } from "react";
import Spinner from "./../../spinner.svg";
import { saveActiveChannel, updateUserChannels } from "../../redux/ducks/user";
import { connect } from "react-redux";

const Search = ({ saveActiveChannelToStore, updateChannels, userChannels }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllChannels = (value) => {
    setLoading(true);
    axios
      .get("/channel/search/" + value)
      .then((result) => {
        setResults(result.data);
      })
      .catch((error) => console.log())
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="search-container">
      <div className="search">
        {loading && <img src={Spinner} alt="spinner" className="spinner" />}
        {results && (
          <i
            className="fi fi-rr-cross-small cancel"
            onClick={() => setResults(null)}
          ></i>
        )}
        {results === null && <i className="fi fi-rr-search"></i>}

        <input
          name="search"
          id="id"
          autoComplete="off"
          placeholder="Search"
          onKeyPress={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              getAllChannels(e.target.value);
            }
          }}
        />
      </div>
      {results && (
        <div className="search-result">
          {results.length > 0 ? (
            <>
              {results.map((result) => {
                return (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => {
                      let alreadyMemberOfChannel = userChannels.filter(
                        (ch) => ch.id === result.id
                      );
                      if (alreadyMemberOfChannel.length <= 0) {
                        updateChannels(result);
                      }
                      saveActiveChannelToStore(result);
                      setResults(null);
                    }}
                  >
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="search-result-item">
              <h3>0 Result</h3>
              <p>No Channel Found!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userChannels: state.loggedInUser.channels,
});

const mapDispatchStateToProps = (dispatch) => ({
  saveActiveChannelToStore: (channel) => {
    dispatch(saveActiveChannel(channel));
  },
  updateChannels: (channel) => {
    dispatch(updateUserChannels(channel));
  },
});
export default connect(mapStateToProps, mapDispatchStateToProps)(Search);
