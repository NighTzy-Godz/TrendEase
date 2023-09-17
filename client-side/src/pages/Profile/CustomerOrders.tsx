import React, { useState, useEffect } from "react";
import "../../assets/css/Profile/customer_orders.css";
import PaddedPage from "../../components/containers/PaddedPage";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { getMySoldOrders } from "../../store/slices/order";
import orderStatus from "../../data/orderStatus";
import { OrderData, OrderStatusValue } from "../../interfaces/order";

import OrderFilter from "../../components/order/OrderFilter";
import ButtonLink from "../../components/common/ButtonLink";
import { ButtonSize } from "../../components/common/Button";
import CustomerOrderCard from "../../components/order/CustomerOrderCard";
import Divider from "../../components/common/Divider";

function CustomerOrders() {
  const [orderFilter, setOrderFilter] = useState<OrderStatusValue>(
    orderStatus[0]
  );
  const dispatch = useDispatch();
  const mySoldOrders = useSelector(
    (state: State) => state.entities.order.mySoldOrders
  );

  useEffect(() => {
    if (mySoldOrders.length === 0) dispatch(getMySoldOrders());
  }, []);

  let filteredOrder = mySoldOrders;

  if (orderFilter) {
    filteredOrder = mySoldOrders.filter((order: OrderData) => {
      return order.status === orderFilter.value;
    });
  } else {
    filteredOrder = mySoldOrders;
  }

  const renderCustomerOrder = () => {
    if (filteredOrder.length === 0) {
      return (
        <div className="no_orders">
          <h3>No "{orderFilter.name}" Orders Found At The Moment</h3>
          <ButtonLink path="/profile" size={ButtonSize.SMALL}>
            Go Back to Profile
          </ButtonLink>
        </div>
      );
    }
    return (
      <div className="order_list">
        {filteredOrder.map((order: OrderData) => {
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
          <h1>My Customer Orders</h1>
          <p>
            Track your customer current orders and flag them depending on the
            order's current status
          </p>
        </div>

        <OrderFilter
          data={orderStatus}
          handleClick={handleOrderFilter}
          currFilter={orderFilter}
        />

        <Divider />

        {renderCustomerOrder()}
      </div>
    </PaddedPage>
  );
}

export default CustomerOrders;
