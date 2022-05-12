import { Input } from "antd";
import React, { useRef } from "react";

function InputSearch({ updateState, placeholder }) {
  const typingTimeOutRef = useRef(null);
  const handleSearchTerm = (e) => {
    if (typingTimeOutRef.current) clearTimeout(typingTimeOutRef.current);

    typingTimeOutRef.current = setTimeout(() => {
      updateState(e.target.value);
    }, 300);
  };
  return (
    <div>
      <Input
        name="search-data"
        onChange={handleSearchTerm}
        placeholder={placeholder}
      ></Input>
    </div>
  );
}

export default InputSearch;
