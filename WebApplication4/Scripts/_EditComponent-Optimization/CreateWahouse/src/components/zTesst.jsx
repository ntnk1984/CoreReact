import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import React, { useEffect, useState } from "react";
const dataWH = [
  {
    ACCEPTORDERCITYCODE: "VN-DN,VN-HP",
    CAPACITY: 10000,
    CODE: "WH01A2",
    ID: "41e16d8c-0698-447e-8150-ff67905dd36c",
    IDWAREHOUSE: "717bac81-c67a-4abc-8bf5-aa0b8664b117",
    NAME: "Khu Đà Nẵng",
    STORED: 0,
    WAREHOUSECODE: "WH01",
    ORDERLIST: [
      {
        NAME: "Túi Gu Chì",
        ID: "00aa991a",
        WEIGHT: 50,
        WEIGHTCOVERED: 2,
        COD: 1000,
      },
      {
        NAME: "Túi C",
        ID: "00aa991c",
        WEIGHT: 20,
        WEIGHTCOVERED: 2,
        COD: 500,
      },
      {
        NAME: "Túi B",
        ID: "00aa991b",
        WEIGHT: 20,
        WEIGHTCOVERED: 2,
        COD: 400,
      },
    ],
    BIN: [
      {
        BINCODE: "B1",
        CAPACITY: 5000,
        STORED: 0,
        NAME: "Kệ 01",
        ID: "01122dc-000-1cab9081",
        ORDERLIST: [
          {
            NAME: "Túi Gu Chì",
            ID: "00aa991a",
            WEIGHT: 50,
            WEIGHTCOVERED: 2,
            COD: 1000,
          },
          {
            NAME: "Túi C",
            ID: "00aa991c",
            WEIGHT: 20,
            WEIGHTCOVERED: 2,
            COD: 500,
          },
          {
            NAME: "Túi B",
            ID: "00aa991b",
            WEIGHT: 20,
            WEIGHTCOVERED: 2,
            COD: 400,
          },
        ],
        BOX: [
          {
            BOXCODE: "BX-1",
            CAPACITY: 2500,
            STORED: 0,
            NAME: "Ô 01",
            ID: "01122dc-000-1cab1111",
            ORDERLIST: [
              {
                NAME: "Túi Gu Chì",
                ID: "00aa991a",
                WEIGHT: 50,
                WEIGHTCOVERED: 2,
                COD: 1000,
              },
              {
                NAME: "Túi C",
                ID: "00aa991c",
                WEIGHT: 20,
                WEIGHTCOVERED: 2,
                COD: 500,
              },
              {
                NAME: "Túi B",
                ID: "00aa991b",
                WEIGHT: 20,
                WEIGHTCOVERED: 2,
                COD: 400,
              },
            ],
          },
          {
            BOXCODE: "BX-2",
            CAPACITY: 2500,
            STORED: 0,
            NAME: "Ô 02",
            ID: "01122dc-000-1cab2221",
            ORDERLIST: [
              {
                NAME: "Túi Gu Chì",
                ID: "00aa991a",
                WEIGHT: 50,
                WEIGHTCOVERED: 2,
                COD: 1000,
              },
              {
                NAME: "Túi C",
                ID: "00aa991c",
                WEIGHT: 20,
                WEIGHTCOVERED: 2,
                COD: 500,
              },
              {
                NAME: "Túi B",
                ID: "00aa991b",
                WEIGHT: 20,
                WEIGHTCOVERED: 2,
                COD: 400,
              },
            ],
          },
        ],
      },
      {
        BINCODE: "B2",
        CAPACITY: 5000,
        STORED: 0,
        NAME: "Kệ 02",
        ID: "01122dc-000-1cab9082",
        BOX: [],
      },
    ],
  },
  {
    ACCEPTORDERCITYCODE: "VN-BD,VN-SG",
    CAPACITY: 20000,
    CODE: "WH01A1",
    ID: "41e16d8c-0698-447e-8150-ff67905dd36c0",
    IDWAREHOUSE: "717bac81-c67a-4abc-8bf5-aa0b8664b117",
    NAME: "Khu Miền Nam",
    STORED: 0,
    WAREHOUSECODE: "WH02",
    BIN: [
      {
        BINCODE: "B2",
        CAPACITY: 5000,
        STORED: 0,
        NAME: "Kệ 02",
        ID: "01122dc-000-1cab9089",
        BOX: [],
      },
    ],
  },
];



const TreeComponent = () => {
    const [selectedData,setSelcetedData] = useState()
    const dataMap =
    dataWH.map((item) => {
      let temp = {
        title: item.NAME,
        key: item.ID,
        capacity: item.CAPACITY,
        stored: item.STORED,
        orderList: item.ORDERLIST || [],
        children: item.BIN.map((x) => ({
          title: x.NAME,
          key: x.ID,
          capacity: x.CAPACITY,
          stored: x.STORED,
          orderList: x.ORDERLIST || [],
  
          children: x.BOX.map((y) => ({
            title: y.NAME,
            key: y.ID,
            capacity: y.CAPACITY,
            stored: y.STORED,
            orderList: y.ORDERLIST || [],
          })),
        })),
      };
      return temp;
    }) || [];
// useEffect(()=>{
//  let data = dataMap
//  setSelcetedData(data)
// },[])
// console.log(dât);
  const onSelect = (selectedKeys, info) => {
    // console.log("selectedKey", selectedKeys);
    console.log("Info ", info);
    setSelcetedData(info.selectedNodes)
  };
  console.log(selectedData);
  return <Tree showLine switcherIcon={<DownOutlined />} onSelect={onSelect} treeData={dataMap} />;
};

export default TreeComponent;

// export default TreeComponent;
