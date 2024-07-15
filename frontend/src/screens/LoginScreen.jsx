import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useLogin from "../hooks/useLogin";

export default function LoginScreen() {
  const [error, login] = useLogin();
  const [fields, setFields] = useState({
    phone: "",
    password: ""
  });

  return (
    <>
      <Link to="/" className="absolute top-5 left-5"><FontAwesomeIcon icon={faChevronLeft} /></Link>
      <section className="mt-20 mx-auto w-11/12">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>

        <form className="space-y-6 mt-10 mx-auto max-w-sm" onSubmit={(e) => login(e, { phone: fields.phone.trim(), password: fields.password })}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 text-sm">+63</span>
              </div>
              <input 
                type="text" 
                value={fields.phone} 
                onChange={(e) => setFields({ ...fields, phone: e.target.value })} 
                className="block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"   
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input 
              required 
              type="password" 
              value={fields.password} 
              onChange={(e) => setFields({ ...fields, password: e.target.value })} 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button className="uppercase flex w-full justify-center rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" type="submit">
            Login
          </button>
          {error && <p className="px-3 py-1.5 mb-4 text-sm text-red-900 rounded-lg bg-red-300"><FontAwesomeIcon icon={faCircleExclamation} /> {error}</p>}
        </form>

        <p className="mt-5 text-center text-md font-light leading-9 tracking-tight text-gray-700">
          Don"t have an account yet? <Link to="/register" className="font-normal text-gray-800">Create an Account</Link>
        </p>

      </section>
    </>
  );
};
