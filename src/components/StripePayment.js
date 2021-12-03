import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

// https://senuravihanjayadeva.medium.com/credit-card-payments-with-stripe-using-spring-boot-and-reactjs-3e57a12418b7
function App() {
  async function handleToken(token) {
    console.log(token);
    await axios
      .post("http://localhost:8080/api/payment/charge", "", {
        headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          token: token.id,
          amount: 500,
          currency:'INR'
        },
      })
      .then(() => {
        alert("Payment Success");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="App">
      <Stripe
        stripeKey="pk_test_51K2RXcSFlRY3Q4ax8De4mVN8l2URKt9jyiONWkUJbHSJ28aQvZ1bO6yEeoBMkocmYvSWU66DdZsswqvJBiREPzFq00H7iI6yqj"
        token={handleToken}
      />
    </div>
  );
}
export default App;
