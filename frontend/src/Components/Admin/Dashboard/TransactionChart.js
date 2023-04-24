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

const data = [
  {
    name: "Jan",
    Booking: 4000,
    Income: 2400,
  },
  {
    name: "Feb",
    Booking: 3000,
    Income: 1398,
  },
  {
    name: "Mar",
    Booking: 2000,
    Income: 9800,
  },
  {
    name: "Apr",
    Booking: 2780,
    Income: 3908,
  },
  {
    name: "May",
    Booking: 1890,
    Income: 4800,
  },
  {
    name: "Jun",
    Booking: 2390,
    Income: 3800,
  },
  {
    name: "July",
    Booking: 3490,
    Income: 4300,
  },
  {
    name: "Aug",
    Booking: 2000,
    Income: 9800,
  },
  {
    name: "Sep",
    Booking: 2780,
    Income: 3908,
  },
  {
    name: "Oct",
    Booking: 1890,
    Income: 4800,
  },
  {
    name: "Nov",
    Booking: 2390,
    Income: 3800,
  },
  {
    name: "Dec",
    Booking: 3490,
    Income: 4300,
  },
];

export default function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Booking" fill="#0ea5e9" />
            <Bar dataKey="Income" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
