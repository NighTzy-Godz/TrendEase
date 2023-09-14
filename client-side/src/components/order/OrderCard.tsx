import React from "react";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import "./OrderCard.css";

import { OrderData } from "../../interfaces/order";
import OrderCardInfo from "./OrderCardInfo";

interface OrderCardProps {
  data: OrderData;
}

function OrderCard({ data }: OrderCardProps) {
  const { status, totalAmount, item } = data || {};
  const {
    product: { _id: productId, title, images = [] },
    quantity: qty,
  } = item || {};

  return (
    <Link to={`/products/${productId}`} className="order_card">
      <div className="order_card_img">
        <img src={images[0]} alt="" />
      </div>
      <div className="order_card_info">
        <div className="title">
          <p>{title}</p>
        </div>

        <div className="order_info">
          <OrderCardInfo title="Status" data={status} />
          <OrderCardInfo title="Quantity" data={qty} />
        </div>

        <div className="price">
          <h4>P {formatCurrency(totalAmount)}</h4>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
