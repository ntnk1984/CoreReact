import React, { useState } from "react";
import { Input, Table ,Popover,Button} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
];

export default function App() {
  const [dataSource, setDataSource] = useState(data);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const FilterByNameInput = (
    <div className="d-flex justify-content-end">
    <Popover content={ <Input
        placeholder="Search Name"
        value={name}
        onChange={(e) => {
          const currValue = e.target.value;
          setName(currValue);
          const filteredData = data.filter((entry) =>
            entry.name.includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />} title="Title">
     
     <SearchOutlined/>
    
          
    
    
  </Popover> </div>
   
  );

  const FilterByAddress = (
    <Input
    
      placeholder="Search address"
      value={address}
      onChange={(e) => {
        const currValue = e.target.value;
        setAddress(currValue);
        const filteredData = data.filter((entry) =>
          entry.address.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: "name",
      key: "1",
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },
    {
      title: FilterByAddress,
      dataIndex: "address",
      key: "2",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}
