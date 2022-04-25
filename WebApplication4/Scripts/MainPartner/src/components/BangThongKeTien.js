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
const rand=()=>(Math.round(Math.random()*4000+500))
function BangThongKeTien() {
  return (
    <div  className=" bg-white p-3 rounded-2 shadow ms-4 my-3">
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
            "Tháng 8",
            "Tháng 9",
          ],
          datasets: [
            {
              label: "Đã trả tiền (vnđ)",
              backgroundColor: "#d9f7be",
              data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
            },
            {
              label: "Chưa trả tiền (vnđ)",
              backgroundColor: "#95de64",
              data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
            },
            {
              label: "Chưa đối soát (vnđ)",
              backgroundColor: "#52c41a",
              data: [rand(), rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()],
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
