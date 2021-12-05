import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import SlotList from "./SlotList";
import DatePickers from "../DatePicker";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BookSlot(props) {
  const [listOfSlots, setListOfSlots] = useState([]);
  const [lots, setLots] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [date, setDate] = useState();
  const [filters, setFilters] = useState({checkIn: -1, checkOut: -1, date: -1, locationId: -1});
  const [hours, setHoursConverted] = useState("");
  const hourRef = useRef();

  console.log(props)
  useEffect(() => {
    axios({
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      credentials: "same-origin",
      url: "http://localhost:8080/parking/lot",
    }).then((res) => {
      setLots(res.data);
      console.log(res.data);
    });
  }, []);

  const waitLists = (lotId) => {
    
    // localStorage.getItem()
    console.log("ID", props.currentUser.id)
    console.log("ID2", props.currentUser)
    console.log("ID3", props.currentUser)
    axios.get(`http://localhost:8080/parking/waitlist?userId=${props.currentUser.id}&lotId=${lotId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      }
    }).then(res => alert("ADDED TO WAITLIST!"))
  }

  const checkboxHandler = (e, id) => {
    setListOfSlots((prevState) => {
      const newState = [...prevState];
      newState[id] = !newState[id];
      return newState;
    });
    // console.log(listOfSlots)
  };
  
  const hourHandler = (e) => {
      e.preventDefault();
      const f = hourRef.current;
      if(parseInt(f['checkIn'].value) >= parseInt(f['checkOut'].value)){
        // alert(f['checkIn'].value >= f['checkOut'].value)
          alert('Please enter valid checkin and checkout!!')
          return;
      }
      const times = {
        checkIn: f['checkIn'].value,
        checkOut: f['checkOut'].value,
      }
      console.log(times);
      console.log(date);
      // setFilters({...times, date: date});
      setFilters(prevState => {
        return {...prevState, ...times, date: date}
      })
  }

  const cityHandler = (id) => {
    setFilters(prevState => {
      return {...prevState, locationId: id}
    })
  }
  return (
    <div className="bg-white">
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* MOBILE VIEW CODE AT BOTTOM */}
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Book your Slot
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Enter Date
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <DatePickers setDates={setDate} />
                      {/* {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))} */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Enter Time
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <form name="hourFilter" ref={hourRef} onSubmit={hourHandler}>
                      <div className="py-2">
                        <label for="checkIn">Check In</label>
                        <span> </span>
                        <input
                          type="number"
                          name="checkIn"
                          min="0"
                          max="22"
                          id="checkIn"
                          className="px-2 py-2"
                        />
                        <label for="checkOut">Check Out</label>
                        <input
                          type="number"
                          name="checkOut"
                          min="1"
                          max="23"
                          id="checkOut"
                          className="px-2 py-2"
                        />
                        <button type="submit">➡️</button>
                      </div>
                    </form>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}

              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                <div class="block">
                  <span class="text-gray-700">Cities</span>
                  <div class="mt-2">
                    {lots &&
                      lots.map((el) => (
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name="cities"
                              value={el.id}
                              onChange={() => cityHandler(el.id)}
                              // checked
                            />
                            <span className="ml-2">{el.location}</span>
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                  <SlotList filters={filters}/>
                  
                </div>
                {/* /End replace */}
                Cannot see your slot? <button onClick={() => waitLists(filters.locationId)}>Click here</button> to join waitlist for this parking lot
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="ml 20">
        {" "}
        <button
          style={{
            position: "relative",

            down: "230px",
            left: "150px",
          }}
          type="submit"
          className="ml 50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
    </div>
  );
}

{
  /* Filters */
}
{
  /* <form className="mt-4 border-t border-gray-200" >
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <div>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </form> */
}

// SLOT ID
// {lots &&
//   lots.map((lot) => (
//     <div>
//       {/* <div>
//       <label class="inline-flex items-center mt-3">
//         <input
//           type="radio"
//           class="form-radio h-5 w-5 text-orange-600"
//         />
//         <span class="ml-2 text-gray-700">{lot.location}</span>
//       </label>
//     </div> */}
//       <Disclosure
//         as="div"
//         key={lot.id}
//         className="border-b border-gray-200 py-6"
//       >
//         {({ open }) => (
//           <div>
//             <h3 className="-my-3 flow-root">
//               <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
//                 <span className="font-medium text-gray-900">
//                   {lot.location}
//                 </span>
//                 <span className="ml-6 flex items-center">
//                   {open ? (
//                     <MinusSmIcon
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                   ) : (
//                     <PlusSmIcon
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                   )}
//                 </span>
//               </Disclosure.Button>
//             </h3>
//             <Disclosure.Panel className="pt-6">
//               <div className="space-y-4">
//                 {lot &&
//                   lot.parkingSlotList &&
//                   lot.parkingSlotList.map(
//                     (option, optionIdx) => (
//                       <div
//                         key={option.value}
//                         className="flex items-center"
//                       >
//                         <input
//                           id={`filter-${lot.id}-${optionIdx}`}
//                           name={`${lot.id}`}
//                           defaultValue={option.id}
//                           type="checkbox"
//                           onChange={(e) =>
//                             checkboxHandler(e, option.id)
//                           }
//                           defaultChecked={option.checked}
//                           className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
//                         />
//                         <label
//                           htmlFor={`filter-${lot.id}-${optionIdx}`}
//                           className="ml-3 text-sm text-gray-600"
//                         >
//                           {option.id}
//                         </label>
//                       </div>
//                     )
//                   )}
//               </div>
//             </Disclosure.Panel>
//           </div>
//         )}
//       </Disclosure>
//     </div>
//   ))}
