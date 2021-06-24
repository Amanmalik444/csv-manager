import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CreateTable from "./CreateTable";
import Login from "./LoginPage";
import Register from "./RegistrationPage";
import Nav from "./Nav/Nav";
import SavedTable from "./HomePage/savedTable";
import LandingPage from "./LandingPage";

const Routes = () => {
  return (
    <Router>
      <Route
        path={["/home", "/CreateTable", "/savedTable:id"]}
        component={Nav}
      />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/savedTable:id" exact component={SavedTable} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/CreateTable" exact component={CreateTable} />
      </Switch>
    </Router>
  );
};

export default Routes;
