import React from "react";
import { Select } from "antd";

const { Option } = Select;

function SelectModal({ data, handleSelect, name }) {
  return (
    <Select
      showSearch
      name={name}
      style={{ width: "100%" }}
      placeholder="Bưu tá"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
      onChange={(e) => {
        handleSelect(e);
      }}
    >
      {data.map((item) => {
        let name = `${item.first_name}  ${item.last_name}  ${item.phone}`;
        let value = `${item.first_name} ${item.last_name} `;
        return (
          <Select.Option key={item.id} value={value}>
            {name}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default SelectModal;
