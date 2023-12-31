import React, { useState } from "react";
import { OrderData, OrderStatus } from "../../interfaces/order";
import "./OrderCard.css";
import formatCurrency from "../../utils/formatCurrency";
import Button, { ButtonSize } from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyOrders,
  getMySoldOrders,
  orderProcessed,
  orderRecieved,
} from "../../store/slices/order";
import { UpdateOrderStatusData } from "../../interfaces/order";
import OrderCardInfo from "./OrderCardInfo";
import { State } from "../../store/store";
import Modal from "../common/Modal";
import ButtonLink from "../common/ButtonLink";

interface CustomerOrderCardProps {
  data: OrderData;
}

function CustomerOrderCard({ data }: CustomerOrderCardProps) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const currUser = useSelector(
    (state: State) => state.entities.auth.decodedUser?._id
  );
  const { _id: orderId, status, totalAmount, item, buyer } = data || {};
  const { first_name, last_name } = buyer;

  const {
    product: { _id: productId, title, images = [], owner },
    quantity: qty,
  } = item || {};

  const full_name = `${first_name} ${last_name}`;
  const orderBuyer = currUser === buyer._id ? "You" : full_name;
  const orderOwner = buyer._id === currUser;
  const productOwner = currUser === owner;

  console.log(data);

  const handleOrderStatus = (status: OrderStatus) => {
    const updateOrderStatusData: UpdateOrderStatusData = {
      orderId,
      status,
    };

    if (status === "Delivered") {
      dispatch(orderProcessed(updateOrderStatusData));
      setTimeout(() => {
        dispatch(getMySoldOrders());
      }, 10);
    } else {
      dispatch(orderRecieved(updateOrderStatusData));
      setTimeout(() => {
        dispatch(getMyOrders());
      }, 10);
    }
  };

  const renderButton = () => {
    if (status === "Processing" && productOwner) {
      return (
        <Button
          size={ButtonSize.X_SMALL}
          handleClick={() => handleOrderStatus(OrderStatus.Delivered)}
        >
          Order Processed
        </Button>
      );
    }
    if (status === "Delivered" && orderOwner) {
      return (
        <Button
          size={ButtonSize.X_SMALL}
          handleClick={() => handleOrderStatus(OrderStatus.Recieved)}
        >
          Recieved
        </Button>
      );
    }

    if (status === "Recieved" && orderOwner) {
      return (
        <ButtonLink path={`/products/${productId}`} size={ButtonSize.SMALL}>
          Buy Again
        </ButtonLink>
      );
    }
  };

  return (
    <React.Fragment>
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
            <OrderCardInfo title="Buyer" data={orderBuyer} />
          </div>

          <div className="price">
            <h4>P {formatCurrency(totalAmount)}</h4>
          </div>

          <div className="action">{renderButton()}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CustomerOrderCard;
