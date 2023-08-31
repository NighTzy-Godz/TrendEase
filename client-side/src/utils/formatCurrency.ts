const formatCurrency = (price: number) => {
  return new Intl.NumberFormat().format(price);
};
export default formatCurrency;
