/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { ACCESS_TOKEN } from "../../constants";
import Alert from "react-s-alert";
import emailjs, { send } from "emailjs-com";

export default function Modal() {
  const [open, setOpen] = useState(true);
  const [submitData, setSubmitData] = useState();
  const formRef = useRef();
  const cancelButtonRef = useRef(null);

  const sendEmail = (creds) => {
    const cform = formRef.current;
    var templateParams = {
      to_name: creds.name,
      from_name: "Ashish from Car Parking",
      message_html: `Your worker account has been created and here are your credentials: 
      Name: ${creds.name}
      email: ${creds.email}
      password: ${creds.password}
      role: ${creds.role}
      specialityName: ${cform["specialisation"].value}
      costOfSpeciality : ${cform["costOfSpecialisation"].value}
      `,
      to_email: creds.email,
    };
    console.log(JSON.parse(localStorage.getItem("signUpRequest")).email);
    emailjs
      .send(
        "service_qxtm9vb",
        "template_991y18o",
        templateParams,
        "user_6EQ7Z33fScvA2jBgbiP5i"
      )
      .then(
        function (response) {
          Alert.success("Email sent successfully to worker");
          // setRes(response);
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const cform = formRef.current;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    };
    const data = {
      workerName: cform["workerName"].value,
      email: cform["workerEmail"].value,
      phoneNumber: cform["phoneNumber"].value,
    };
    const loginData = {
      name: cform["workerName"].value,
      email: cform["workerEmail"].value,
      password: cform["workerPassword"].value,
      role: "WORKER",
    };
    axios
      .post("http://localhost:8080/auth/signup", loginData)
      .then((res) => {
        Alert.success(
          "Worker added successfully, and auth details have been sent to worker's email"
        );
        console.log("Worker Added", res);
        axios
          .post("http://localhost:8080/worker/add", data, { headers: headers })
          .then((res) => {
            setSubmitData(res);
            axios
              .put(
                `http://localhost:8080/worker/${res.data.id}/addSpecialisation`,
                {
                  specialityName: cform["specialisation"].value,
                  costOfSpeciality: cform["costOfSpecialisation"].value,
                },
                { headers: headers }
              )
              .then((res) => {
                Alert.success("Specialisation Added");
                console.log(res);
                // sendEmail(loginData);
              })
              .catch((error) => console.log(error));
            axios
              .put(
                `http://localhost:8080/worker/${res.data.id}/addParking/${cform["lot"].value}`,
                {noth:"a"},
                { headers: headers }
              )
              .then((res) => {
                Alert.success("Added to lot");
                console.log(res);
                // sendEmail(loginData);
              })
              .catch((error) => console.log(error));
            console.log(res);
          })
          .catch((error) => console.log(error));
        sendEmail(loginData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <form onSubmit={submitHandler} ref={formRef}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Add Worker
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <div>
                            <div>
                              <div>
                                <label>Worker Email</label>
                              </div>
                              <input type="email" name="workerEmail" />
                            </div>
                            <div>
                              <div>
                                <label>Worker Name</label>
                              </div>
                              <input type="text" name="workerName" />
                            </div>
                            <div>
                              <div>
                                <label>Worker Password</label>
                              </div>
                              <input type="password" name="workerPassword" />
                            </div>
                            <div>
                              <div>
                                <label>Worker Phone Number</label>
                              </div>
                              <input type="text" name="phoneNumber" />
                            </div>
                            <div>
                              <div>
                                <label>Worker Specialisation</label>
                              </div>
                              <input type="text" name="specialisation" />
                            </div>
                            <div>
                              <div>
                                <label>Specialisation cost</label>
                              </div>
                              <input type="text" name="costOfSpecialisation" />
                            </div>
                            <div>
                              <div>
                                <label>Parking Space</label>
                              </div>
                              <input type="text" name="lot" />
                            </div>
                          </div>
                        </p>
                      </div>

                      {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Add Worker
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
