const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-inner">
      <p className="text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="font-semibold text-white">HealthMate</span> — All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer