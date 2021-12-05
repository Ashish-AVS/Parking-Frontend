import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal/Modal";
import { ACCESS_TOKEN } from "../constants";

const UserData = () => {
  const [user, setUsers] = useState();

  useEffect(() => {
    // axios.get("http://localhost:8080/worker").then(res => console.log(res));
    axios({
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      credentials: "same-origin",
      url: "http://localhost:8080/findAllOrders",
    }).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  //   const modalHandler = () => {
  //     setShowModal(prevState => !prevState)
  //   }
  //   const deleteWorkerHandler = (id = -1) => {
  //     axios
  //       .delete(`http://localhost:8080/worker/${id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
  //       .then(() => alert("Worker Deleted Successfully!"));
  //   };

  //   const editWorkerHandler = (id = -1) => {
  //     alert("WORK IN PROGRESS")
  //     axios
  //       .put(`http://localhost:8080/worker/${id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
  //       .then(() => alert("Worker Deleted Successfully!"));
  //   };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Users List
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto ">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  ID
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Name
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  FastTag Balance
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Waitlists
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Bookings
                </th>
                <th className="px-4 py-3 border-2 border-light-blue-500 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Provider
                </th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.map((rows) => (
                  <tr key={rows.id}>
                    <td className="px-4 py-3 border-2 border-light-blue-500 ">{rows.id}</td>
                    <td className="px-4 py-3 border-2 border-light-blue-500 ">{rows.name}</td>
                    <td className="px-4 py-3 border-2 border-light-blue-500">{rows.email}</td>
                    <td className="px-4 py-3 border-2 border-light-blue-500">{rows.fastTag}</td>
                    {/* <label for="cars">Choose a car:</label> */}
                    <td className="px-4 py-3 border-2 border-light-blue-500">
                      <div className="block">
                        {/* <span className="text-gray-700">Checkboxes</span> */}

                        <div className="mt-2">
                          <div>
                            {rows.waitlists.map((spec) => (
                              <div>Waitlisted for Lot no.: {spec.lotId}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-2 border-light-blue-500">
                      <div className="block">
                        {/* <span className="text-gray-700">Checkboxes</span> */}

                        <div className="mt-2">
                          <div>
                            {rows.bookings.map((book) => (
                              <div className="border-4 p-2	">
                                <div>ID: {book.id}</div>
                                <div>Slot Alloted: {book.slotId}</div>
                                <div>Lot Alloted: {book.lotId}</div>
                                <div>Date: {book.date}</div>
                                <div>Date of Booking: {book.dateOfBooking}</div>
                                <div>Hours: {book.hours}</div>
                                <div>Cost: {book.cost}</div>
                                <div>Services: {book.services}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-2 border-light-blue-500">{rows.provider.toUpperCase()}</td>
                    {/* <td className="px-4 py-3 border-2 border-light-blue-500 text-lg text-gray-900">
                      {" "}
                      <button
                        type="submit"
                        className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Assign Slot
                      </button>{" "}
                    </td>
                    <td className="px-4 py-3 border-2 border-light-blue-500 text-lg text-gray-900">
                      {" "}
                      <button
                        type="submit"
                        onClick={() => deleteWorkerHandler(rows.id)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Remove Worker
                      </button>{" "}
                    </td>
                    <td className="px-4 py-3 border-2 border-light-blue-500 text-lg text-gray-900">
                      {" "}
                      <button
                        type="submit"
                        className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => editWorkerHandler(rows.id)}
                      >
                        Edit Details
                      </button>{" "}
                    </td> */}
                  </tr>
                ))}
             
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          {/* <button
            onClick={modalHandler}
            className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
          >
            Add Worker
            {showModal && <Modal />}
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default UserData;
