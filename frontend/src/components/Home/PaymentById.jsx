import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import MyContext from "../../context/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Request from "./Request";
import Alert from "./Alert";
import NotFound from "../NotFound";

// Display is not yet accounted for when you are the payor
export default function PaymentById() {
  const { user: { userId, token }, BASE_URL } = useContext(MyContext);
  const { paymentId } = useParams();
  const [payment, setPayment] = useState({});
  const [error, setError] = useState(false);

  // GET /payments/:paymentId using axios
  useEffect(() => {
    (async () => {
      try {
        const { data: { data } } = await axios.get(
          `${BASE_URL}/payments/${paymentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPayment(data);

      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, []);

  let contact, status;
  if (payment.user?._id === userId) {
    contact = payment.transaction?.payor;
    status = <Alert status={payment.status} />;
  } else {
    contact = payment.user;
    status = <Request status={payment.status} transactionId={payment.transaction?._id} />;
  }

  if (error) return <NotFound />;
  return (
    <>
      <Link to="/home" className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
      <div className="mt-12">
        <div className="text-center">
          <p className="font-semibold text-2xl">₱ {Math.abs(payment.amountOwed).toFixed(2)}</p>
          <p className="text-xl">{payment.transaction?.description}</p>
          <p>with {payment.transaction?.groupId.name}</p>
          <p className="text-xs text-neutral-600">{moment(payment.createdAt).format("MMMM D, YYYY")}</p>
          <p>Status: {payment.status}</p>
        </div>

        {status}

        <p className="text-neutral-600 text-sm mt-5">Settle debts with:</p>
        <div className="flex gap-5 justify-center mt-2">
          <p className="text-right">{contact?.firstName} {contact?.lastName}</p>
          <div className="border-l-2 border-black px-5">
            <p>{contact?.phone}</p>
            <p>{contact?.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
