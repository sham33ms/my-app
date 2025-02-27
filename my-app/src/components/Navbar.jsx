import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const handleLogout = () => {
    localStorage.removeItem("token");  // ✅ Remove JWT token
    // window.location.href = "/login";   // 🔄 Redirect to login page
    navigate("/login"); // Redirect to login page
  };
  

  return (
    <nav className="navbar">
      <div className="home">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home  
        </Link>
        <Link to="/products?page=1" className={location.pathname === "/products" ? "active" : ""}>
          Product List
        </Link>
      </div>
      <div className="log">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
