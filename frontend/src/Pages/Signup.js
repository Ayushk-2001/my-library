import React, { useState } from "react";
import "./Singup.css"
import axios from "axios";
import { Dropdown } from "semantic-ui-react";

function Signup() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [userFullName, setUserFullName] = useState(null);
  const [admissionId, setAdmissionId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState(null);

  const userTypes = [
    { value: "Admin", text: "Admin" },
    { value: "User", text: "User" },
  ];

  //Add a Member
  const addMember = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      userFullName !== null &&
      userType !== null &&
      email !== null &&
      password !== null
    ) {
      const userData = {
        userType: userType,
        userFullName: userFullName,
        admissionId: admissionId,
        employeeId: employeeId,
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          API_URL + "api/auth/register",
          userData
        );
        setUserFullName(null);
        setUserType("User");
        setAdmissionId(null);
        setEmployeeId(null);
        setEmail(null);
        setPassword(null);
        alert("Member Added");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("All the fields must be filled");
    }
    setIsLoading(false);
  };

  return (
    <div
      className=""
    >
      <p className="dashboard-option-title">Add a Member</p>
      <div className="dashboard-title-line"></div>
      <form className="addmember-form" onSubmit={addMember}>
        <div className="semanticdropdown">
          <Dropdown
            placeholder="User Type"
            fluid
            selection
            options={userTypes}
            onChange={(event, data) => setUserType(data.value)}
          />
        </div>
        <label className="addmember-form-label" htmlFor="userFullName">
          Full Name<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addmember-form-input"
          type="text"
          name="userFullName"
          value={userFullName}
          required
          onChange={(e) => setUserFullName(e.target.value)}
        ></input>
        <br />

        <label
          className="addmember-form-label"
          htmlFor={userType === "User" ? "admissionId" : "employeeId"}
        >
          {userType === "User" ? "Admission Id" : "Employee Id"}
          <span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addmember-form-input"
          type="text"
          value={userType === "User" ? admissionId : employeeId}
          required
          onChange={(e) => {
            userType === "User"
              ? setAdmissionId(e.target.value)
              : setEmployeeId(e.target.value);
          }}
        ></input>
        <br />

        <label className="addmember-form-label" htmlFor="email">
          Email<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addmember-form-input"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />

        <label className="addmember-form-label" htmlFor="password">
          Password<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addmember-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />

        <input
          className="addmember-submit"
          type="submit"
          value="SUBMIT"
          disabled={isLoading}
        ></input>
      </form>
    </div>
  );
}

export default Signup;
