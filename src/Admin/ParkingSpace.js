import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Alert from "react-s-alert";
import { ACCESS_TOKEN } from "../constants";
import SpaceModal from "./SpaceModal";

const ParkingSpaces = () => {
  const [rows, setRows] = useState([
    { space: "P1", slot: "8-9", carsAlloted: "Honda City", id: 1 },
    { space: "P2", slot: "2-5", carsAlloted: "Swift Dezire", id: 2 },
    { space: "P3", slot: "6-7", carsAlloted: "Mercedes Benz", id: 3 },
  ]);
  const [showModal, setShowModal] = useState(false)
  const [parkingVals, setParkingVals] = useState();
  const slotRef = useRef();

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
      .post(
        "http://localhost:8080/parking/add/slot",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      )
      .then((res) => {
        Alert.success("SLOT CREATED");
        axios
          .put(
            `http://localhost:8080/parking/slot/${res.data.id}/lot/${lotId}`,
            { carName: "Alto" },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
              },
            }
          )
          .then((res) => Alert.success("SLOT ADDED"));
      });
  };

  const spaceHandler = () => {
    setShowModal(prev => !prev);
  }

  const lotDeleteHandler = (id) => {
    axios
    .delete(
      `http://localhost:8080/parking/delete/lot/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    )
    .then((res) => Alert.success(`Parking Space with id ${id} DELETED`));
  }
  const slotDeleteHandler = () => {
    const fl = slotRef.current;
    axios
    .delete(
      `http://localhost:8080/parking/delete/slot/${fl.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    )
    .then((res) => Alert.success(`Slot with id ${fl.value} DELETED`));
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Parking Spaces
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Parking Lot ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Parking Lot
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  City
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Parking Slots
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Remove Space
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Create a new Slot
                </th>
              </tr>
            </thead>
            <tbody>
              {parkingVals &&
                parkingVals.map((dabba) => (
                  <tr key={dabba.id}>
                    <td className="px-4 py-3">{dabba.id ? dabba.id : -1}</td>
                    <td className="px-4 py-3">
                      {dabba.location ? dabba.location : -1}
                    </td>
                    <td className="px-4 py-3">{dabba.city ? dabba.city : -1}</td>
                    <td className="px-4 py-3 ">
                      {dabba.parkingSlotList.map((slots) => (
                        <div>{slots.id ? slots.id : -1}</div>
                      ))}
                    </td>
                    {/* <td className="px-4 py-3">{rows.carsAlloted}</td> */}

                    <td className="px-4 py-3 text-lg text-gray-900">
                      {" "}
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => lotDeleteHandler(dabba.id)}
                      >
                        Remove Space
                      </button>{" "}
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
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
              <td className="px-4 py-3">A1</td>
              <td className="px-4 py-3">8 - 9</td>
              <td className="px-4 py-3">Car Wash</td>
               

               <td className="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> 
                          
              <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr>  */}
              {/* <tr>
              <td className="px-4 py-3">A1</td>
              <td className="px-4 py-3">8 - 9</td>
              <td className="px-4 py-3">Car Wash</td> */}

              {/* <td className="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> */}

              {/* <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr>
              <tr>
              <td className="px-4 py-3">A1</td>
              <td className="px-4 py-3">8 - 9</td>
              <td className="px-4 py-3">Car Wash</td> */}

              {/* <td className="w-10 text-center">
                <input name="plan" type="radio"/>
              </td> */}

              {/* <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Add Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Slot
                      </button> </td>
                      <td className="px-4 py-3 text-lg text-gray-900"> <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                       Remove Space
                      </button> </td>
              </tr> */}

              {/* <tr>
              <td className="border-t-2 border-gray-200 px-4 py-3">Business</td>
              <td className="border-t-2 border-gray-200 px-4 py-3">36 Mb/s</td>
              <td className="border-t-2 border-gray-200 px-4 py-3">40 GB</td>
              <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">$50</td>
              <td className="border-t-2 border-gray-200 w-10 text-center">
                <input name="plan" type="radio"/>
              </td>
            </tr> */}
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          {/* <a className="text-purple-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a> */}
          <button 
          className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
          onClick={spaceHandler}
          >
             {showModal && <SpaceModal />}
            Add Space
          </button>
          <label>Delete a slot</label> 
          <input type="text" ref={slotRef} />
          <button 
          className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
          onClick={slotDeleteHandler}
          >
             Delete Slot
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParkingSpaces;
