import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function SlotList({ filters }) {
  const [showData, setShowData] = useState([]);
  const [resData, setResData] = useState();
  const [services, setServices] = useState();
  const [hourStr, setHourStr] = useState();

  useEffect(() => {
    // axios.get("http://localhost:8080/parking/slot", {headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
    // .then(res => {
    //     res.data.map(slot => {
    //       if(!!slots[slot.id]){
    //         setShowData(prevState => {
    //           const newArr = [...prevState];
    //            newArr.push(slot);
    //            return newArr;
    //         });
    //       }
    //       else{
    //         setShowData(prevState => {
    //           const newArr = [...prevState];
    //            return newArr.filter(finding => finding.id!==slot.id);
    //         });
    //       }
    //     })
    //     console.log(res)

    // filters has checkIn, checkOut, locationId, date
    axios
      .get(`http://localhost:8080/parking/lot/${filters.locationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        setResData(res);
        let slots = [];
        res.data.parkingSlotList.map((slot) => {
          // Convert checkIn checkOut + Date to an ASCII char
          let ans = "";
          for (let i = filters.checkIn; i < filters.checkOut; i++) {
            let td = new Date();
            const d = td.getDate();
            let dateDiff = (filters.date - d) * 24;
            // console.log(dateDiff);
            const test = (parseInt(i) + dateDiff + 48).toString();
            const finalCheckIn = String.fromCharCode(test.toString());
            ans = ans + finalCheckIn;
            if (slot.hours.includes(ans)) {
              setHourStr(ans);
              // setShowData(prevState => {
              //   return [...prevState, slot];
              // })
              // hoursConverted.setHoursConverted(ans);
              let flag = true;
              slots.map((s) => {
                if (s.id === slot.id) {
                  flag = false;
                }
              });

              if (flag) slots.push(slot);
            }
          }
          console.log(showData);
        });
        console.log("I AM SLOTSSSS", slots);
        setShowData(slots);
      })
      .catch((err) => console.log(err));
  }, [filters]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slot Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Services Available
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cost Per Hour
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {showData &&
                  showData.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              // src={person.image}
                              src="https://picsum.photos/200/300"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {slot.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {slot.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resData.data.workerList &&
                          resData.data.workerList.map((worker) => (
                            <div>
                              {worker.specialisations &&
                                worker.specialisations.map((spec) => (
                                  <div className="text-sm text-gray-900">
                                    {spec.specialityName} : ₹
                                    {spec.costOfSpeciality}
                                  </div>
                                ))}
                            </div>
                          ))}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {/* Active */} AVAILABLE
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {person.role} */} {slot.cost ? slot.cost : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={{
                            pathname: "/bill",
                            billProps: {
                              filters: filters,
                              slotId: slot.id,
                              hoursConverted: hourStr
                            },
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Book Now
                        </Link>
                      </td>
                    </tr>
                  ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
