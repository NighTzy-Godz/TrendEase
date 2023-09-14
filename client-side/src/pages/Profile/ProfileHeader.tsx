import { ButtonSize } from "../../components/common/Button";
import ButtonLink from "../../components/common/ButtonLink";

import img from "../../assets/img/first_ppt.jpg";
import "../../assets/css/Profile/profile_header.css";

interface ProfileHeaderProps {
  full_name: string;
  email: string;
  bio: string;
  soldOrders: number;
  myOrders: number;
  myProducts: number;
}

function ProfileHeader({
  full_name,
  email,
  bio,
  soldOrders,
  myOrders,
  myProducts,
}: ProfileHeaderProps) {
  return (
    <div className="profile_header">
      <div className="cover_photo">
        <img src={img} alt="" />
      </div>
      <div className="profile_pfp">
        <img src={img} alt="" />

        <div className="profile_edit_btn">
          <ButtonLink size={ButtonSize.SMALL} className="primary" path="/">
            Edit Profile
          </ButtonLink>
        </div>
      </div>
      <div className="profile_info">
        <h3 className="name">{full_name}</h3>
        <p className="email">{email}</p>
        <p className="bio">
          {bio ? bio : "Bio for this user did not found on the database"}
        </p>
      </div>

      <div className="profile_subDetails">
        <div className="item_container">
          <p>{soldOrders} Sold Items</p>
        </div>
        <div className="item_container">
          <p>{myOrders} Product Order/s Made</p>
        </div>

        <div className="item_container">
          <p>{myProducts} Products Made</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
