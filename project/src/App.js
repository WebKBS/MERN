import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* exact가있으면 해당 path만 적용된다. */}
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/" />
        {/* Redirect는 패스가 없으면 해당 패스로 이동 */}
      </Switch>
    </Router>
  );
};

export default App;
