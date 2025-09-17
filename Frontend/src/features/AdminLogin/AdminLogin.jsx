import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useAuth } from "../../context/AuthContext";

import avatar1 from "../../assets/avatar-1.svg";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ email, password });
      
      if (result.success) {
        // Navigate to admin dashboard
        navigate("/AdminDashboard");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-102px)] p-5 bg-dimWhite">
      <div className="relative z-[5] w-[90%] max-w-[490px] rounded-xl bg-white shadow-xl py-10 px-8 sm:w-[65%] lg:w-[35%]">
        <div className="flex justify-center items-center mb-6">
          <img src={avatar1} alt="avatar" className="h-[50px] w-[50px] object-contain" />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-bold text-primary mb-2">
            Admin Login
          </h1>
          <p className="font-poppins text-[14px] text-primary">
            Students,{" "}
            <Link
              to="/StudentLogin"
              className="cursor-pointer text-secondary hover:underline transition-all duration-200"
            >
              click here to login
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-poppins font-medium text-primary"
            >
              Email
            </label>
            <input
              className="rounded-lg border-2 border-[#D8DADC] p-3 focus:border-secondary focus:outline-none transition-colors duration-200"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-poppins font-medium text-primary"
            >
              Password
            </label>
            <input
              className="rounded-lg border-2 border-[#D8DADC] p-3 focus:border-secondary focus:outline-none transition-colors duration-200"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
          </div>
          <Button type="submit" styles="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;