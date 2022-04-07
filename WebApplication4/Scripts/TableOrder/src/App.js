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
        <Route path="/" component={BuuGuiTable} />
        <Route path="/Order" children={DonHangTable} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
