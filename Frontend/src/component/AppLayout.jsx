import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/AdminLogin");
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="relative">
          <Navbar />
          {admin && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <main className="main-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;