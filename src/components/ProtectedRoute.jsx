import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;