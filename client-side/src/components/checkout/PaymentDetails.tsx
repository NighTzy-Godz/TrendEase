import "./PaymentDetails.css";

interface PaymentDetailsProp {
  title: string;
  data: string | number;
}

function PaymentDetails({ title, data }: PaymentDetailsProp) {
  return (
    <div className="payment_details_container">
      <small>{title}</small>
      <p>P {data}</p>
    </div>
  );
}

export default PaymentDetails;
