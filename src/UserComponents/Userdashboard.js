import React, { useState } from "react";
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
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Hello User
          </h1>
        </div>
        <div class="lg:w-2/3 w-full mx-auto overflow-auto">
          <table class="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Booking Status
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Parking Space
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Parking Slot
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rows) => (
                <tr key={rows.id}>
                  <td class="px-4 py-3">{rows.bookingstatus}</td>
                  <td class="px-4 py-3">{rows.parkingspace}</td>
                  <td class="px-4 py-3">{rows.Parkingslot}</td>
                  <td class="px-4 py-3 text-lg text-gray-900">{rows.cost}</td>
                  {/* <td class="w-10 text-center">
              <input name="plan" type="radio"/>
            </td> */}

                  <td class="px-4 py-3 text-lg text-gray-900">
                    {" "}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modify Booking
                    </button>{" "}
                  </td>
                </tr>
              ))}

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
        </div>
      </div>
    </section>
  );
};

export default Userdashboard;
