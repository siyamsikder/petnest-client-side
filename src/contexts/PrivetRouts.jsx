import { AuthContext } from "./AuthContext";
import { useLocation } from "react-router";
import Loder from "../components/Loder";
import { use } from "react";

const PrivetRouts = ({Children}) => {
  const { users, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loder />;
  }
  if (users && users?.email) {
    return Children;
  }
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

export default PrivetRouts;
