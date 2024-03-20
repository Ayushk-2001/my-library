import React, { useReducer, useState } from "react";
import "./AdminDashboard.css";
import AddTransaction from "./Components/AddTransaction";
import AddMember from "./Components/AddMember";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GetMember from "./Components/GetMember";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Profile } from "../MemberDashboard/Components/Profile";

/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const AdminHome = () => {
  return (
    <div
      style={{
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // fontSize: "xxl",
      }}
    >
      Hello Admin
    </div>
  );
};

function AdminDashboard() {
  const [active, setActive] = useState("addbooks");
  const [sidebar, setSidebar] = useState(false);

  /* Logout Function*/
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton>
        </div>

        {/* Sidebar */}
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">My Library</div>
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
              active === "getmember" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("getmember");
              setSidebar(false);
            }}
          >
            <AccountBoxIcon className="dashboard-option-icon" /> Get Member{" "}
          </p>
          <p
            className={`dashboard-option ${
              active === "addmember" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("addmember");
              setSidebar(false);
            }}
          >
            <PersonAddIcon className="dashboard-option-icon" /> Add Member{" "}
          </p>
          <p className={`dashboard-option`} onClick={logout}>
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </p>
        </div>
        <div className="dashboard-option-content">
          <div
            className="dashboard-addmember-content"
            style={active !== "profile" ? { display: "none" } : {}}
          >
            <AdminHome />
          </div>
          <div
            className="dashboard-addmember-content"
            style={active !== "addmember" ? { display: "none" } : {}}
          >
            <AddMember />
          </div>
          <div
            className="dashboard-addmember-content"
            style={active !== "getmember" ? { display: "none" } : {}}
          >
            <GetMember />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
