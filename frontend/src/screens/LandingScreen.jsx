import { Link } from "react-router-dom";
import ewallet from "../assets/e-wallet-animate.svg";

export default function LandingScreen() {
  return (
    <>
      <section className="my-2 mx-auto w-11/12 py-4 relative h-1/2 md:h-screen">
        <h1 className="text-center text-4xl font-bold">PeraShare</h1>
        <div className="w-full h-80 md:h-[60%] flex flex-col justify-center items-center">
          <img
            src={ewallet}
            alt="e-wallet-animated"
            className="max-w-full max-h-full object-contain"
          />
          <a
            href="https://storyset.com/money"
            className="text-xs text-gray-500 hover:text-gray-700 mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Money illustrations by Storyset
          </a>
        </div>
      </section>
      <aside className="bg-neutral-900 absolute bottom-0 w-full rounded-t-2xl p-10 text-white text-center">
        <h2 className="text-3xl font-light">
          Spend more time together & split your bills easier
        </h2>
        <p className="text-neutral-300 my-5">
          Your new go-to app after having a good time.
        </p>
        <Link
          to="/home"
          className="text-white uppercase rounded-full bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Get Started
        </Link>
      </aside>
    </>
  );
}
