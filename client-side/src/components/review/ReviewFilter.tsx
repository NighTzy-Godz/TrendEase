import React from "react";

import { ReviewFilterData } from "../../interfaces/review";

interface ReviewFilterProps {
  data: ReviewFilterData;
  currFilter: ReviewFilterData;
  onReviewFilterChange(currFilter: ReviewFilterData): void;
}

function ReviewFilter({
  data,
  currFilter,
  onReviewFilterChange,
}: ReviewFilterProps) {
  const { id, name } = data;

  return (
    <p
      className={`${id === currFilter.id ? "active" : ""}`}
      onClick={() => onReviewFilterChange(data)}
    >
      {name}
    </p>
  );
}

export default ReviewFilter;
