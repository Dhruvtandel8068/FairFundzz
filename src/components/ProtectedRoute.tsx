import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;