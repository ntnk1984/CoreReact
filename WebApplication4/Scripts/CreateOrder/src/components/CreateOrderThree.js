import React from 'react';
import { Table, Tag, Space,Button } from 'antd';

const columns = [
  {
    title: '#',
    render: (text,record,index) => <a>{++index}</a>,
  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'ms',
    key: 'ms',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Tên tiếng anh sản phẩm',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Mã quốc gia sản phẩm',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Đơn vị sản phẩm',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Đơn vị tiền tệ',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Số lượng ',
    dataIndex: 'name',
    key: 'address',
  },
  {
    title: 'Cân nặng ',
    dataIndex: 'name',
    key: 'address',
  },

 
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Createorderthree = () => {
  return (
    <Table columns={columns} pagination={{ position: ["none"] }} dataSource={data}  footer={()=>(<Button>Tạo mới đơn hàng</Button>)}/>
  );
}

export default Createorderthree;
