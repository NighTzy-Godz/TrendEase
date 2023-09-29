import React, { useEffect, useState } from "react";
import PaddedPage from "../components/containers/PaddedPage";
import "../assets/css/pages/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import paymentOption from "../data/paymentOption";
import PaymentCard from "../components/checkout/PaymentCard";
import CheckoutItem from "../components/checkout/CheckoutItem";
import { toast } from "react-toastify";
import Divider from "../components/common/Divider";
import PaymentDetails from "../components/checkout/PaymentDetails";
import Button, { ButtonSize } from "../components/common/Button";
import formatCurrency from "../utils/formatCurrency";
import { addOrder, setSubmitted } from "../store/slices/checkout";

const SHIPPING_FEE = 40;
const TAX = 0.012;
import { State } from "../store/store";
import paymentDetails from "../utils/paymentDetails";
import getUserAddress from "../utils/getUserAddress";
import { resetCart } from "../store/slices/cart";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const userAddress = useSelector(
    (state: State) => state?.entities?.auth?.decodedUser?.address
  );
  const checkoutItems = useSelector(
    (state: State) => state?.entities?.checkout?.checkoutItems
  );
  const paymentMethod = useSelector(
    (state: State) => state?.entities?.checkout?.paymentMethod
  );

  const { error } = useSelector((state: State) => state?.entities?.checkout);

  const { merchandiseTotal, totalTax, totalOrderAmount } = paymentDetails({
    checkoutItems,
    TAX,
    SHIPPING_FEE,
  });

  useEffect(() => {
    console.log(submitted);
    // console.log(error);
    // console.log(submitted && !error);
    if (submitted && !error) {
      setSubmitted(false);
      dispatch(resetCart(""));
      navigate("/profile/my-orders");
    }
  }, [submitted, error]);

  // NOTE: This is to prevent the user to accidentally accessing the checkout page
  useEffect(() => {
    if (checkoutItems.length === 0) {
      toast.error(
        "You dont have any checkout items at the moment or dont refresh the page",
        {
          autoClose: 3000,
          toastId: "checkout_err",
        }
      );
      return navigate("/cart");
    }
  }, []);

  const renderUserAddress = getUserAddress(userAddress);

  const renderCheckoutItems = checkoutItems.map((item: any) => {
    return (
      <React.Fragment key={item.product._id}>
        <CheckoutItem data={item} />
      </React.Fragment>
    );
  });

  const renderPaymentMethod = paymentOption.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <PaymentCard data={item} />
      </React.Fragment>
    );
  });

  const handleCheckout = () => {
    const newCheckoutItems = checkoutItems.map((item: any) => {
      const { product, quantity, price, productOwner } = item;
      return {
        product: product._id,
        quantity,
        price,
        productOwner,
      };
    });
    const checkoutData = {
      checkoutItems: newCheckoutItems,
      paymentMethod,
      fromCart: true,
    };

    dispatch(addOrder(checkoutData));
    setTimeout(() => {
      setSubmitted(true);
    }, 50);
  };

  return (
    <PaddedPage className="check_out">
      <div className="container">
        <h1>Checkout Page</h1>

        <div className="checkout_address">{renderUserAddress()}</div>
        <Divider />
        <div className="checkout_items">
          <h3>Checkout Items</h3>
          {renderCheckoutItems}
        </div>

        <Divider />
        <div className="checkout_shipping">
          <h3 className="shipping_header">Shipping Method</h3>
          <div className="checkout_shipping_card">
            <div className="checkout_shipping_container">
              <h3>Local Standard</h3>
              <p>P40</p>
            </div>
            <div className="shipping_expected">
              <small>Expected to be delivered for 4-5 days</small>
            </div>
          </div>
        </div>

        <Divider />
        <div className="checkout_payment">
          <h3>Select Your Payment Method</h3>
          <div className="checkout_payment_container">
            {renderPaymentMethod}
          </div>
        </div>

        <Divider />

        <div className="checkout_payment_details">
          <div className="header">
            <h3>Payment Details</h3>
            <small>
              Review all the total with subtotal, tax and shipping fee
            </small>
          </div>

          <PaymentDetails
            title="Merchandise Subtotal"
            data={formatCurrency(merchandiseTotal)}
          />
          <PaymentDetails title="Shipping Fee" data={SHIPPING_FEE} />
          <PaymentDetails title="Tax" data={formatCurrency(totalTax)} />

          <Divider />

          <div className="payment_details_container total_payment">
            <h3>Total Payment</h3>
            <p className="payment_total_price">
              P {formatCurrency(totalOrderAmount)}
            </p>
          </div>

          <div className="checkout_btn">
            <Button
              size={ButtonSize.MEDIUM}
              className="primary"
              handleClick={handleCheckout}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </PaddedPage>
  );
}

export default Checkout;
