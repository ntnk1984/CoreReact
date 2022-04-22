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

const data = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
  ],
  datasets: [
    {
      label: "Giao hàng",
      data: [2478, 267, 3734, 784, 433, 2267, 234, 1784, 2433, 5234, 1784, 243],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Gôm hàng",
      data: [
        1478, 1267, 734, 784, 9433, 5267, 734, 984, 1433, 2234, 3784, 4243,
      ],
      borderColor: "#fff1b8",
      backgroundColor: "#fff1b8",
    },
    {
      label: "Hủy đơn",
      data: [1478, 1267, 734, 764, 433, 5267, 734, 4984, 1433, 234, 4784, 2243],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
import { Typography, Space } from "antd";
const { Text, Link } = Typography;
function BangThongKeGiaoHang() {
  return (
    <div
      style={{ width: 600, height: 330 }}
      className="bg-white p-3 rounded-2 shadow m-2"
    >
      <Text className="text-center" strong>
        Thống kê đơn hàng
      </Text>
      <Line data={data} />
    </div>
  );
}

export default BangThongKeGiaoHang;
