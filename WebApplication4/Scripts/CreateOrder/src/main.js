var React = require("react");
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderTwo from "./components/CreateOrderTwo";
// import CreateOrderTree from "./components/CreateOrderTree";

class Main extends React.Component {
  render() {
    return (
      <>
        <CreateOrderOne />
        {/* <CreateOrderTwo /> */}
        {/* <CreateOrderTree /> */}
      </>
    );
  }
}

export default Main;
