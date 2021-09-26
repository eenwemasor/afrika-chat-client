import "./style/app.scss";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Room from "./components/Room/Room";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import axios from "axios";
import React from "react";
import Channels from "./components/Channels";

const hist = createBrowserHistory();

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use(function (config) {
  const AUTH_TOKEN = localStorage.getItem("auth_token");
  config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;

  return config;
});

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <BrowserRouter>
          <Route path="/" component={SignUp} exact />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/channels" component={Channels} />
          <Route
            path="/room"
            render={(props) => (
              <ProtectedRoute>
                <Room {...props} />
              </ProtectedRoute>
            )}
          />
        </BrowserRouter>
      </Router>
    </div>
  );
}

export default App;
