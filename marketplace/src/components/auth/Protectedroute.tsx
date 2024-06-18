import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useWeb3 } from "../providers/web3";

const ProtectedRoute = () => {
  const { usr } = useWeb3();

  if (!usr) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
