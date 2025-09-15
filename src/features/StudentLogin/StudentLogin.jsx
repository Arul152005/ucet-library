import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Button from "../../component/Button";

import avatar1 from "../../assets/avatar-1.svg";

// import { notifySuccess, notifyFailure } from "../../utils/notifications";
// import { ToastContainer } from "react-toastify";
// import OAuth from "../../components/OAuth";
// import Spinner from "../../components/Spinner";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

  
  return (
    <section className={`flex justify-center items-center h-full  p-5 flex-grow-0 bg-dimWhite`}>
      {/* <Spinner isOpen={loading} /> */}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
        className={`xl:max-w-[1280px] w-full flex justify-center items-center mt-2 rounded-sm`}
      /> */}
      {/* <div
        className={`xl:max-w-[1280px] w-full h-full flex justify-center items-center overflow-hidden`}
      > */}
        <div
          className={`relative z-[5]  w-[90%] max-w-[490px] h-[75%] rounded-md bg-white shadow-lg py-8 ss:w-[60%] sm:w-[65%] lg:w-[35%]`}
        >
          <div className={`flex justify-center items-center mb-[-5px]`}>
            <img src={avatar1} alt="logo" className=" h-[40px] w-[40px]" />
          </div>

          <div>
            <h1 className="mt-4 text-center font-poppins text-3xl text-[18px] font-semibold text-primary">
              Student Login
            </h1>
            <p className="text-center font-poppins text-[14px] text-primary">
              Admins,{" "}
              <Link
                to="/AdminLogin"
                className="cursor-pointer text-secondary hover:underline"
              >
                click here to login in
              </Link>
            </p>
          </div>

          <div className="mx-8 flex flex-col ">
            <Form className="mb-1 mt-8" >
              <div className="mb-4 flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-poppins font-medium text-primary"
                >
                  Email
                </label>
                <input
                  className="rounded-md border-[2px] border-[#D8DADC] p-2 focus:border-primary focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="font-poppins font-medium text-primary"
                >
                  Password
                </label>
                <input
                  className="rounded-md border-[2px] border-[#D8DADC] p-2 focus:border-primary focus:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                />
              </div>
              <Button type="submit"  styles={`w-full mt-5`}>
                Login
              </Button>
            </Form>

          </div>
        </div>

      {/* </div> */}
    </section>
  );
}

export default StudentLogin;
