"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const WorkerOrderCharts = () => {
  // Data for Radial Bar Chart (Current orders by worker)
  const workerData = [
    { name: "John", orders: 45, fill: "#8884d8" },
    { name: "Sarah", orders: 78, fill: "#83a6ed" },
    { name: "Mike", orders: 32, fill: "#8dd1e1" },
    { name: "Emma", orders: 65, fill: "#82ca9d" },
    { name: "David", orders: 53, fill: "#a4de6c" },
  ];

  // Data for Bar Chart (Monthly orders over past year)
  const monthlyData = [
    { month: "Jan", orders: 120 },
    { month: "Feb", orders: 98 },
    { month: "Mar", orders: 150 },
    { month: "Apr", orders: 135 },
    { month: "May", orders: 165 },
    { month: "Jun", orders: 142 },
    { month: "Jul", orders: 178 },
    { month: "Aug", orders: 156 },
    { month: "Sep", orders: 190 },
    { month: "Oct", orders: 210 },
    { month: "Nov", orders: 198 },
    { month: "Dec", orders: 230 },
  ];

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="w-[400px]">
        <h2 className="mb-1">Current Orders Completed by Worker</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart
            innerRadius="20%"
            outerRadius="80%"
            data={workerData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="orders"
              cornerRadius={10}
              label={{ position: "insideStart", fill: "#fff" }}
            />
            <Legend />
            <Tooltip
              formatter={(value) => [`${value} orders`, "Completed"]}
              labelFormatter={(name) => `Worker: ${name}`}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-[400px]">
        <h2 className="mb-1">Monthly Order Completion (Past Year)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} orders`, "Completed"]}
              labelFormatter={(month) => `Month: ${month}`}
            />
            <Legend />
            <Bar dataKey="orders" fill="#8884d8" name="Orders Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkerOrderCharts;
