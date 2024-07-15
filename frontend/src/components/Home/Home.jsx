import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import Payment from "./Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  const navigate = useNavigate();
  const {
    user: { name, token },
    BASE_URL,
    setIsLoggedIn,
  } = useContext(MyContext);
  const [payments, setPayments] = useState([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${BASE_URL}/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const {
          data: { data },
        } = response;
        setPayments(data);
      } catch (error) {
        console.error(
          "Error fetching payments:",
          error.response || error.message
        );
      }
    })();
  }, []);

  const paymentsList =
    payments.length === 0 ? (
      <p className="mx-auto text-gray-500">No pending payments to show...</p>
    ) : (
      payments.map((payment) => (
        <Payment
          key={payment._id}
          paymentId={payment._id}
          paymentPayor={payment.user?.firstName}
          total={payment.amountOwed}
          status={payment.status}
          transactionPayor={payment.transaction?.payor}
        />
      ))
    );

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-end justify-between mb-8">
        <h1 className="text-2xl font-bold">PeraShare</h1>
        <div className="flex gap-2 text-md">
          <p className="font-semibold">{name}</p>
          <button onClick={() => setOpened(!opened)}>
            <FontAwesomeIcon
              icon={faUser}
              className="rounded-full border-black border p-1 hover:text-cyan-600 hover:border-cyan-600"
            />
          </button>
        </div>
      </div>
      <button
        style={{ display: opened ? "block" : "none" }}
        onClick={logout}
        className="absolute top-16 right-10 bg-white shadow-md border border-gray-200 w-36 px-3 py-1 rounded-md text-sm text-left hover:text-cyan-600"
      >
        Logout
      </button>
      <div className="mb-12 grid gap-3">{paymentsList}</div>
    </>
  );
}
