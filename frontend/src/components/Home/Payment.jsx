import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function Payment({ paymentId, paymentPayor, total, status, transactionPayor }) {
  const { user: { userId } } = useContext(MyContext);

  const content =
    transactionPayor._id === userId ? (
      <div>
        <p className="text-sm">{paymentPayor} owes you</p>
        <h1 className="font-semibold text-3xl text-emerald-600">
          ₱ {Math.abs(total).toFixed(2)}
        </h1>
      </div>
    ) : (
      <div>
        <p className="text-sm">You owe {transactionPayor.firstName}</p>
        <h1 className="font-semibold text-3xl text-red-600">
          ₱ {Math.abs(total).toFixed(2)}
        </h1>
      </div>
    );

  return (
    <Link
      to={`/payments/${paymentId}`}
      className="rounded-md shadow-md border-gray-200 border p-5 flex justify-between hover:translate-y-1"
    >
      <div>{content}</div>
      <p className="text-right text-sm self-end">Status: {status}</p>
    </Link>
  );
}
