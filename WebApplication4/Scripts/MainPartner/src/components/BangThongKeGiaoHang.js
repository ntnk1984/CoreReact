import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const rand=()=>(Math.round(Math.random()*4000-500))

const data = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
  ],
  datasets: [
    {
      label: "Giao hàng",
      data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
      borderColor: "#ffc069",
      backgroundColor: "#ffc069",
    },
    {
      label: "Gôm hàng",
      data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
      borderColor: "#69c0ff",
      backgroundColor: "#69c0ff",
    },
    {
      label: "Hủy đơn",
      data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
      borderColor: "#ff85c0",
      backgroundColor: "#ff85c0",
    },
  ],
};
import { Typography, Space } from "antd";
const { Text, Link } = Typography;
function BangThongKeGiaoHang() {
  return (
    <div
     
      className="bg-white p-3 rounded  shadow me-4 my-3"
    >
      <Text className="text-center" strong>
        Thống kê đơn hàng
      </Text>
      <Line data={data} />
    </div>
  );
}

export default BangThongKeGiaoHang;
