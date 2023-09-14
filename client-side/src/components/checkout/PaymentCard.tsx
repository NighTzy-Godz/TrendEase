// import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PaymentCard.css";
import { setPaymentMethod } from "../../store/slices/checkout";

interface PaymentCardData {
  name: string;
  value: string;
  info: string;
}

interface PaymentCardProps {
  data: PaymentCardData;
  //   handlePaymentMethod(e: MouseEvent<HTMLButtonElement>): void;
}

function PaymentCard({ data }: PaymentCardProps) {
  const paymentMethod = useSelector(
    (state: any) => state.entities.checkout.paymentMethod
  );

  const dispatch = useDispatch();

  const handlePaymentMethod = () => {
    dispatch(setPaymentMethod(data.value));
  };
  return (
    <div
      className={`${
        paymentMethod === data.value ? "selectedPayment" : ""
      } payment_card`}
      onClick={handlePaymentMethod}
    >
      <h4>{data.name}</h4>
      <p>{data.info}</p>
    </div>
  );
}

export default PaymentCard;
