import React, { useEffect, useState } from "react";
import PaddedPage from "../../components/containers/PaddedPage";
import "../../assets/css/Profile/my_reviews.css";
import { State } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecievedOrders } from "../../store/slices/order";
import PendingReviewCard from "../../components/review/PendingReviewCard";
import reviewFilter from "../../data/reviewFilter";
import { ReviewFilterData } from "../../interfaces/review";
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

  const renderRecievedOrders = () => {
    if (filteredReview.length === 0)
      return (
        <div className="no_orders">
          <h1>No "To Rated" Orders Found At The Moment</h1>
        </div>
      );
    return (
      <div className="myReviewGrid">
        {filteredReview?.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <PendingReviewCard data={item} />
            </React.Fragment>
          );
        })}
      </div>
    );
  };

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
    <React.Fragment>
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
          {renderRecievedOrders()}
        </div>
      </PaddedPage>
    </React.Fragment>
  );
}

export default MyReviews;
