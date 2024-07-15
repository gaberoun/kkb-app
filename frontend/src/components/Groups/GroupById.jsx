import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLink } from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../context/MyContext";
import Transaction from "./Transaction";
import NotFound from "../NotFound";
import JoinGroup from "./JoinGroup";

// Button for 'Create transaction' or 'Join group' is not yet implemented
export default function GroupById() {
  const { user: { userId }, BASE_URL } = useContext(MyContext);
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  // GET /groups/:groupId using axios
  useEffect(() => {
    (async () => {
      try {
        const { data: { data } } = await axios.get(`${BASE_URL}/groups/${groupId}`);

        // Check if user is part of group
        if (data.group.members.find(member => member._id == userId) === undefined) {
          setError("Not part");
        }

        setGroup(data.group);
        setTransactions(data.transactions);

      } catch (error) {
        console.log(error);
        setError("Not found");
      }
    })();
  }, []);

  const transactionsList = transactions.length === 0
    ? <p>No transactions yet...</p>
    : transactions.map(transaction => {
        return <Transaction 
          key={transaction._id}
          transactionId={transaction._id}
          category={transaction.category}
          description={transaction.description}
          createdAt={transaction.createdAt}
        />
      });

  const copyToClip = async () => {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  }

  if (error === "Not found")
    return <NotFound />
  else if (error === "Not part")
    return <JoinGroup group={group} />
  else 
    return (
      <>
        <Link to="/groups" className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
        <div className="mt-12">
          <h1 className="text-center font-bold text-3xl">{group?.name}</h1>
          <h2 className="font-semibold">Members:</h2>
          <ul className="ml-2">
            {group?.members?.map(member => <li key={member._id}>{member.firstName} {member.lastName}</li>)}
          </ul>
        </div>

        <div className="grid gap-2">
          <h2 className="font-semibold">Transactions:</h2>
          {transactionsList}
        </div>

        <button onClick={copyToClip} className="self-center mt-8 relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
          <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
            <FontAwesomeIcon icon={faLink} /> {copySuccess ? "Copied to clipboard!" : "Share group link"}
          </span>
        </button>
      </>
    )
}
