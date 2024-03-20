import Signin from "./Pages/Signin";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard/MemberDashboard.js";
import Allbooks from "./Pages/Allbooks";
import Header from "./Components/Header";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard.js";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext.js";
import Signup from "./Pages/Signup.js";
import VendorDashboard from "./Pages/Dashboard/VendorDashboard/VendorDashboard.js";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/">
            {!user ? (
              <Redirect to="/signin" />
            ) : (
              user.userType.toLowerCase() === "admin" ? (
                <Redirect to="/dashboard@admin" />
              ) : user.userType.toLowerCase() === "user" ? (
                <Redirect to="/dashboard@member" />
              ) : (
                <Redirect to="/dashboard@vendor" />
              )
            )}
          </Route>
          <Route exact path="/signin">
            {user ? (
              user.userType.toLowerCase() === "admin" ? (
                <Redirect to="/dashboard@admin" />
              ) : user.userType.toLowerCase() === "user" ? (
                <Redirect to="/dashboard@member" />
              ) : (
                <Redirect to="/dashboard@vendor" />
              )
            ) : (
              <Signin />
            )}
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard@member">
            {user ? (
              user.userType.toLowerCase() === "user" ? (
                <MemberDashboard />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/dashboard@admin">
            {user ? (
              user.userType.toLowerCase() === "admin" ? (
                <AdminDashboard />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/dashboard@vendor">
            {user ? (
              user.userType.toLowerCase() === "vendor" ? (
                <VendorDashboard />
              ) : (
                <Redirect to="/" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/books">
            <Allbooks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
