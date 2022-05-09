import React from "react";
import { Bar } from "react-chartjs-2";

import { Typography, Space } from "antd";

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
const rand = () => Math.round(Math.random() * 4000 + 500);
function BangThongKeTien() {
  return (
    <div className=" bg-white p-3 rounded-2 shadow ms-4 ">
      <Text className="text-center" strong>
        Thống kê tiền
      </Text>
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
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              label: "Đã trả tiền (vnđ)",
              backgroundColor: "#91d5ff",
              data: [
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
              ],
            },
            {
              label: "Chưa trả tiền (vnđ)",
              backgroundColor: "#40a9ff",
              data: [
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
              ],
            },
            {
              label: "Chưa đối soát (vnđ)",
              backgroundColor: "#096dd9",
              data: [
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
                rand(),
              ],
            },
          ],
        }}
        height="104px"
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Predicted world population (millions) in 2050",
            maintainAspectRatio: false,
          },
        }}
      />
    </div>
  );
}

export default BangThongKeTien;
