import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide">HealthMate</h1>
      <nav className="flex gap-4">
        <button onClick={() => navigate('/login')} className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md cursor-pointer">
          Login
        </button>

        <button onClick={() => navigate('/signup')} className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition duration-300 shadow-md cursor-pointer">
          Signup
        </button>
      </nav>
    </header>
  );
};

export default Header;
