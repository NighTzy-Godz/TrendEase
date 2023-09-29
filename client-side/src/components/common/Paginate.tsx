import React from "react";
import _ from "lodash";
import "../../assets/css/common/Paginate.css";
interface PaginateProps {
  currPage: number;
  itemCount: number;
  pageLoad: number;
  onPaginateClick(page: number): void;
}

function Paginate({
  currPage,
  itemCount,
  pageLoad,
  onPaginateClick,
}: PaginateProps) {
  const pageCount = itemCount / pageLoad;
  console.log(pageCount);
  if (pageCount <= 1) return;

  const pages = _.range(1, pageCount + 1);

  const renderPages = pages.map((item) => {
    return (
      <li
        key={item}
        className={`${currPage === item ? "active" : ""}`}
        onClick={() => onPaginateClick(item)}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="paginate">
      <ul>{renderPages}</ul>
    </div>
  );
}

export default Paginate;
