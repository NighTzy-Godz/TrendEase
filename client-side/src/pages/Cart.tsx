import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../components/cart/CartCard";
import "../assets/css/pages/cart.css";

import Button, { ButtonSize } from "../components/common/Button";
import ButtonLink from "../components/common/ButtonLink";
import PaddedPage from "../components/containers/PaddedPage";
import { setCheckoutItems } from "../store/slices/checkout";
import EmptyCart from "../components/cart/EmptyCart";
import { State } from "../store/store";

import { CartData } from "../interfaces/cart";
import { getUserCart } from "../store/slices/cart";

function Cart() {
  const userCart = useSelector((state: State) => state.entities.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const handleCartCheckout = () => {
    const cartItems = userCart.map((cart: CartData) => {
      const { item: productDtl, quantity } = cart;
      const checkoutItems = {
        product: productDtl,
        quantity,
        price: productDtl.price,
        productOwner: productDtl.owner,
      };
      return checkoutItems;
    });

    dispatch(setCheckoutItems(cartItems));
  };

  const renderCart = userCart?.map((cart: CartData) => {
    return (
      <React.Fragment key={cart._id}>
        <CartCard data={cart} />
      </React.Fragment>
    );
  });

  if (userCart.length === 0) return <EmptyCart />;

  return (
    <PaddedPage className="cart">
      <div className="container">
        <h3 className="cart_header">Your Cart</h3>
        {renderCart}

        <div className="divider" />

        <div className="cart_checkout">
          <ButtonLink
            size={ButtonSize.MEDIUM}
            className="primary"
            handleClick={handleCartCheckout}
            path="/checkout"
          >
            Checkout
          </ButtonLink>
        </div>
      </div>
    </PaddedPage>
  );
}

export default Cart;
