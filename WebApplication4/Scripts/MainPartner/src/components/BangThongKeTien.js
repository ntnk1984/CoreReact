import React from "react";
import { Bar } from "react-chartjs-2";

import { Typography, Space } from 'antd';

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
const { Text, Link } = Typography;
function BangThongKeTien() {
  return (
    <div style={{width:600,height:330}} className=" bg-white p-3 rounded-2 shadow m-2">
       <Text className="text-center" strong>Thống kê tiền</Text>
      <Bar
        data={{
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
              label: "Đã trả tiền (vnđ)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              data: [
                2478, 267, 734, 784, 433, 5267, 234, 784, 2433, 234, 1784, 243,
              ],
            },
            {
              label: "Chưa trả tiền (vnđ)",
              backgroundColor: "#fff1b8",
              data: [
                2478, 267, 734, 784, 1433, 9267, 734, 984, 1433, 2234, 3784,
                4243,
              ],
            },
            {
              label: "Chưa đối soát (vnđ)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              data: [
                2478, 5267, 734, 784, 1433, 5267, 734, 784, 6433, 2234, 1784,
                4243,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Predicted world population (millions) in 2050",
          },
        }}
      />
    </div>
  );
}

export default BangThongKeTien;
