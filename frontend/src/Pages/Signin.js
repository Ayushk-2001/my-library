import React, { useContext, useState } from "react";
import "./Signin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import Switch from "@material-ui/core/Switch";
import { Dropdown } from "semantic-ui-react";

function Signin() {
  const [isStudent, setIsStudent] = useState(true);
  const [userType, setUserType] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const loginCall = async (userData, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(API_URL + "api/auth/signin", userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError("Wrong Password Or Username");
    }
  };

  const userTypes = [
    { value: "Admin", text: "Admin" },
    { value: "User", text: "User" },
    { value: "Vendor", text: "Vendor" },
  ];

  const handleForm = (e) => {
    e.preventDefault();
    loginCall({ email, password, userType }, dispatch)
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title">Log in</h2>
          <p className="line"></p>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <div className="semanticdropdown">
              <Dropdown
                placeholder="User Type"
                fluid
                selection
                options={userTypes}
                onChange={(event, data) => setUserType(data.value)}
              />
            </div>
            <label htmlFor="email">Email</label>
            <input
              className="signin-textbox"
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="signin-button">Log In</button>
          <a className="forget-pass" href="#home">
            Forgot password?
          </a>
        </form>
        <div className="signup-option">
          <p className="signup-question">
            Don't have an account? Contact Librarian
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
