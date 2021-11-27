import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal/Modal";
import { ACCESS_TOKEN } from "../constants";

const WorkerList = () => {
  const [workers, setWorkers] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // axios.get("http://localhost:8080/worker").then(res => console.log(res));
    axios({
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      },
      credentials: "same-origin",
      url: "http://localhost:8080/worker",
    }).then((res) => {
      setWorkers(res.data);
      console.log(res.data);
    });
  }, []);

  const modalHandler = () => {
    setShowModal(prevState => !prevState)
  }
  const deleteWorkerHandler = (id = -1) => {
    axios
      .delete(`http://localhost:8080/worker/${id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
      .then(() => alert("Worker Deleted Successfully!"));
  };

  const editWorkerHandler = (id = -1) => {
    alert("WORK IN PROGRESS")
    axios
      .put(`http://localhost:8080/worker/${id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
      .then(() => alert("Worker Deleted Successfully!"));
  };

  const [rows, setRows] = useState([
    { Name: "RK Singh", Email: "rk567@gmail.com", Rating: "4.8", id: 1 },
    { Name: "Rahul Kumar", Email: "rahul989@gmail.com", Rating: "4.5", id: 2 },
    {
      Name: "Vijay Sharma",
      Email: "sharmavijay67@gamil.com",
      Rating: "4",
      id: 3,
    },
    { Name: "Ghanshyam Lal", Email: "gl667@gamil.com", Rating: "4.7", id: 4 },
    {
      Name: "Rohan Das",
      Email: "naughtyrohan69@gmail.com",
      Rating: "3.5",
      id: 5,
    },
    {
      Name: "Chandu Patel",
      Email: "theogpatel789@gamil.com",
      Rating: "4.3",
      id: 6,
    },
    { Name: "Suliaman Benn", Email: "sulia420@gmail.com", Rating: "5", id: 7 },
  ]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Workers List
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto ">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Rating
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Specializations
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Allot Lot
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Remove
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit Details
                </th>
              </tr>
            </thead>
            <tbody>
              {workers && workers.map((rows) => (
                <tr key={rows.id}>
                  <td className="px-4 py-3 ">{rows.id}</td>
                  <td className="px-4 py-3 ">{rows.workerName}</td>
                  <td className="px-4 py-3">{rows.email}</td>
                  <td className="px-4 py-3">{rows.rating}</td>
                  {/* <label for="cars">Choose a car:</label> */}
                  <td className="px-4 py-3">
                    <div className="block">
                      {/* <span className="text-gray-700">Checkboxes</span> */}

                      <div className="mt-2">
                        <div>
                          {rows.specialisations.map((spec) => (
                            <div>
                              {/* <div class="rounded-full py-3 px-6">Pill Shape</div> */}
                              {spec.specialityName && (
                                <span>
                                  <span className="text-xs">
                                    {spec.specialityName}
                                  </span>
                                  <span className="text-xs">
                                    : ${spec.costOfSpeciality}
                                  </span>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* <div>
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Car Wash</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Repair Check</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Tyre Filling</span>
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Assign Slot
                    </button>{" "}
                  </td>
                  <td className="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      onClick={() => deleteWorkerHandler(rows.id)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Remove Worker
                    </button>{" "}
                  </td>
                  <td className="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => editWorkerHandler(rows.id)}
                    >
                      Edit Details
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
          onClick={modalHandler}
          className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
            Add Worker
            {showModal && <Modal />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkerList;
