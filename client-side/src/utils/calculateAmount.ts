const calculateAmount = (data: [], path: string) => {
  let totalAmount = 0;
  for (let item of data) {
    totalAmount += item[path];
  }

  return totalAmount;
};

export default calculateAmount;
