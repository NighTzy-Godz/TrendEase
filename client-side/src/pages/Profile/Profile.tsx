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
import { getMyProducts } from "../../store/slices/product";
import Loader from "../../components/common/Loader";

function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.entities.user.loading);
  const userInfo = useSelector((state: State) => state.entities.user.info);
  const mySoldOrders = useSelector(
    (state: State) => state.entities.order.mySoldOrders
  );
  const myOrders = useSelector((state: State) => state.entities.order.myOrders);
  const myProducts = useSelector(
    (state: State) => state.entities.product.myProducts
  );

  const { first_name, last_name, email, bio, pfp, cover_photo } =
    userInfo || {};
  const full_name = first_name + " " + last_name;
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getMyOrders());
    dispatch(getMySoldOrders());
    dispatch(getMyProducts());
  }, []);

  const renderProfileOption = profileOption?.map((item: ProfileOptionData) => {
    return (
      <Link key={item.id} to={item.path}>
        {item.name}
      </Link>
    );
  });

  if (loading) return <Loader />;

  return (
    <div className="profile">
      <div className="container">
        <ProfileHeader
          pfp={pfp as string}
          cover_photo={cover_photo as string}
          full_name={full_name}
          email={email as string}
          bio={bio as string}
          soldOrders={mySoldOrders?.length}
          myOrders={myOrders?.length}
          myProducts={myProducts?.length as number}
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
