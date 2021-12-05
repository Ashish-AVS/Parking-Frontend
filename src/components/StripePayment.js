import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import Alert from "react-s-alert";
import StripeCheckout from "react-stripe-checkout";

// https://senuravihanjayadeva.medium.com/credit-card-payments-with-stripe-using-spring-boot-and-reactjs-3e57a12418b7
function StripePayment(props) {
  const [recieptURL, setRecieptURL] = React.useState();
  console.log(props);
  const amountRef = React.useRef();
  const fastagHandler = () => {
    const postData = {
      amount: amountRef.current.value,
      receiptEmail: props.email,
      currency: "INR",
    };
    axios
      .post(`http://localhost:8080/api/stripe/charge`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        Alert.success("Payment Done successfully!");
        setRecieptURL(res.data.receipt_url);
        axios
          .get(
            `http://localhost:8080/addbalance?amount=${amountRef.current.value}&id=${props.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
              },
            }
          )
          .then((res) =>
            Alert.success(
              `Balance added successfully, your current balance is ${res.data.fastTag}`
            )
          );
        console.log(res);
      });
  };
  async function handleToken(token) {
    console.log(token);
    await axios
      .post("http://localhost:8080/api/payment/charge", "", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          token: token.id,
          amount: 500,
          currency: "INR",
        },
      })
      .then(() => {
        alert("Payment Success");
      })
      .catch((error) => {
        Alert.success("Payment Done Successfully");
      });
  }
  return (
    <div className="App">
      <span className="border-4	">
        <input
          placeholder=" Amount"
          type="number"
          min="1"
          max="10000"
          ref={amountRef}
        />
      </span>
      <span onClick={fastagHandler}>
        <Stripe
          stripeKey="pk_test_51K2RXcSFlRY3Q4ax8De4mVN8l2URKt9jyiONWkUJbHSJ28aQvZ1bO6yEeoBMkocmYvSWU66DdZsswqvJBiREPzFq00H7iI6yqj"
          token={handleToken}
        />
      </span>
      {
        recieptURL ? <div>
        <a href={recieptURL}>Click here to view your payment reciept</a>
        </div> : null
      }
    </div>
  );
}
export default StripePayment;
