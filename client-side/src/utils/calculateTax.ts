const calculateTax = (amount: number, tax: number): number => {
  return parseInt((amount * tax).toFixed(1));
};

export default calculateTax;
