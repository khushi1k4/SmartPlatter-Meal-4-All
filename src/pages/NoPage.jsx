import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200 text-white">
      <h1 className="text-6xl font-bold text-black">404</h1>
      <p className="text-black text-xl mt-4">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-amber-500 text-slate-800 text-extrabold rounded-xl hover:bg-orange-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NoPage;
