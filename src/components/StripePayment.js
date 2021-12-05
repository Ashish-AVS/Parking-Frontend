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
        console.log("RESPONSE", res);
        console.log("Reciept", res.data.receipt_url);
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
          .then((res) => console.log(res));
        console.log(res);
      });
  };
  async function handleToken(token) {
    console.log(token);
    const data = {
      amount: amountRef.current.value,
      receiptEmail: props.email,
    };
    await axios
      .post("http://localhost:8080/api/payment/charge", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          token: token.id,
          amount: amountRef.current.value,
          currency: "INR",
        },
      })
      .then((res) => {
        console.log("LETS GOOOO", res);
        console.log("LETS GOOOO PARSED", JSON.parse(res.data));
        setRecieptURL(JSON.parse(res.data.receipt_url));
        fastagHandler();
        Alert.success("Payment Done successfully!");
        Alert.success(
          `Balance added successfully to your fastag`
        );
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
      <span>
        <Stripe
          stripeKey="pk_test_51K2RXcSFlRY3Q4ax8De4mVN8l2URKt9jyiONWkUJbHSJ28aQvZ1bO6yEeoBMkocmYvSWU66DdZsswqvJBiREPzFq00H7iI6yqj"
          token={handleToken}
        />
      </span>
      {recieptURL ? (
        <div>
          <a href={recieptURL}>Click here to view your payment reciept</a>
        </div>
      ) : null}
    </div>
  );
}
export default StripePayment;
