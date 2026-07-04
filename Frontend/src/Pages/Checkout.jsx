import "../Styles/Checkout.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const mockCartItems = [
  {
    _id: "1",
    title: "Peaceful Waters",
    category: ["Abstract", "Spiritual"],
    availableSizes: ["A3", "24x36"],
    price: 3800,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    quantity: 1,
    cartId: "cart-1",
  },
  {
    _id: "2",
    title: "Minimalist Geometry",
    category: ["Minimalist", "Modern"],
    availableSizes: ["A4", "A3", "18x24"],
    price: 3800,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    quantity: 1,
    cartId: "cart-2",
  },
];

export function CheckoutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    paymentMethod: "cash",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.cartId !== cartId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (cartId, change) => {
    setCartItems((prev) => {
      const updatedCart = prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    console.log("Cart and orders cleared");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const id = localStorage.getItem("visitorId") || "";

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is empty",
        text: "Please add items before placing an order.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const customer = {
          name: checkoutData.fullName,
          email: checkoutData.email,
          phone: checkoutData.phone,
          street: checkoutData.streetAddress,
          district: checkoutData.city,
        };

        const payment = {
          method: checkoutData.paymentMethod, // matches schema
          status: "pending",
        };

        const productIds = cartItems.map((item) => item._id);

        try {
          setOrderPlaced(true);

          // Send order to backend
          await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/setOrders`, {
            customer,
            products: productIds,
            payment: {
              method: checkoutData.paymentMethod, // ✅ matches schema
              status: "pending",
            },
            visitorId: id,
          });

          // Clear cart state
          setCartItems([]);
          localStorage.removeItem("cart");
          localStorage.removeItem("orders");

          setOrderPlaced(false);

          // Reset checkout form
          setCheckoutData({
            fullName: "",
            email: "",
            phone: "",
            streetAddress: "",
            city: "",
            postalCode: "",
            paymentMethod: "cash",
          });

          Swal.fire(
            "Order Placed!",
            "Your order has been successfully placed.",
            "success",
          );

          navigate("/");
        } catch (err) {
          setOrderPlaced(false);
          Swal.fire({
            icon: "error",
            title: "Order Failed",
            text:
              err.response?.data?.message ||
              "Something went wrong. Please try again.",
          });
          console.error("Error placing order:", err);
        }
      }
    });
  };
  const formatNPR = (price) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setCartItems(savedCart);
    console.log(savedOrders);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="checkout">
        <div className="checkout__container">
          {/* Header */}
          <div className="checkout__header">
            <button onClick={() => navigate(-1)} className="checkout__back-btn">
              <ArrowBackIcon />
            </button>
            <div>
              <h1 className="checkout__title">Shopping Cart & Checkout</h1>
              <p className="checkout__subtitle">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                in your cart
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="checkout__empty"
            >
              <ShoppingBagOutlinedIcon className="checkout__empty-icon" />
              <h2 className="checkout__empty-title">Your cart is empty</h2>
              <p className="checkout__empty-text">
                Browse our designs and add some beautiful canvas art to your
                cart
              </p>
              <button
                onClick={() => navigate("/catalog")}
                className="checkout__browse-btn"
              >
                Browse Designs
              </button>
            </motion.div>
          ) : (
            <div className="checkout__content">
              {/* Left Column - Cart Items */}
              <div className="checkout__cart">
                <div className="checkout__cart-header">
                  <h2 className="checkout__section-title">Cart Items</h2>
                  <button onClick={clearCart} className="checkout__clear-cart">
                    Clear Cart
                  </button>
                </div>

                <div className="checkout__cart-items">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.cartId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="cart-item"
                    >
                      <div className="cart-item__image">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>

                      <div className="cart-item__details">
                        <h3 className="cart-item__title">{item.title}</h3>
                        <p className="cart-item__category">
                          {item.category.join(", ")}
                        </p>
                        <p className="cart-item__sizes">
                          Sizes: {item.availableSizes.join(", ")}
                        </p>
                      </div>

                      <div className="cart-item__actions">
                        <div className="cart-item__price">
                          {formatNPR(item.price * item.quantity)}
                        </div>

                        <div className="cart-item__quantity">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="cart-item__quantity-btn"
                          >
                            <RemoveIcon />
                          </button>
                          <span className="cart-item__quantity-value">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="cart-item__quantity-btn"
                          >
                            <AddIcon />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="cart-item__remove"
                        >
                          <DeleteOutlinedIcon />
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column - Order Summary & Form */}
              <div className="checkout__summary">
                {/* Order Summary */}
                <div className="order-summary">
                  <h3 className="order-summary__title">Order Summary</h3>

                  <div className="order-summary__row">
                    <span className="order-summary__label">Subtotal</span>
                    <span className="order-summary__value">
                      {formatNPR(subtotal)}
                    </span>
                  </div>

                  <div className="order-summary__row">
                    <span className="order-summary__label">
                      <LocalShippingOutlinedIcon className="order-summary__icon" />
                      Shipping
                    </span>
                    <span className="order-summary__value">
                      {formatNPR(shipping)}
                    </span>
                  </div>

                  <div className="order-summary__divider"></div>

                  <div className="order-summary__total">
                    <span className="order-summary__total-label">Total</span>
                    <span className="order-summary__total-value">
                      {formatNPR(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="checkout-form">
                  <h3 className="checkout-form__title">Delivery Details</h3>

                  <div className="checkout-form__group">
                    <label htmlFor="fullName" className="checkout-form__label">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={checkoutData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="checkout-form__input"
                      required
                    />
                  </div>

                  <div className="checkout-form__group">
                    <label htmlFor="email" className="checkout-form__label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="checkout-form__input"
                      required
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address (e.g. your@email.com)"
                    />
                  </div>

                  <div className="checkout-form__group">
                    <label htmlFor="phone" className="checkout-form__label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={checkoutData.phone}
                      onChange={handleInputChange}
                      placeholder="+977 98xxxxxxxx"
                      className="checkout-form__input"
                      required
                      pattern="^(97|98)[0-9]{8}$"
                      title="Phone number must start with 97 or 98 and be exactly 10 digits"
                    />
                  </div>

                  <div className="checkout-form__group">
                    <label
                      htmlFor="streetAddress"
                      className="checkout-form__label"
                    >
                      Street Address
                    </label>
                    <input
                      id="streetAddress"
                      name="streetAddress"
                      type="text"
                      value={checkoutData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="checkout-form__input"
                      required
                    />
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__group checkout-form__group--half">
                      <label htmlFor="city" className="checkout-form__label">
                        District
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={checkoutData.city}
                        onChange={handleInputChange}
                        placeholder="District"
                        className="checkout-form__input"
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout-form__group">
                    <label
                      htmlFor="paymentMethod"
                      className="checkout-form__label"
                    >
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={checkoutData.paymentMethod}
                      onChange={handleInputChange}
                      className="checkout-form__select"
                    >
                      {/* <option value="esewa">eSewa</option>
                      <option value="khalti">Khalti</option> */}
                      <option value="cash">Cash on Delivery</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={orderPlaced}
                    className="checkout-form__submit"
                  >
                    {orderPlaced ? (
                      <>
                        <CheckIcon className="checkout-form__submit-icon" />
                        Order Placed!
                      </>
                    ) : (
                      `Place Order - ${formatNPR(total)}`
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
