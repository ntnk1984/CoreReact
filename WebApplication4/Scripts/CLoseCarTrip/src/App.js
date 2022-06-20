import React, { useState } from "react";
import TableImportList from "./components/TableImportList";

function App(props) {
  const [memeCat, setMemeCat] = useState(false);
  return (
    <div className="App-main">
      <div style={{ width: "95%", margin: " 0 auto", textAlign: "center" }}>
        {memeCat ? (
          <div>
            <iframe
              src="https://gfycat.com/ifr/WindyEssentialHyracotherium"
              frameBorder={0}
              scrolling="no"
              allowFullScreen
              width={"100%"}
              height={250}
            />
          </div>
        ) : (
          ""
        )}
        <h3 className="py-3 text-secondary" onClick={() => setMemeCat(!memeCat)}>
          Đóng chuyến xe
        </h3>
        <TableImportList />
      </div>
    </div>
  );
}

export default App;
