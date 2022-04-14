import React, { useState } from "react";
import FormInfoUser from "./components/FormInfoUser/FormInfoUser.js";

export default function App() {
  const [nameFile,setNameFile]=useState("")
  return (
    <div className=" bg-white p-3 mt-3 shadow-sm border-2 rounded-1" style={{ margin: "0 auto",width:600 }}>
      <FormInfoUser />
  
     
    </div>
  );
}
