import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../../context/MyContext";

export default function Request({ status, transactionId }) {
  const { paymentId } = useParams();
  const { user: { token }, BASE_URL } = useContext(MyContext);

  // PUT /payments/:paymentId using axios
  const changeStatus = async () => {
    try {
      await axios.put(
        `${BASE_URL}/payments/${paymentId}`, 
        { status: "Approved", transactionId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }

  const request = status === "Approved"
  ? (<div className="text-center border-gray-200 border shadow-md p-4 rounded-lg mt-8">
      <p>You have approved this pending payment.</p>
    </div>)
  : (<div className="text-center border-gray-200 border shadow-md p-4 rounded-lg mt-8">
        <p>Confirm the member's payment?</p>
        <button onClick={changeStatus} className="relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
          <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
            Proceed
          </span>
        </button>      
    </div>)

  return request;
}
