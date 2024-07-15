import axios from "axios";
import { useContext, useReducer } from "react";
import MyContext from "../context/MyContext";
import { initialGroups, groupsReducer } from "../reducers/groupsReducer";

const useGroups = () => {
  const [state, dispatch] = useReducer(groupsReducer, initialGroups);
  const { user: { token }, BASE_URL } = useContext(MyContext);

  const handleGroups = async () => {
    try {
      const { data: { data } } = await axios.get(
        `${BASE_URL}/groups`,
        { headers: { Authorization: `Bearer ${token}` } });
        
        localStorage.setItem("groups", JSON.stringify(data));
        dispatch({ type: "GROUPS_LIST", payload: data });
        
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
  
  return [handleGroups, state];
}

export default useGroups;