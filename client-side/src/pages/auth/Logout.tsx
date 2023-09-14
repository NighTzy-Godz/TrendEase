import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    (window as any).location = "/";
  });

  return null;
}

export default Logout;
