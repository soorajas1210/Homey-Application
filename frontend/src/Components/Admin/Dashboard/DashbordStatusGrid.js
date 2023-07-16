import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import {useSelector } from "react-redux";

export default function DashboardStatusGrid() {

  const pay = useSelector((state) => state.paymentInfo);
  const { payments } = pay;

  const totalAmount = payments.reduce((total, payment) => {
    return total + parseFloat(payment.invoiceId.amount);
  }, 0);

  const List = useSelector((state) => state.bookingList);
  const { bookings } = List;

  console.log("hello", bookings);

  const uList = useSelector((state) => state.adminUsersList);
  const { users } = uList;

  return (
    <div class="flex flex-wrap gap-4 sm:grid sm:grid-cols-2 p-3 lg:grid-cols-4">
      <div class="w-full sm:w-auto">
        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle class="text-2xl text-white" />
        </div>
        <div class="pl-4">
          <span class="text-sm text-gray-500 font-light">
            Total Services Completed
          </span>
          <div class="flex items-center">
            <strong class="text-xl text-gray-700 font-semibold">
              {bookings.filter((booking) => booking.status === "payed").length}
            </strong>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-auto">
        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart class="text-2xl text-white" />
        </div>
        <div class="pl-4">
          <span class="text-sm text-gray-500 font-light">
            Total Transactions
          </span>
          <div class="flex items-center">
            <strong class="text-xl text-gray-700 font-semibold">
              {"₹" + totalAmount}
            </strong>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-auto">
        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople class="text-2xl text-white" />
        </div>
        <div class="pl-4">
          <span class="text-sm text-gray-500 font-light">Total Customers</span>
          <div class="flex items-center">
            <strong class="text-xl text-gray-700 font-semibold">
              {users.length}
            </strong>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-auto">
        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart class="text-2xl text-white" />
        </div>
        <div class="pl-4">
          <span class="text-sm text-gray-500 font-light">Total Bookings</span>
          <div class="flex items-center">
            <strong class="text-xl text-gray-700 font-semibold">
              {bookings.filter((booking) => booking.status !== "payed").length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

