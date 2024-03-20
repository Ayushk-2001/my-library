import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { Profile } from "./Components/Profile";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddTransaction from "../AdminDashboard/Components/AddTransaction";

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);
  const [memberDetails, setMemberDetails] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
            My Library
          </div>
          <p
            className={`dashboard-option ${
              active === "profile" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> Profile
          </p>
          <p
            className={`dashboard-option ${
              active === "addtransaction" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("addtransaction");
              setSidebar(false);
            }}
          >
            <ReceiptIcon className="dashboard-option-icon" /> Add Transaction{" "}
          </p>
          <p className={`dashboard-option`} onClick={logout}>
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </p>
        </div>

        <div className="dashboard-option-content">
          <div
            className="dashboard-transactions-content"
            style={active !== "addtransaction" ? { display: "none" } : {}}
          >
            <AddTransaction />
          </div>
          <div
            className="dashboard-transactions-content"
            style={active !== "profile" ? { display: "none" } : {}}
          >
            <Profile memberDetails={memberDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
