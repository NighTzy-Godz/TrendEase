import React from "react";
import { OrderData } from "../../interfaces/order";
import ButtonLink from "../common/ButtonLink";
import { ButtonSize } from "../common/Button";
import "./PendingReviewCard.css";
import formatDate from "../../utils/formatDate";
interface PendingReviewCardProps {
  data: OrderData;
}

function PendingReviewCard({ data }: PendingReviewCardProps) {
  const { item, createdAt, rated } = data;

  return (
    <div className="pendingReviewCard">
      <div className="pendingReviewCard_container">
        <div className="img">
          <img src={item.product.images[0]} alt="" />
        </div>
        <div className="name">
          <h3>{item.product.title}</h3>
        </div>
      </div>
      <div className="bought_date">
        <p>
          <span>Bought Date: </span> {formatDate(createdAt)}
        </p>
      </div>
      {!rated && (
        <div className="action">
          <ButtonLink path="" size={ButtonSize.X_SMALL}>
            Rate Now
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

export default PendingReviewCard;
