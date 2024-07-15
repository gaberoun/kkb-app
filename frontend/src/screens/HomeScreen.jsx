import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup, faReceipt } from "@fortawesome/free-solid-svg-icons";

export default function HomeScreen() {

  return (
    <main className="bg-neutral-900 h-svh">
    
      <section className="rounded-b-md overflow-y-auto h-[calc(100svh-3.5rem)] bg-white">
        <div className="mt-8 mx-auto w-11/12 flex flex-col gap-4">
          <Outlet />
        </div>
      </section>

      <nav className="absolute bottom-0 w-full p-2 text-white flex justify-around">
        <NavLink to="/home" className="text-center block">
          <FontAwesomeIcon icon={faHouse} />
          <p className="text-xs font-light">Home</p>
        </NavLink>
        <NavLink to="/groups" className="text-center block">
          <FontAwesomeIcon icon={faUserGroup} />
          <p className="text-xs font-light">Groups</p>
        </NavLink>
        <NavLink to="/transact" className="text-center block">
          <FontAwesomeIcon icon={faReceipt} />
          <p className="text-xs font-light">Transact</p>
        </NavLink>
      </nav>
    </main> 
  )
}
