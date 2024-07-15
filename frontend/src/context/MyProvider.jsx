import { useState } from "react";
import MyContext from "./MyContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    BASE_URL
  };

  return (
    <MyContext.Provider value={state}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
