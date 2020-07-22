import React from "react";
import "./style/master.scss"; //applies global scss styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import AddGiftPage from "./components/pages/AddGiftPage";
import AccountPage from "./components/pages/AccountPage";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login-page" component={LoginPage} />
        <Route exact path="/add-gift-page" component={AddGiftPage} />
        <Route exact path="/account-page" component={AccountPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
