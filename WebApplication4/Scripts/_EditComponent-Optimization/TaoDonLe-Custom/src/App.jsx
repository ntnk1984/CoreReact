import React, { useEffect, useState } from "react";
import Sender from "./components/Sender";
import { getCountryAll } from "./Service";

function App() {
  const [DATA,SETDATA] = useState({
    SENDER: "",
    RECEIVER:"",
  })
  const handleData =(name,value) =>{
    SETDATA({...DATA, name: value})
  }
  const [countryCode, setCountryCode] = useState([]);
  const isEmpty = (v) => {
    return Object.keys(v).length === 0;
  };
  async function GetCountTryCode() {
    const country = await getCountryAll();
    setCountryCode(country);
  }
  useEffect(() => {
    GetCountTryCode();
  }, []);

  return (
    <div>
      <Sender handleDatas={handleData} countryCode={countryCode} />
    </div>
  );
}

export default App;
