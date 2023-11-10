import { Outlet } from "react-router-dom";
import TopNavbar from "../components/layout/TopNavbar";
import useDeviceWidth from "../hooks/useDeviceWidth";
import BottomNavbar from "../components/layout/BottomNavbar";

interface HomeLayoutProps {
  token: string | null;
}

function HomeLayout({ token }: HomeLayoutProps) {
  const { deviceWidth } = useDeviceWidth();

  return (
    <>
      <TopNavbar token={token} deviceWidth={deviceWidth} />
      <Outlet />
      <BottomNavbar token={token} />
    </>
  );
}

export default HomeLayout;
