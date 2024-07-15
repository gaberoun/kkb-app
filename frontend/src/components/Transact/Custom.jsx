import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons"; 

export default function Custom({ members, setMembers }) {

  const handleFormChange = (memberId, e) => {
    let data = {...members};
    data[memberId] = {...data[memberId], payment: e.target.value};
    setMembers(data);
  }

  const memberFields = Object.entries(members).map(([memberId, data]) => (
      <div key={memberId}>
        <label className="block text-sm font-medium leading-6 text-gray-900">{data.name}'s Bill</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"> 
            <FontAwesomeIcon icon={faMoneyBills} />
          </div>
          <input 
            type="number" 
            value={data.payment} 
            onChange={(e) => handleFormChange(memberId, e)} 
            className="block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
            required
          />
        </div>
      </div>
    ));

  return memberFields;
}
