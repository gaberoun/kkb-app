import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons"; 

export default function Custom({ members, fields, setFields }) {

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">Total</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"> 
          <FontAwesomeIcon icon={faMoneyBills} />
        </div>
        <input 
          type="number" 
          value={fields.totalAmount} 
          onChange={(e) => setFields({...fields, totalAmount: e.target.value})} 
          className="block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
          required
        />
      </div>
      <p className="text-gray-600">
        {Object.keys(members).length - 1} other {Object.keys(members).length - 1 != 1 ? "members have" : "member has"} to pay you ₱ {(fields.totalAmount/Object.keys(members).length).toFixed(2)} each.
      </p>
    </div>
  );
}
