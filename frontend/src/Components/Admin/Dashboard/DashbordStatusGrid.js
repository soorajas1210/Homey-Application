import React, { useEffect } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardStatusGrid() {
  const dispatch = useDispatch();

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
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Services Completed
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {bookings.filter((booking) => booking.status === "payed").length}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Transactions
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {"₹" + totalAmount}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">-343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {users.length}
            </strong>
            {/* <span className="text-sm text-red-500 pl-2">-30</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Bookings
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {bookings.filter((booking) => booking.status !== "payed").length}
            </strong>
            {/* <span className="text-sm text-red-500 pl-2">-43</span> */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
