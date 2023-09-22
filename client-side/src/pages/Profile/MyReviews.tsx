import React, { useEffect, useState } from "react";
import PaddedPage from "../../components/containers/PaddedPage";
import "../../assets/css/Profile/my_reviews.css";
import { State } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecievedOrders } from "../../store/slices/order";
import PendingReviewCard from "../../components/review/PendingReviewCard";
import reviewFilter, { ReviewFilterData } from "../../data/reviewFilter";
import ReviewFilter from "../../components/review/ReviewFilter";
import Divider from "../../components/common/Divider";
function MyReviews() {
  const dispatch = useDispatch();
  const [reviewPageFilter, setReviewPageFilter] = useState<ReviewFilterData>(
    reviewFilter[0]
  );
  const recievedOrders = useSelector(
    (state: State) => state.entities.order.myRecievedOrders
  );

  useEffect(() => {
    dispatch(getMyRecievedOrders());
  }, []);

  let filteredReview = recievedOrders.filter((item) => {
    return item.rated === reviewPageFilter.value;
  });

  const handleReviewFilter = (currFilter: ReviewFilterData) => {
    setReviewPageFilter(currFilter);
  };

  const renderRecievedOrders = filteredReview?.map((item) => {
    return (
      <React.Fragment key={item._id}>
        <PendingReviewCard data={item} />
      </React.Fragment>
    );
  });

  const renderReviewFilter = reviewFilter.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <ReviewFilter
          data={item}
          currFilter={reviewPageFilter}
          onReviewFilterChange={handleReviewFilter}
        />
      </React.Fragment>
    );
  });

  return (
    <PaddedPage className="myReviews">
      <div className="container">
        <div className="header">
          <h1>My Reviews</h1>
          <p>
            Track and share your thoughts and experiences with the products
            you've ordered.
          </p>
        </div>

        <div className="myReviews_filter">{renderReviewFilter}</div>
        <Divider />
        <div className="myReviewGrid">{renderRecievedOrders}</div>
      </div>
    </PaddedPage>
  );
}

export default MyReviews;
