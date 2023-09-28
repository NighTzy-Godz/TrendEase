import _ from "lodash";

function paginate(data: [], currPage: number, pageLoad: number) {
  const startIndex = (currPage - 1) * pageLoad;

  return _(data).slice(startIndex).take(pageLoad).value();
}

export default paginate;
