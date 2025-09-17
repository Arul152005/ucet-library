import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Button from "../../component/Button";

import avatar1 from "../../assets/avatar-1.svg";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-102px)] p-5 bg-dimWhite">
      <div className="relative z-[5] w-[90%] max-w-[490px] rounded-xl bg-white shadow-xl py-10 px-8 sm:w-[65%] lg:w-[35%]">
        <div className="flex justify-center items-center mb-6">
          <img src={avatar1} alt="avatar" className="h-[50px] w-[50px] object-contain" />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-bold text-primary mb-2">
            Student Login
          </h1>
          <p className="font-poppins text-[14px] text-primary">
            Admins,{" "}
            <Link
              to="/AdminLogin"
              className="cursor-pointer text-secondary hover:underline transition-all duration-200"
            >
              click here to login
            </Link>
          </p>
        </div>

        <Form className="space-y-6">
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
          <Button type="submit" styles="w-full mt-4">
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default StudentLogin;