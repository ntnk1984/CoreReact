import { Input } from "antd";
import React, { useRef } from "react";

function InputSearch({ updateState }) {
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
        onChange={handleSearchTerm}
        placeholder="Nhập thông tin . . . "
      ></Input>
    </div>
  );
}

export default InputSearch;
