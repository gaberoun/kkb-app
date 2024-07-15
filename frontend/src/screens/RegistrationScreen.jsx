import { useContext, useState } from "react";
import useLogin from "../hooks/useLogin";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import MyContext from "../context/MyContext";

export default function RegistrationScreen() {
  const { BASE_URL } = useContext(MyContext);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, login] = useLogin();
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Organize data before submission
      let data = {};
      for (var key in fields) {
        if (key != "password")
          data[key] = fields[key].trim();
        else 
          data[key] = fields[key];
        if (key === "firstName" || key === "lastName") 
          data[key] = data[key].charAt(0).toUpperCase() + data[key].slice(1);
        if (key === "email") 
          data[key] = data[key].toLowerCase();
      }

      await axios.post(`${BASE_URL}/users/register`, data);
      login(e, { phone: data.phone, password: data.password });

    } catch (err) {
      console.error(err);
      setWarning(err.response.data.error);
    }
  };

  return (
    <>
      <Link to="/login" className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
      <section className="my-20 mx-auto w-11/12">
        <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>

        <form className="space-y-6 mt-10 mx-auto max-w-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
            <input 
              required 
              type="text" 
              value={fields.firstName} 
              onChange={(e) => setFields({ ...fields, firstName: e.target.value })} 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
            <input 
              required 
              type="text" 
              value={fields.lastName} 
              onChange={(e) => setFields({ ...fields, lastName: e.target.value })} 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 text-sm">+63</span>
              </div>
              <input 
                required
                type="text" 
                value={fields.phone} 
                onChange={(e) => setFields({ ...fields, phone: e.target.value })} 
                className="block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input 
              required 
              type="email" 
              value={fields.email} 
              onChange={(e) => setFields({ ...fields, email: e.target.value })} 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input 
              required 
              type="password" 
              value={fields.password} 
              onChange={(e) => setFields({ ...fields, password: e.target.value })} 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button className="uppercase flex w-full justify-center rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" type="submit">
            Submit
          </button>

          {warning && <p className="px-3 py-1.5 mb-4 text-sm text-red-900 rounded-lg bg-red-300"><FontAwesomeIcon icon={faCircleExclamation} /> {warning}</p>}
        </form>
      </section>
    </>
  )
}
