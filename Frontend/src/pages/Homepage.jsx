import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col flex-1 items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center px-4">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to HealthMate</h2>
        <p className="text-lg max-w-xl mb-8">
          Manage your health records and family medical reports easily. Upload PDFs, track vitals, and get analysis in a few clicks.
        </p>
        <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition cursor-pointer">
          Get Started
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default Homepage