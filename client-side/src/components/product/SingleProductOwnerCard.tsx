import React from "react";
import { ButtonSize } from "../common/Button";
import ButtonLink from "../common/ButtonLink";
import "./ProductOwnerCard.css";
interface SingleProductOwnerCardProps {
  pfp: string | undefined;
  full_name: string | undefined;
  email: string | undefined;
  isOwner: boolean | undefined;
}

function SingleProductOwnerCard({
  pfp,
  full_name,
  email,
  isOwner,
}: SingleProductOwnerCardProps) {
  function renderBtnAuth(): React.ReactNode {
    return !isOwner ? (
      <ButtonLink className="primary" path="/" size={ButtonSize.MEDIUM}>
        Chat Now
      </ButtonLink>
    ) : (
      <ButtonLink path="/" size={ButtonSize.MEDIUM}>
        View Profile
      </ButtonLink>
    );
  }

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
      <div className="owner_btn">{renderBtnAuth()}</div>
    </div>
  );
}

export default SingleProductOwnerCard;
