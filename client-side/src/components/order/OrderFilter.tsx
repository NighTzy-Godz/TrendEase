import { OrderStatusValue } from "../../interfaces/order";

interface OrderFilterProps {
  data: Array<OrderStatusValue>;
  currFilter: OrderStatusValue;
  handleClick: (filter: OrderStatusValue) => void;
}

function OrderFilter({ data, currFilter, handleClick }: OrderFilterProps) {
  const renderOrderFilter = data.map((data: OrderStatusValue) => (
    <p
      key={data.id}
      className={`${currFilter.value === data.value ? "active" : ""}`}
      onClick={() => handleClick(data)}
    >
      {data.name}
    </p>
  ));

  return <div className="order_filter">{renderOrderFilter}</div>;
}

export default OrderFilter;
