export interface ProfileOptionData {
  id: number;
  name: string;
  path: string;
}

const profileOption = [
  {
    id: 0,
    name: "My Likes",
    path: "",
  },

  {
    id: 1,
    name: "My Ratings",
    path: "",
  },
  {
    id: 2,
    name: "My Products",
    path: "/my-products",
  },
  {
    id: 3,
    name: "My Messages",
    path: "",
  },
  {
    id: 8,
    name: "My Orders",
    path: "/my-orders",
  },

  {
    id: 4,
    name: "My Customer's Order",
    path: "/my-customer-orders",
  },

  {
    id: 5,
    name: " Change Password",
    path: "/change-pass",
  },

  {
    id: 6,
    name: "Logout",
    path: "/logout",
  },
];

export default profileOption;
