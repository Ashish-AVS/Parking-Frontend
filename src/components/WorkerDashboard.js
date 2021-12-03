import React, { useRef } from "react";
import { useState } from "react";
// import workerdaspop from "./WorkerDashPop";
import axios from 'axios';
// import { buildQueries } from "@testing-library/dom";
// import WorkerDashPop from "./WorkerDashPop";
// import SlotList from "./SlotList";
// import DatePickers from "../DatePicker";

const Worker_dashboard = () => {
  const [pop, setPop] = useState({service: "", cost: ""});
  const formRef = useRef();
  // axios.get("http://localhost:8080/worker")
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const i = formRef.current;
    const currentData = {
      service: i["car-services"].value,
      cost: i["cost"].value,
    };
    setPop(currentData);
    console.log(currentData);
  };
  const filters = [
    {
      id: "color",
      name: "Services",
      options: [
        { value: "white", label: "Car Wash", checked: false },
        { value: "beige", label: "Repair Check", checked: false },
        { value: "blue", label: "Tyre Filling", checked: true },
      ],
    },
    {
      id: "category",
      name: "Cost",
      options: [
        { value: "new-arrivals", label: "$2.5", checked: true },
        { value: "new-arrivals", label: "$5", checked: false },
        { value: "new-arrivals", label: "$7.5", checked: false },
        { value: "new-arrivals", label: "$10", checked: false },
      ],
    },
    //   {
    //     id: 'size',
    //     name: 'Size',
    //     options: [
    //       { value: '2l', label: '2L', checked: false },
    //       { value: '6l', label: '6L', checked: false },
    //       { value: '12l', label: '12L', checked: false },
    //       { value: '18l', label: '18L', checked: false },
    //       { value: '20l', label: '20L', checked: false },
    //       { value: '40l', label: '40L', checked: true },
    //     ],
    //   },
  ];

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "40%",
          width: "150px",
          height: "200px",
        }}
      >
        <form ref={formRef} onSubmit={formSubmitHandler}>
          <label
            for="services"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Choose a service :
          </label>
          <input list="car-services" id="services" name="car-services" />

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
          >
            <br></br>
            <br></br>Enter Cost : <br></br>{" "}
          </label>
          <input type="number" id="cost" min="0" max="15" name="cost" />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>

      <div
        style={{
          position: "absolute",
          top: "75%",
          left: "0%",
          width: "100%",
          height: "200px",
        }}
      >
        <div class="lg:w-2/3  mx-auto overflow-auto">
          <table class="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Service Chosen
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-3">Car Wash</td>
                <td class="px-4 py-3">7</td>

                {/* <td class="w-10 text-center">
              <input name="plan" type="radio"/>
            </td> */}
              </tr>

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
      </div>
    </div>
  );
  //console.log(carservices)
};

export default Worker_dashboard;
// {filters.map((section) => (
//   <Disclosure
//     as="div"
//     key={section.id}
//     className="border-t border-gray-200 px-4 py-6"
//   >
//     {({ open }) => (
//       <>
//         <h3 className="-mx-2 -my-3 flow-root">
//           <Disclosure.Button className="px-2 py-3 bg-white   justify-between text-gray-400 hover:text-gray-500">
//             <span className="font-medium text-gray-900">
//               {section.name}
//             </span>
//             <span className="ml-6 flex items-center">
//               {open ? (
//                 <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
//               ) : (
//                 <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
//               )}
//             </span>
//           </Disclosure.Button>
//         </h3>

//         <Disclosure.Panel className="pt-6">
//           <div className="space-y-6">
//             {section.options.map((option, optionIdx) => (
//               <div key={option.value} className="flex items-center">
//                 <input
//                   id={`filter-mobile-${section.id}-${optionIdx}`}
//                   name={`${section.id}[]`}
//                   defaultValue={option.value}
//                   type="radio"
//                   defaultChecked={option.checked}
//                   className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label
//                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                   className="ml-3 min-w-0 flex-1 text-gray-500"
//                 >
//                   {option.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </Disclosure.Panel>
//       </>
//     )}
//   </Disclosure>
// ))}
