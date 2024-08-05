import { Link } from "react-router-dom";
import ewallet from "../assets/e-wallet-animate.svg";

export default function LandingScreen() {
  return (
    <>
      <section className="w-full h-3/4 fixed grid items-center py-5 md:py-10">
        <h1 className="text-center text-3xl font-bold">PeraShare</h1>
        <img
          src={ewallet}
          alt="e-wallet-animated"
          className="object-cover"
        />
      </section>
      <aside className="bg-neutral-900 absolute min-h-1/4 bottom-0 w-full rounded-t-2xl p-10 text-white text-center grid items-center">
      <h2 className="text-2xl font-light">Spend more time together & split your bills easier</h2>
        <p className="text-neutral-300 mb-5">Your new go-to app after having a good time.</p>
        <Link to="/home" className="justify-self-center text-white uppercase rounded-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          Get Started
        </Link>
      </aside>
    </>
  );
}
