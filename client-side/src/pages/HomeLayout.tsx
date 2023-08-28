import { Outlet } from "react-router-dom";
import TopNavbar from "../components/layout/TopNavbar";

interface HomeLayoutProps {
  token: string;
}

function HomeLayout({ token }: HomeLayoutProps) {
  return (
    <div>
      <TopNavbar token={token} />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
