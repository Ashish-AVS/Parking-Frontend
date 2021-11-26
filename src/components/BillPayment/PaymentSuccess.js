import { Checkmark } from "react-checkmark";
import React from 'react'
const PaymentSuccess = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="align-middle py-8 my-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between ">
        <Checkmark size="xxLarge" />
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl p-7	">
          <span className="block">Payment Successful</span>
          <span className="block text-indigo-600">
            Thank You For Using our Services!
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 ">
          <div className="inline-flex  rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Rate Your Experience
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow"></div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
/**
 * git add .
 * git commit -m "Add Modal"
 * git push
 */