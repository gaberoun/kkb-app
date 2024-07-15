import axios from "axios";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Alert({ status }) {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { user: { token }, BASE_URL } = useContext(MyContext);

  // DELETE /payments/:paymentId using axios
  const deletePayment = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/payments/${paymentId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/home");

    } catch (error) {
      console.error(error);
    }
  }

  const alert = status === "Approved"
    ? (<div className="text-center border-gray-200 border shadow-md p-4 rounded-lg mt-8">
        <p>You may now remove this pending payment.</p>
        <button onClick={deletePayment} className="relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
          <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
            Delete Payment
          </span>
        </button>
      </div>)
    : (<div className="text-center border-gray-200 border shadow-md p-4 rounded-lg mt-8">
        <p>Wait for the payor to approve your request.</p>
      </div>);

  return alert;
}
