const calculateAmount = <T>(data: T[], path: string) => {
  let totalAmount = 0;
  for (let item of data) {
    totalAmount += (item as any)[path];
  }

  return totalAmount;
};

export default calculateAmount;
