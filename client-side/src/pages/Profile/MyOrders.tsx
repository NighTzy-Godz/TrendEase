import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../store/slices/order";
import "../../assets/css/Profile/orders.css";
import { OrderData, OrderStatus } from "../../interfaces/order";
import PaddedPage from "../../components/containers/PaddedPage";
import orderStatus from "../../data/orderStatus";
import { OrderStatusValue } from "../../interfaces/order";
import { State } from "../../store/store";
import ButtonLink from "../../components/common/ButtonLink";
import { ButtonSize } from "../../components/common/Button";
import Divider from "../../components/common/Divider";
import OrderFilter from "../../components/order/OrderFilter";
import CustomerOrderCard from "../../components/order/CustomerOrderCard";

function MyOrders() {
  const dispatch = useDispatch();
  const [orderFilter, setOrderFilter] = useState<OrderStatusValue>(
    orderStatus[0]
  );
  const myOrders = useSelector((state: State) => state.entities.order.myOrders);

  useEffect(() => {
    if (myOrders.length === 0) dispatch(getMyOrders());
  }, []);

  let filteredOrder = myOrders;

  if (orderFilter) {
    filteredOrder = myOrders.filter((order: OrderData) => {
      return order.status === orderFilter.value;
    });
  } else {
    filteredOrder = myOrders;
  }

  const renderMyOrders = () => {
    if (filteredOrder.length === 0) {
      return (
        <div className="no_orders">
          <h3>No {orderFilter.name} Orders Found At The Moment</h3>
          <ButtonLink path="/profile" size={ButtonSize.SMALL}>
            Go Back to Profile
          </ButtonLink>
        </div>
      );
    }
    return (
      <div className="order_list">
        {filteredOrder?.map((order: OrderData) => {
          return (
            <React.Fragment key={order._id}>
              <CustomerOrderCard data={order} />
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const handleOrderFilter = (filter: OrderStatusValue) => {
    setOrderFilter(filter);
  };

  return (
    <PaddedPage className="orders">
      <div className="container">
        <div className="header">
          <h1>My Orders</h1>
          <p>Track your current orders about its price, quantity and status</p>
        </div>

        <OrderFilter
          data={orderStatus}
          handleClick={handleOrderFilter}
          currFilter={orderFilter}
        />
        <Divider />
        {renderMyOrders()}
      </div>
    </PaddedPage>
  );
}

export default MyOrders;
