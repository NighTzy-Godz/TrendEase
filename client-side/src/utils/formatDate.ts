import moment from "moment";

const formatDate = (date: Date): string => {
  return moment(date).format("LLL");
};

export default formatDate;
