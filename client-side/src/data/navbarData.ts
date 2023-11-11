export interface NavbarData {
  id: number;
  name: string;
  path: string;
  icon: string;
  auth?: boolean;
}

const navbarData: NavbarData[] = [
  {
    id: 0,
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    id: 1,
    name: "Products",
    path: "/products",
    icon: "fa-solid fa-cart-shopping",
  },
  {
    id: 3,
    name: "Cart",
    path: "/cart",
    icon: "fa-solid fa-cart-shopping",
    auth: true,
  },
  {
    id: 2,
    name: "Add Product",
    path: "/create-product",
    icon: "fa-solid fa-plus",
    auth: true,
  },

  {
    id: 4,
    name: "Profile",
    path: "/profile",
    icon: "fa-solid fa-user",
    auth: true,
  },
  {
    id: 5,
    name: "Login",
    path: "/login",
    icon: "fa-solid fa-right-to-bracket",
  },
];

export default navbarData;
