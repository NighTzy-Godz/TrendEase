import { useEffect } from "react";

import "../../assets/css/Profile/profile.css";
import Divider from "../../components/common/Divider";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import profileOption from "../../data/profileOption";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/slices/user";
import { getMyOrders, getMySoldOrders } from "../../store/slices/order";
import { State } from "../../store/store";
import { ProfileOptionData } from "../../data/profileOption";

function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: State) => state.entities.user.info.user);
  const mySoldOrders = useSelector(
    (state: State) => state.entities.order.mySoldOrders
  );
  const myOrders = useSelector((state: State) => state.entities.order.myOrders);

  const { first_name, last_name, email, bio } = userInfo || {};
  const full_name = first_name + " " + last_name;
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getMyOrders());
    dispatch(getMySoldOrders());
  }, []);

  const renderProfileOption = profileOption?.map((item: ProfileOptionData) => {
    return (
      <Link key={item.id} to={item.path}>
        {item.name}
      </Link>
    );
  });

  return (
    <div className="profile">
      <div className="container">
        <ProfileHeader
          full_name={full_name}
          email={email}
          bio={bio}
          soldOrders={mySoldOrders?.length}
          myOrders={myOrders?.length}
          myProducts={10}
        />

        <Divider />

        <div className="profile_option">
          <div className="header">
            <h3>Profile Status</h3>
            <p>
              Check all the status of your profile such as your orders, customer
              orders and etc
            </p>
          </div>

          <div className="profile_option_list">{renderProfileOption}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
