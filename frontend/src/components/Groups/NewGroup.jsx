import { useContext, useState, useReducer } from "react";
import axios from "axios";
import MyContext from "../../context/MyContext";
import { initialGroups, groupsReducer } from "../../reducers/groupsReducer";

export default function NewGroup() {
  const { user: { token }, BASE_URL } = useContext(MyContext);
  const [state, dispatch] = useReducer(groupsReducer, initialGroups);
  const [group, setGroup] = useState("");

  const createGroup = async (e) => {
    try {
      e.preventDefault();

      const newGroup = await axios.post(
        `${BASE_URL}/groups`, 
        { name: group }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: "GROUPS_ADD", payload: newGroup });
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex w-full mb-8 mx-auto gap-2 items-end" onSubmit={createGroup}>
      <div className="grow">
        <label className="block text-sm font-medium leading-6 text-gray-900">Group Name</label>
        <div className="relative rounded-md shadow-sm">
          <input 
            type="text" 
            value={group} 
            onChange={(e) => setGroup(e.target.value)} 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
          />
        </div>
      </div>
      <button className="text-white uppercase rounded-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2 text-center">
        Add Group
      </button>
    </form>
  )
}
