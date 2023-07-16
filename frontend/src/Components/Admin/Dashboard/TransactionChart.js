import React from "react";
import { useSelector } from "react-redux";
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



export default function TransactionChart() {
  const pay = useSelector((state) => state.paymentInfo);
  const { payments } = pay;

  const List = useSelector((state) => state.bookingList);
  const { bookings } = List;

  console.log(bookings);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const apstartDate = new Date("2023-04-01");
  const apendDate = new Date("2023-05-01");

  console.log("newDate", formatDate(bookings[0]?.createdAt));

  const length = bookings.filter(
    (item) =>
      new Date(item.createdAt) >= apstartDate &&
      new Date(item.createdAt) <= apendDate
  ).length;

  console.log("length", length);

  const data = [
    {
      name: "Jan",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-01-01") &&
          new Date(item.createdAt) <= new Date("2023-01-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-01-01") &&
            new Date(item.createdAt) <= new Date("2023-01-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Feb",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-02-01") &&
          new Date(item.createdAt) <= new Date("2023-02-28")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-02-01") &&
            new Date(item.createdAt) <= new Date("2023-02-28")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Mar",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-03-01") &&
          new Date(item.createdAt) <= new Date("2023-03-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-03-01") &&
            new Date(item.createdAt) <= new Date("2023-03-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Apr",
      // Booking: 2780,
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-04-01") &&
          new Date(item.createdAt) <= new Date("2023-04-30")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-04-01") &&
            new Date(item.createdAt) <= new Date("2023-04-30")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "May",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-05-01") &&
          new Date(item.createdAt) <= new Date("2023-05-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-05-01") &&
            new Date(item.createdAt) <= new Date("2023-05-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Jun",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-06-01") &&
          new Date(item.createdAt) <= new Date("2023-06-30")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-06-01") &&
            new Date(item.createdAt) <= new Date("2023-06-30")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "July",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-07-01") &&
          new Date(item.createdAt) <= new Date("2023-07-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-07-01") &&
            new Date(item.createdAt) <= new Date("2023-07-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Aug",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-08-01") &&
          new Date(item.createdAt) <= new Date("2023-08-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-08-01") &&
            new Date(item.createdAt) <= new Date("2023-08-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Sep",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-09-01") &&
          new Date(item.createdAt) <= new Date("2023-09-30")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-09-01") &&
            new Date(item.createdAt) <= new Date("2023-09-30")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Oct",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-10-01") &&
          new Date(item.createdAt) <= new Date("2023-10-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-10-01") &&
            new Date(item.createdAt) <= new Date("2023-10-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Nov",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-11-01") &&
          new Date(item.createdAt) <= new Date("2023-11-30")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-11-01") &&
            new Date(item.createdAt) <= new Date("2023-11-30")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
    {
      name: "Dec",
      Booking: bookings.filter(
        (item) =>
          new Date(item.createdAt) >= new Date("2023-12-01") &&
          new Date(item.createdAt) <= new Date("2023-12-31")
      ).length,
      Income: payments
        .filter(
          (item) =>
            new Date(item.createdAt) >= new Date("2023-12-01") &&
            new Date(item.createdAt) <= new Date("2023-12-31")
        )
        .reduce((total, payment) => {
          return total + parseFloat(payment.invoiceId.amount);
        }, 0),
    },
  ];

  return (
   
    <div className="w-full h-full">
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
    </div>
  );
}
