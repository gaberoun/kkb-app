import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MyContext from "../../context/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


export default function JoinGroup({ group }) {
  const { groupId } = useParams();
  const { user: { userId, token }, BASE_URL } = useContext(MyContext);

  const joinGroup = async (e) => {
    await axios.post(
      `${BASE_URL}/groups/${groupId}/members`, 
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    window.location.reload();
  }

  return (
    <>
      <Link to="/groups" className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
      <div className="mt-12">
        <h1 className="text-center font-bold text-3xl">{group.name}</h1>
        <h2 className="font-semibold">Members:</h2>
        <ul className="ml-2">
          {group.members?.map(member => <li key={member._id}>{member.firstName} {member.lastName}</li>)}
        </ul>
      </div>
      <button onClick={joinGroup} className="self-center mt-8 relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
        <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
          Join group
        </span>
      </button>
    </>
  )
}
