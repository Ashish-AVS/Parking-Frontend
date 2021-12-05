import React, { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

const showHoursUti = (date, hours) => {
  let d = parseInt(date.substr(8));
  // HAVE TO CONVERT THIS
};
const Userdashboard = () => {
  const [rows, setRows] = useState([
    {
      bookingstatus: "Booked",
      parkingspace: "P-1",
      Parkingslot: "5-6",
      cost: "25$",
      id: 1,
    },
  ]);
  const [workerRating, setWorkerRating] = useState([]);
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        setResponseData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // const showWorkerRating = (services) => {
  //   if (services !== null) {
  //     let ids = services.split(",").map(Number);
  //     let finalRatings = [];
  //     ids.map((id) => {
  //       axios
  //         .get(`http://localhost:8080/worker/`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  //           },
  //         })
  //         asdadasasddas
  //         .then((res) => {
  //           finalRatings.push({
  //             slotId: slotId,
  //             name: res.data.workerName,
  //             rating: res.data.rating,
  //           });
  //           console.log(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     });
  //     console.log("FRom rating", finalRatings);
  //     setWorkerRating(prevState => [...prevState, ...finalRatings]);
  //     return finalRatings;
  //   }
  //   let _ = [];
  //   return _;
  // };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Hello {responseData && responseData["name"]}
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Lot ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Slot ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Date of Slot
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Date of Booking
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Hours Booked
                </th>
                {/* <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Rate Worker
                </th> */}
              </tr>
            </thead>
            <tbody>
              {responseData &&
                responseData.bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-3">{booking.lotId}</td>
                    <td className="px-4 py-3">{booking.slotId}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.dateOfBooking}</td>
                    <td className="px-4 py-3">{booking.hours}</td>
                    {/* <td className="px-4 py-3">
                      {workerRating &&  workerRating.map((rating) => {
                          if(rating.id === booking.slotId){
                            return (
                              <span>
                          {alert("asdsd")}
                          {rating.name}
                          <br />
                          {rating.rating}
                        </span>
                            )
                          }
                      })}
                    </td> */}
                  </tr>
                ))}
              {/* {rows.map((rows) => (
                <tr key={rows.id}>
                  <td className="px-4 py-3">{rows.bookingstatus}</td>
                  <td className="px-4 py-3">{rows.parkingspace}</td>
                  <td className="px-4 py-3">{rows.Parkingslot}</td>
                  <td className="px-4 py-3 text-lg text-gray-900">{rows.cost}</td>

                  <td className="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      classNameName="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modify Booking
                    </button>{" "}
                  </td>
                </tr>
              ))} */}

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
        </div>
      </div>
    </section>
  );
};

export default Userdashboard;
