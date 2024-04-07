import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../reducer/cartSlice";
import "./cart.css";
import Header from "./header";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    return {
      totalItems: cart.reduce((total, item) => total + item.quantity, 0),
      totalAmount: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };
  };

  const { totalItems, totalAmount } = getTotal();

  return (
    <>
      <Header />
      <div className="cart-container">
        <h3 className="head-cart">Shopping Cart</h3>
        {/* <div className="flex-container"> */}
        {cart.length > 0 ? (
          <div className="container-rest-cart">
            {cart.map((item) => (
              <div className="rest-card-cart" key={item._id}>
                <div className="rest-box-cart">
                  <h3 className="rest-title">{item.title.slice(0, 20)}</h3>
                  <img src={item.image} alt={item.title} />
                  <p>{item.category}</p>
                  <p>{item.description.slice(0, 10)}</p>
                  <p className="price">Price: {item.price}</p>
                  <p>
                    Quantity: <span className="bold">{item.quantity}</span>
                  </p>
                  <div className="button-func">
                    <button
                      className="button-dec"
                      onClick={() => dispatch(decrementQuantity(item))}
                    >
                      -
                    </button>
                    <button
                      className="button-inc"
                      onClick={() => dispatch(incrementQuantity(item))}
                    >
                      +
                    </button>
                    <button
                      className="button-rem"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-cart">Your cart is empty</p>
        )}

        {cart.length > 0 && (
          <div className="total-cart">
            <p>Total items: {totalItems}</p>
            <p>Total amount: {totalAmount.toFixed(2)}</p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="checkout-button-container">
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
