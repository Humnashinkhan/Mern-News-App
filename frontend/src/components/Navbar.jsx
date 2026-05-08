import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        MERN News App
      </h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;