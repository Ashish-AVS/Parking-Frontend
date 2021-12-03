import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-s-alert";
import { ACCESS_TOKEN } from "../constants";

const ParkingSpaces = () => {
  const [rows, setRows] = useState([
    { space: "P1", slot: "8-9", carsAlloted: "Honda City", id: 1 },
    { space: "P2", slot: "2-5", carsAlloted: "Swift Dezire", id: 2 },
    { space: "P3", slot: "6-7", carsAlloted: "Mercedes Benz", id: 3 },
  ]);
  const [parkingVals, setParkingVals] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/parking/lot", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        Alert.success("Fetched Successfully");
        setParkingVals(res.data);
        console.log(res.data);
      })
      .catch((err) => Alert.error(err));
  }, []);

  const addSlot = (lotId) => {
    console.log("LOT ID", lotId);
    axios
      .post("http://localhost:8080/parking/add/slot", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        Alert.success("SLOT CREATED")
        axios.put(
          `http://localhost:8080/parking/slot/${res.data.id}/lot/${lotId}`, {carName: "Alto"},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
          }
        ).then(res => Alert.success('SLOT ADDED'));
      });
  };
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Parking Spaces
          </h1>
        </div>
        <div class="lg:w-2/3 w-full mx-auto overflow-auto">
          <table class="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Parking Lot
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Parking Slots
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  {/* Cars alloted */}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {rows.map((rows) => (
                <tr key={rows.id}>
                  <td class="px-4 py-3 ">{rows.space}</td>
                  <td class="px-4 py-3">{rows.slot}</td>
                  <td class="px-4 py-3">{rows.carsAlloted}</td>
                  <td class="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Slot
                    </button>{" "}
                  </td>
                  <td class="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Remove Slot
                    </button>{" "}
                  </td>
                  <td class="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Remove Space
                    </button>{" "}
                  </td>
                </tr>
              ))} */}

              {parkingVals &&
                parkingVals.map((dabba) => (
                  <tr key={dabba.id}>
                    <td class="px-4 py-3">{dabba.id ? dabba.id : -1}</td>
                    <td class="px-4 py-3">{dabba.location ? dabba.location : -1}</td>
                    <td class="px-4 py-3">{dabba.city ? dabba.city : -1}</td>
                    <td class="px-4 py-3 ">
                    {dabba.parkingSlotList.map((slots) => (
                      <div>{slots.id ? slots.id : -1}</div>
                    ))}
                    </td>
                    {/* <td class="px-4 py-3">{rows.carsAlloted}</td> */}

                    <td class="px-4 py-3 text-lg text-gray-900">
                      {" "}
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Remove Slot
                      </button>{" "}
                    </td>
                    <td class="px-4 py-3 text-lg text-gray-900">
                      {" "}
                      <button
                        onClick={() => addSlot(dabba.id)}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Slot to Location
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              {/* <tr>
              <td class="px-4 py-3">A1</td>
              <td class="px-4 py-3">8 - 9</td>
              <td class="px-4 py-3">Car Wash</td>
               

               <td class="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> 
                          
              <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr>  */}
              {/* <tr>
              <td class="px-4 py-3">A1</td>
              <td class="px-4 py-3">8 - 9</td>
              <td class="px-4 py-3">Car Wash</td> */}

              {/* <td class="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> */}

              {/* <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr>
              <tr>
              <td class="px-4 py-3">A1</td>
              <td class="px-4 py-3">8 - 9</td>
              <td class="px-4 py-3">Car Wash</td> */}

              {/* <td class="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> */}

              {/* <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td class="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr> */}

              {/* <tr>
              <td class="border-t-2 border-gray-200 px-4 py-3">Business</td>
              <td class="border-t-2 border-gray-200 px-4 py-3">36 Mb/s</td>
              <td class="border-t-2 border-gray-200 px-4 py-3">40 GB</td>
              <td class="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">$50</td>
              <td class="border-t-2 border-gray-200 w-10 text-center">
                <input name="plan" type="radio"/>
              </td>
            </tr> */}
            </tbody>
          </table>
        </div>
        <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          {/* <a class="text-purple-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a> */}
          <button class="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
            Add Space
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParkingSpaces;
