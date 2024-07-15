import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../context/MyContext";

const useLogin = () => {
  const { setIsLoggedIn, setUser, BASE_URL } = useContext(MyContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();

      const {
        data: { data },
      } = await axios.post(`${BASE_URL}/users/login`, {
        phone: userCredentials.phone,
        password: userCredentials.password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      navigate("/home");
      
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  return [error, handleLogin];
};

export default useLogin;
