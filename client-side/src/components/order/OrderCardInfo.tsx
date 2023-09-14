interface OrderCardInfoProps {
  title: string;
  data: string | number;
}

function OrderCardInfo({ title, data }: OrderCardInfoProps) {
  return (
    <div className="order_card_container">
      <p>
        <span>{title}: </span>
        {data}
      </p>
    </div>
  );
}

export default OrderCardInfo;
