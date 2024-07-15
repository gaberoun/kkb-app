import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../context/MyContext";
import Dropdown from "./Dropdown";
import Custom from "./Custom";
import Equal from "./Equal";

// Can be transferred to context
const categories = ["Travel", "Dine out", "Necessities", "Emergency", "Other"];


export default function Transact() {
  const navigate = useNavigate();
  const { user: { userId, token }, BASE_URL } = useContext(MyContext);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState({
    group: "",
    option: "Equal"
  });
  // Transaction fields
  const [fields, setFields] = useState({
    description: "",
    category: "",
    totalAmount: 0.00
  });
  // Payment fields
  const [members, setMembers] = useState({});

  const buttonStyle = selected.group === ""
    ? "uppercase flex w-full justify-center rounded-full bg-neutral-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
    : "uppercase flex w-full justify-center rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"

  let paymentFields = "";
  if (selected.group != "") {
    paymentFields = selected.option === "Equal"
      ? <Equal members={members} fields={fields} setFields={setFields} />
      : <Custom members={members} setMembers={setMembers} />
  }

  const createTransaction = async (transactionRequest) => {
    try {
      const { data: { data: { _id }, message }} = await axios.post(
        `${BASE_URL}/transactions`, 
        transactionRequest, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(message);
      return _id;

    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  }

  const createPayment = async (memberId, payment, transaction) => {
    try {
      const { data: { message }} = await axios.post(
        `${BASE_URL}/payments`, 
        {
          user: memberId,
          transaction,
          amountOwed: payment,
        }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(message);

    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let transactionRequest = {...fields, groupId: selected.group};
      let paymentRequest = {...members};
      
      if (selected.option == "Equal") {
        // Create equal payments for other members
        let split = transactionRequest.totalAmount/(Object.keys(members).length);
        for (let memberId of Object.keys(paymentRequest)) {
          paymentRequest[memberId] = {...paymentRequest[memberId], payment: split}
        }
      } else {
        // Calculate total of all bills
        let total = 0;
        for (let data of Object.values(members)) {
          total += parseFloat(data.payment);
        }
        transactionRequest.totalAmount = total;
      }
      
      // POST /transactions using axios
      const transactionId = await createTransaction(transactionRequest);
      if (!transactionId) return;
      
      // Filter out payor from members
      const payments = Object.keys(paymentRequest)
      .filter(memberId => memberId != userId);
      
      // POST /payments using axios
      for (const memberId of payments) {
        await createPayment(memberId, paymentRequest[memberId].payment, transactionId);
      }
      
      navigate("/home");

    } catch (error) {
      console.error(error);
      setError(error.response.data.error);    
    }
  }

  return (
    <>
      <section>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new transaction
        </h2>

        <Dropdown selected={selected} setSelected={setSelected} setMembers={setMembers} />

        <form onSubmit={handleSubmit}>
          <fieldset disabled={selected.group === "" ? true : false} className="my-10 space-y-6 mt-10">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div className="relative rounded-md shadow-sm">
                <input 
                  type="text" 
                  value={fields.description} 
                  onChange={(e) => setFields({ ...fields, description: e.target.value })} 
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select onChange={(e) => setFields({...fields, category: e.target.value})} value={fields.category} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 cursor-pointer">
                <option disabled value="">Choose a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {paymentFields}

            <button className={buttonStyle} type="submit">
              Submit
            </button>
          </fieldset>
          {error && <p className="px-3 py-1.5 mb-4 text-sm text-red-900 rounded-lg bg-red-300"><FontAwesomeIcon icon={faCircleExclamation} /> {error}</p>}
        </form>
      </section>
    </>
  )
}
