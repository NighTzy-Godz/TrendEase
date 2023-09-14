import { Outlet } from "react-router-dom";
import TopNavbar from "../components/layout/TopNavbar";

interface HomeLayoutProps {
  token: string | null;
}

function HomeLayout({ token }: HomeLayoutProps) {
  return (
    <>
      <TopNavbar token={token} />
      <Outlet />
    </>
  );
}

export default HomeLayout;
