import React from "react";
import "./CheckoutItem.css";
import product from "../../store/slices/product";
import formatCurrency from "../../utils/formatCurrency";
import useDeviceWidth from "../../hooks/useDeviceWidth";

interface CheckoutItemData {
  product: Record<string, any>;
  price: number;
  productOwener: string;
  quantity: number;
}

interface CheckoutItemProps {
  data: CheckoutItemData;
}

function CheckoutItem({ data }: CheckoutItemProps) {
  const { product, price, quantity } = data;

  const { deviceWidth } = useDeviceWidth();

  if (deviceWidth < 575)
    return (
      <div className="checkout_item">
        <div className="checkout_item_left">
          <div className="checkout_item_img">
            <img src={product?.images[0]} alt="" />
          </div>
        </div>

        <div className="checkout_item_right">
          <div className="checkout_item_info">
            <div className="top_side">
              <h3>{product.title}</h3>
              <p>{product.category}</p>
            </div>
            <div className="bot_side">
              <p>x{quantity}</p>
            </div>
          </div>
          <div className="checkout_item_price">
            <p>P {formatCurrency(price * quantity)}</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="checkout_item">
      <div className="checkout_item_left">
        <div className="checkout_item_img">
          <img src={product?.images[0]} alt="" />
        </div>
        <div className="checkout_item_info">
          <div className="top_side">
            <h3>{product.title}</h3>
            <p>{product.category}</p>
          </div>
          <div className="bot_side">
            <p>x{quantity}</p>
          </div>
        </div>
      </div>

      <div className="checkout_item_right">
        <div className="checkout_item_price">
          <p>P {formatCurrency(price * quantity)}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
