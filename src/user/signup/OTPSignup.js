import React, { useState } from "react";
import { signup } from "../../util/APIUtils";
import Alert from "react-s-alert";
import ContactUs from "../../EmailUtil/email";
import emailjs, { send } from "emailjs-com";

export default function OTPSignup() {
  const [otp, setOtp] = useState();
  const [mailotp, setMailOtp] = useState(Date.now().toString());
  const [toggle, setToggle] = useState("send");

  const sendEmail = () => {
    var templateParams = {
      to_name: JSON.parse(localStorage.getItem("signUpRequest")).email,
      from_name: "avsashisha8@gmail.com",
      message_html: `${mailotp}`,
      to_email: JSON.parse(localStorage.getItem("signUpRequest")).email
    };
    console.log(JSON.parse(localStorage.getItem("signUpRequest")).email)
    emailjs
      .send(
        "service_h9n3vgi",
        "template_63zxu6p",
        templateParams,
        "user_fzUGdXTKAZpoQtBvwM2UI"
      )
      .then(
        function (response) {
          Alert.success("Check your entered email")
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  };

  const signupHandler = (e) => {
    e.preventDefault();

    if (otp === mailotp) {
      const signUpRequest = localStorage.getItem("signUpRequest");
      console.log("LOCAL");

      signup(JSON.parse(signUpRequest))
        .then((response) => {
          Alert.success(
            "You're successfully registered. Please login to continue!"
          );
          this.props.history.push("/login");
        })
        .catch((error) => {
          Alert.error(
            (error && error.message) ||
              "Oops! Something went wrong. Please try again!"
          );
        });
    }
  };
  const otpHandler = () => {
      sendEmail();
  }
  return (
    <div className="m-20 my-7">
      {/* <ContactUs otp={Date.now()}/> */}
      <div className="mt-10 sm:mt-0">
        <div className=" md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-10 col-span-3 align-middle">
            <h3 className=" text-center font-sans font-bold ">Sign Up</h3>
            {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
          </div>
          <div className="mt-5 md:mt-0 md:col-span-5">
            <form onSubmit={signupHandler}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div> */}

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        OTP
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <button onClick={otpHandler}>Get OTP</button>

                    <button type="submit">Submit</button>
                    {/* <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className=" block text-sm font-medium text-gray-700">
                         Username
                        </label>
                        <input
                          type="email"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                         Confirm Password
                        </label>
                        <input
                          type="password"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                          <option>Japan</option>
                        </select>
                      </div>
  
                      
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
   */}
                    {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div> */}

                    {/* <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                         Car Registration Number
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                         Email
                        </label>
                        <input
                          type="email"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                         Phone Number
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                    </div>
                  </div> */}
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
