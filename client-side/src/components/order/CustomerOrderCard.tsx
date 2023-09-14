import React from "react";
import { OrderData, OrderStatus } from "../../interfaces/order";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import Button, { ButtonSize } from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMySoldOrders, updateOrderStatus } from "../../store/slices/order";
import { UpdateOrderStatusData } from "../../interfaces/order";
import OrderCardInfo from "./OrderCardInfo";
import { State } from "../../store/store";

interface CustomerOrderCardProps {
  data: OrderData;
}

function CustomerOrderCard({ data }: CustomerOrderCardProps) {
  const dispatch = useDispatch();
  const currUser = useSelector(
    (state: State) => state.entities.auth.decodedUser?._id
  );
  const { _id: orderId, status, totalAmount, item, buyer } = data || {};
  const { first_name, last_name } = buyer;
  const full_name = `${first_name} ${last_name}`;
  const {
    product: { title, images = [] },
    quantity: qty,
  } = item || {};

  const handleOrderFilter = () => {
    const updateOrderStatusData: UpdateOrderStatusData = {
      orderId,
      status: OrderStatus.Delivered,
    };

    dispatch(updateOrderStatus(updateOrderStatusData));
  };

  const renderButton = () => {
    if (status === "Delivered" && buyer._id === currUser) {
      return <Button size={ButtonSize.X_SMALL}>Recieved</Button>;
    }

    return (
      <Button size={ButtonSize.X_SMALL} handleClick={handleOrderFilter}>
        Order Processed
      </Button>
    );
  };

  return (
    <div className="order_card">
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
          <OrderCardInfo title="Buyer" data={full_name} />
        </div>

        <div className="price">
          <h4>P {formatCurrency(totalAmount)}</h4>
        </div>

        <div className="action">{renderButton()}</div>
      </div>
    </div>
  );
}

export default CustomerOrderCard;
