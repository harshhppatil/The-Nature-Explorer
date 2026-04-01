import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
        🌿 Nature Explorer
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium">
        <Link to="/explore" className="hover:text-green-200 transition-colors">Explore</Link>

        {user ? (
          <>
            <Link to="/wishlist" className="hover:text-green-200 transition-colors">Wishlist</Link>
            <Link to="/add-place" className="hover:text-green-200 transition-colors">Add Place</Link>
            <Link to="/profile" className="hover:text-green-200 transition-colors">Profile</Link>
            <span className="text-green-300">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-green-800 px-3 py-1 rounded-lg font-semibold hover:bg-green-100 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-200 transition-colors">Login</Link>
            <Link
              to="/register"
              className="bg-white text-green-800 px-3 py-1 rounded-lg font-semibold hover:bg-green-100 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;