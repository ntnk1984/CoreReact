import React, { useEffect, useState } from 'react';


function App() {
  // const [countryCode, setCountryCode] = useState([])
  async function GetCountTryCode(){
    const country = await getCountryAll();
    console.log(country,"123");
  }
  useEffect(() => {
    GetCountTryCode()

  //  setCountryCode(country)
  }, []);
  // console.log(countryCode," contryCode");
  return (
    <div>
      <h1>Helo form</h1>
    </div>
  );
}

export default App;