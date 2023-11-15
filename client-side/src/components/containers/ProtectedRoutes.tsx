import React, { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedRoutesProps {
  token: string | null;
  children: ReactNode;
}

function ProtectedRoutes({ token, children }: ProtectedRoutesProps) {
  if (!token) {
    toast.error("You're not authenticated. You cannot do that action", {
      autoClose: 2500,
    });

    return <Navigate to="/" />;
  }
  return <React.Fragment>{children}</React.Fragment>;
}

export default ProtectedRoutes;
