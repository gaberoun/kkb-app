import { Link } from "react-router-dom";

export default function LandingScreen() {
  return (
    <>
      <section className="my-20 mx-auto w-11/12">
        <h1 className="text-center text-3xl font-bold">KKB App</h1> 
      </section>
      <aside className="bg-neutral-900 absolute bottom-0 w-full rounded-t-2xl p-10 text-white text-center">
        <h2 className="text-3xl font-light">Spend more time together & split your bills easier</h2>
        <p className="text-neutral-300 my-5">Your new go-to app after having a good time.</p>
        <Link to="/home" className="text-white uppercase rounded-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          Get Started
        </Link>
      </aside>
    </> 
  )
}
