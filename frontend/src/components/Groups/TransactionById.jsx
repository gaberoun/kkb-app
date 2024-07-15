import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../context/MyContext";
import NotFound from "../NotFound";

export default function TransactionById() {
  const { user: { token }, BASE_URL } = useContext(MyContext);
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState({});
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(false);

  // GET /transactions/:transactionId using axios
  useEffect(() => {
    (async () => {
      try {
        const { data: { data } } = await axios.get(
          `${BASE_URL}/transactions/${transactionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTransaction(data.transaction);
        setPayments(data.payments);

      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  const paymentsList = payments.map(payment => {
      return (
        <div key={payment._id} className="rounded-md shadow-md border-gray-200 text-sm border p-5 flex justify-between items-end">
          <h1 className="font-semibold text-2xl">₱ {Math.abs(payment.amountOwed).toFixed(2)}</h1>
          <h2>{payment.user.firstName} {payment.user.lastName}</h2>
        </div>
      )
  });

  if (error) return <NotFound />;
  return (
    <>
      <Link to={`/groups/${transaction.groupId}`} className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
      <div className="text-center mt-12">
        <h1 className="font-bold text-3xl">{transaction.description}</h1>
        <p>{moment(transaction.createdAt).format("MMMM D, YYYY")}</p>
        <div className="grid gap-4 text-left">
          <h2 className="font-semibold mt-8 text-lg">Pending Payments</h2>
          {paymentsList}
        </div>
      </div>
    </>
  )
}
