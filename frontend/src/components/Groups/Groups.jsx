import { Link } from "react-router-dom";
import { useEffect } from "react";
import NewGroup from "./NewGroup";
import useGroups from "../../hooks/useGroups";

export default function Groups() {
  const [getGroups, state] = useGroups();

  // GET /groups using axios
  useEffect(() => {
    getGroups();
  }, [state.length]);

  const groups = state.length === 0
    ? <p className="mx-auto text-gray-500">No groups to show...</p>
    : (
        state.map(group => (
        <Link to={`/groups/${group._id}`} key={group._id} className="block rounded-md h-36 w-36 shadow-md border-gray-200 border p-5 hover:translate-y-1">
          <h1>{group.name}</h1>
          <p className="text-gray-600 font-light text-sm">{group.members.length} {group.members.length === 1 ? "member" : "members"}</p>
        </Link>
      )));

  return (
    <>
      <NewGroup />
      <div className="flex gap-6 flex-wrap justify-center">
        {groups}
      </div>
    </>
  )
}
