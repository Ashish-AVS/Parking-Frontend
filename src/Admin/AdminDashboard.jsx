/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";

import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import ParkingSpaces from "./ParkingSpace";
import WorkerList from "./WorkerList";
import DashboardContainer from "./DashboardContainer";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";


const navigation = [
  { name: "Dashboard", href: "/admin-dashboard", current: true },
  { name: "Add Worker", href: "/admin-dashboard/addWorker", current: false },
  {
    name: "Add Parking Space",
    href: "/admin-dashboard/addParking",
    current: false,
  },
  // { name: 'Calendar', href: '#', current: false },
  // { name: 'Reports', href: '#', current: false }
];
const userNavigation = [
  { name: "Add Worker", href: "/addWorker" },
  { name: "Add Parking Space", href: "/addParking" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const [workerSwitch, setWorkerSwitch] = useState();
  const [income, setIncome] = useState();
  useEffect(() => {
    axios.get("http://localhost:8080/parking/admin",  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    }).then(res => {
      setIncome(res.data[0].amount);
      console.log("HEHEH", res);
    }).catch(err => alert(err))
  }, [])
  const switchHandler = () => {
    setWorkerSwitch((prevState) => !prevState);
  };
  return (
    <div>
      <div className="min-h-full">

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Admin 💪</h1>
            <h1 className="text-3xl font-bold text-gray-900">Your Income is : ₹{income}</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0 ">
              {/* Add later when beautification */}
              {/* <DashboardContainer /> */}
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {/* <ParkingSpaces /> */}
                <WorkerList />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
}
