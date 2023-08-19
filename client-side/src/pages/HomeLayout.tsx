import { Outlet } from "react-router-dom";
import TopNavbar from "../components/layout/TopNavbar";

function HomeLayout() {
  return (
    <div>
      <TopNavbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
