import React from "react";
import BuuGuiTable from "./components/BuuGuiTable.js";

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import DonHangTable from "./components/DonHangTable.js";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BuuGuiTable} />
        <Route exact path="/Order/:id" component={DonHangTable} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
