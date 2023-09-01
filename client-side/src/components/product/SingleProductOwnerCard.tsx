import React from "react";
import { ButtonSize } from "../common/Button";
import ButtonLink from "../common/ButtonLink";
import "./ProductOwnerCard.css";
interface SingleProductOwnerCardProps {
  pfp: string;
  full_name: string;
  email: string;
}

function SingleProductOwnerCard({
  pfp,
  full_name,
  email,
}: SingleProductOwnerCardProps) {
  return (
    <div className="single_product_owner_card">
      <div className="owner_info">
        <div className="owner_img">
          <img src={pfp} alt="" />
        </div>
        <div className="owner_subDetails">
          <h3>{full_name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="owner_btn">
        <ButtonLink className="primary" path="/" size={ButtonSize.MEDIUM}>
          Chat Now
        </ButtonLink>
        <ButtonLink path="/" size={ButtonSize.MEDIUM}>
          View Profile
        </ButtonLink>
      </div>
    </div>
  );
}

export default SingleProductOwnerCard;
