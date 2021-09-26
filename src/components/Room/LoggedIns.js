import React, { useState } from "react";
import { connect } from "react-redux";
const LoggedIn = ({ user, history }) => {
  const [Open, setOpen] = useState(false);


  const signOut = ()=>{
    localStorage.removeItem("auth_token");
    window.location.href = "/sign-in"
  }
  return (
    <div className="sign-in-container" onClick = {()=>setOpen(!Open)}>
      <div className="sign-in">
        <div className = "user">
          <div className = "initials">{user?.username?.slice(0, 2)}</div>
            <span>{user?.username}</span>
        </div>
        <div className="drop-down" >
          <i className="fi fi-rr-angle-small-down"></i>
        </div>
      </div>
      <div className = {`menu-option ${Open ? "open-menu-option":""}`}>
        <div className="item"><i className="fi fi-rr-portrait"></i><span>Profile</span></div>
        <div className="item"><i className="fi fi-rr-infinity"></i><span>Tweeter</span></div>
        <hr />
        <div className="item" onClick = {signOut}><i className="fi fi-rr-sign-out-alt"></i><span>Sign out</span></div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.loggedInUser,
});
export default connect(mapStateToProps)(LoggedIn);
