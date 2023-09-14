const calculateTotalOrder = (
  subTotal: number,
  tax: number,
  shippingFee: number
): number => {
  return parseFloat((subTotal + tax + shippingFee).toFixed(1));
};

export default calculateTotalOrder;
