import React from "react";
import { ReviewData } from "../../interfaces/review";
import "./ReviewCard.css";
import formatDate from "../../utils/formatDate";
import Stars from "../common/Stars";
interface ReviewCardProps {
  data: ReviewData;
}

function ReviewCard({ data }: ReviewCardProps) {
  const {
    reviewOwner: { first_name, last_name, pfp },
    orderPost: {
      item: { product, quantity },
    },
    createdAt,
    rating,
    content,
  } = data;

  const { images, title } = product;
  const full_name = first_name + " " + last_name;
  const slicedReviewContent =
    content.length > 100 ? `${content.slice(0, 100)} ...` : content;

  const slicedItemTitle =
    title.length > 60 ? `${title.slice(0, 60)} ...` : title;

  return (
    <div className="review_card">
      <div className="review_owner">
        <img src={pfp} alt="" />
        <small>{full_name}</small>
      </div>
      <div className="review_date">
        <p>{formatDate(createdAt)}</p>
      </div>
      <div className="review_star">
        <Stars rating={rating} />
      </div>

      <div className="review_content">
        <p>{slicedReviewContent}</p>
      </div>

      <div className="review_item">
        <img src={images[0]} alt="" />
        <div className="item_info">
          <h3>{slicedItemTitle}</h3>
          <p>x {quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
