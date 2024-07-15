import { useEffect, useContext } from "react";
import axios from "axios";
import useGroups from "../../hooks/useGroups";
import MyContext from "../../context/MyContext";

export default function Dropdown({ selected, setSelected, setMembers}) {
  const { BASE_URL } = useContext(MyContext);
  const [getGroups, state] = useGroups();

  // GET /groups using axios
  useEffect(() => {
    getGroups();
  }, [state.length]);

  useEffect(() => {
    if (selected.group != "") {
      (async () => {
        try {
          const { data: { data: { group } } } = await axios.get(`${BASE_URL}/groups/${selected.group}`);
          let members = {};
          for (let member of group.members) {
            members[member._id] = {name: `${member.firstName} ${member.lastName}`, payment: 0};
          }
          setMembers(members);

        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selected.group]);

  return (
    <form className="mt-8 space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Select before proceeding</label>
        <select onChange={(e) => setSelected({...selected, group: e.target.value})} value={selected.group} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 cursor-pointer">
          <option disabled value="">Choose a group</option>
          {state.filter(group => group.members.length > 1).map(group => (
            <option key={group._id} value={group._id}>{group.name}</option>
          ))}
        </select>
      </div>

      <div className="flex w-full justify-between">
        <label className="block text-sm font-medium leading-6 text-gray-900">How would you like to split the bill?</label>
        <div className="flex">
          <div className="flex items-center me-4">
            <input 
              onChange={(e) => setSelected({ ...selected, option: e.target.value })}
              checked={selected.option === "Equal"}
              type="radio" 
              value="Equal" 
              name="option" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
            />
            <label className="ms-2 text-sm text-gray-900">Equal</label>
          </div>
          <div className="flex items-center me-4">
            <input 
              onChange={(e) => setSelected({ ...selected, option: e.target.value })}
              checked={selected.option === "Custom"}
              type="radio" 
              value="Custom" 
              name="option" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1" 
            />
            <label className="ms-2 text-sm text-gray-900">Custom</label>
          </div>
        </div>
      </div>
    </form>
  )
}
