import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../context/MyContext";

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useContext(MyContext);
  return isLoggedIn ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute;