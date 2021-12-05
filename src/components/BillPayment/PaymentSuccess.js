import { Checkmark } from "react-checkmark";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import Alert from "react-s-alert";

import ContactUs from "../../EmailUtil/email";
import emailjs, { send } from "emailjs-com";
import { Link } from "react-router-dom";

const PaymentSuccess = (props) => {
  const [res, setRes] = React.useState();
  console.log(props.workerId);
  const sendEmail = () => {
    var templateParams = {
      to_name: JSON.parse(localStorage.getItem("signUpRequest")).email,
      from_name: "avsashisha8@gmail.com",
      message_html: `Your Booking has been confirmed and 
      Rs${props.location.billProps.cost} have been debited from your fastag account
       http://localhost:8000/rate/${props.workerId}
      `,
      to_email: JSON.parse(localStorage.getItem("signUpRequest")).email,
    };
    console.log(JSON.parse(localStorage.getItem("signUpRequest")).email);
    emailjs
      .send(
        "service_h9n3vgi",
        "template_h97va4m",
        templateParams,
        "user_fzUGdXTKAZpoQtBvwM2UI"
      )
      .then(
        function (response) {
          Alert.success("Your Booking has been confirmed, check your email");
          setRes(response);
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  useEffect(() => {
    sendEmail();
  }, []);
  // console.log(props);
  // console.log(props.location.billProps.cost);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="align-middle py-8 my-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between ">
        <Checkmark size="xxLarge" />
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl p-7	">
          <span className="block">
            Payment Successful of Rs
            {props.location.billProps.cost}
          </span>
          <span className="block text-indigo-600">
            Thank You For Using our Services!
          </span>
        </h2>
        <Confetti />
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 ">
          <div className="inline-flex  rounded-md shadow">
            <Link to={`http://localhost:3000/rate/${props.workerId}`}>
              Please Rate Your Experience (Link in mail)
            </Link>
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
