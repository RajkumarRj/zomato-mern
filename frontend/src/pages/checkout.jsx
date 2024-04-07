import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../reducer/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import useRazorpay from "react-razorpay";
import { address } from "faker/lib/locales/az";

const Checkout = () => {
  const [Razorpay] = useRazorpay();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState(null);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderAmount = getTotal() * 100;

    const options = {
      key: "rzp_test_XYGh7eEb6MhWXi",
      amount: orderAmount,
      currency: "INR",
      name: "Zomato",
      description: "Payment for order",
      handler: async (response) => {
        console.log("Razorpay payment response:", response);
        try {
          const { razorpay_payment_id } = response;
          alert("Payment successful!");
          dispatch(clearCart());
          navigate("/");
        } catch (error) {
          console.error("Error processing payment", error);
          setPaymentError("Error processing payment. Please try again.");
        }
      },
      prefill: {
        name: "Rajkumar",
        email: "rajkumar@gmail.com",
      },
      notes: {
        address: shippingAddress,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.error("Razorpay payment failed:", response);
      alert("Payment failed. Please try again.");
    });

    rzp1.open();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make a POST request to your server to process the payment
  //     await axios.post("/api/orders", {
  //       cart,
  //       shippingAddress,
  //       paymentMethod,
  //     });
  //     // Clear the cart after successful payment
  //     dispatch(clearCart());
  //     // Redirect the user to a success page or display a success message
  //     // history.push("/success");
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     // Display an error message to the user
  //   }
  // };

  const handleBack = () => {
    navigate("/cart");
  };

  return (
    <div className="checkout-container">
      <h2 className="check-title">Checkout</h2>
      <div className="cart-summary">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
            </div>
          </div>
        ))}
        <div className="total">
          <p>Total: {getTotal().toFixed(2)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <label htmlFor="shipping-address">Shipping Address:</label>
          <input
            type="text"
            id="shipping-address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="payment-method">Payment Method:</label>
          <input
            type="text"
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <div className="check-button">
          <button className="check-back" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="checkout-button">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
