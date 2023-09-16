import { CheckoutItemsData } from "../store/slices/checkout";
import calculateAmount from "../utils/calculateAmount";
import calculateTax from "./calculateTax";
import calculateTotalOrder from "./calculateTotalOrder";

interface PaymentDetailsInput {
  checkoutItems: CheckoutItemsData[];
  TAX: number;
  SHIPPING_FEE: number;
}

function paymentDetails({
  checkoutItems,
  TAX,
  SHIPPING_FEE,
}: PaymentDetailsInput) {
  const merchandiseTotal = calculateAmount(checkoutItems, "price");
  const totalTax = calculateTax(merchandiseTotal, TAX);
  const totalOrderAmount = calculateTotalOrder(
    merchandiseTotal,
    totalTax,
    SHIPPING_FEE
  );
  return { merchandiseTotal, totalTax, totalOrderAmount };
}

export default paymentDetails;
