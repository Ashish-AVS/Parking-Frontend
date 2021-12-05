/* This example requires Tailwind CSS v2.0+ */
// https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4
import { PaperClipIcon } from "@heroicons/react/solid";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "react-s-alert";
import { ACCESS_TOKEN } from "../../constants";

// http://localhost:8080/parking/lot/9
export default function BillDisplay(props) {
  const [val, setVal] = React.useState(props.location.billProps);
  const servicesRef = React.useRef();
  const [labor, setLabor] = React.useState([]);
  const [cost, setCost] = React.useState(
    (parseInt(val.filters.checkOut) - parseInt(val.filters.checkIn)) * 25
  );
  const [workerId, setWorkerId] = React.useState("");
  console.log("Filters", val.filters);
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/parking/lot/${val.filters.locationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        console.log("RESPONSE", res);
        console.log("CONVERTED RES", res.data.workerList);
        setLabor(res.data.workerList);
      })
      .catch((err) => console.log(err));
  }, []);
  const servicesHandler = (e) => {
    e.preventDefault();
    const v = servicesRef.current;
  };
  const workerHandler = (e, workerId, costOfSpeciality) => {
    e.preventDefault();
    Alert.success("Added, " + costOfSpeciality);
    const isChecked = e.target.value;
    console.log(isChecked);
    setCost(
      (prevCost) =>
        prevCost +
        costOfSpeciality *
          (parseInt(val.filters.checkOut) - parseInt(val.filters.checkIn))
    );
    setWorkerId((prevState) => {
      return workerId + "," + prevState
    });
  };
  const bookSlot = (slotCost) => {
    console.log("BOOKING", { cost: cost + slotCost, workers: workerId });
    axios
      .post(
        `http://localhost:8080/parking/bookSlotId?lotId=${val.filters.locationId}&customerId=${props.currentUser.id}&slotId=${val.slotId}&cost=${cost + slotCost}&workerId=${workerId}`,
        {
         hours: val.hoursConverted
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      )
      .then((res) => {
        Alert.success("Slot Booked!");
        console.log("response", res);
      })
      .catch((err) => {
        Alert.error("Error in booking slot, check your console");
        console.log("Slot Error", err);
      });
  };
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-black-900">
          FastTag Balance: {props.currentUser.fastTag}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Remaining Balance after booking:{" "}
          {props.currentUser.fastTag - cost > 0
            ? props.currentUser.fastTag - cost
            : "Insufficient Funds"}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Slot Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {val
                ? parseInt(val.filters.checkOut) - parseInt(val.filters.checkIn)
                : null}{" "}
              hrs
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              SLOT CHARGES PER HOUR
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              25 rs
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              TOTAL SLOT CHARGES
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {" "}
              {val ? cost : null}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Other Services
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Y rs
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              X+Y
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Minimum amount paid
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              100 rs
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Amount Due</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Total-Min
            </dd>
          </div>
          <div className="bg white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Choose Service
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {
                <form ref={servicesRef} onSubmit={servicesHandler}>
                  <label
                    for="services"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  ></label>
                  {console.log("OUT OF LOOP", labor)}
                  {labor &&
                    labor.map((lab, i) => (
                      <div className="m-4">
                        {/* Labor Specialisations */}
                        <div>Worker Name: {lab.workerName}</div>
                        <div>Worker Email: {lab.email}</div>
                        <div>Worker Phone Number: {lab.phoneNumber}</div>
                        <div>Worker Rating: {lab.rating}</div>
                        {lab.specialisations &&
                          lab.specialisations.map((l) => (
                            <div>
                              <label htmlFor={l.specialityName}>
                                {l.specialityName} : {l.costOfSpeciality}
                              </label>
                              <button
                                onClick={(e) =>
                                  workerHandler(e, lab.id, l.costOfSpeciality)
                                }
                              >
                                Add
                              </button>
                            </div>
                          ))}
                      </div>
                    ))}
                  {/* <input list="car-services" id="services" name="car-services" placeholder="Services"/> */}
                  <button
                    type="submit"
                    className="ml 50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Services
                  </button>
                  <datalist id="car-services">
                    <option value=" Plumbing" />
                    <option value=" Taxi" />
                    <option value=" Car Repair" />
                    <option value=" Strawberry" />
                    <option value=" Vanilla" />
                  </datalist>

                  <label
                    for="cost"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  />
                </form>
              }
            </dd>
          </div>
        </dl>
        <br />
        {cost > props.currentUser.fastTag ? (
          <div
            style={{
              position: "relative",
              left: "34%",
            }}
          >
            Insufficient Funds, please add balance to your fastTag account
          </div>
        ) : (
          <button
            style={{
              position: "relative",
              left: "34%",
            }}
            onClick={() =>
              bookSlot(
                (parseInt(val.filters.checkOut) -
                  parseInt(val.filters.checkIn)) *
                  25
              )
            }
            type="submit"
            className="ml 50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link
              to={{
                pathname: "/bill-paymentsuccess",
                billProps: {
                  cost: cost,
                  workerId: workerId
                },
              }}
            >
              Pay Charges
            </Link>
          </button>
        )}

        <br></br>
      </div>
    </div>
  );
}
