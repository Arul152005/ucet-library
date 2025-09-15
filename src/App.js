import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./component/AppLayout";
import AdminLogin from "./features/AdminLogin/AdminLogin";
import StudentLogin from "./features/StudentLogin/StudentLogin";
import AdminDashboard from "./features/AdminDashboard/AdminDashboard";
import StudentDetails from "./features/AdminDashboard/StudentDetails";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <AdminLogin />,
        },
        {
          path: "/AdminLogin",
          element: <AdminLogin />,
        },
        {
          path: "/StudentLogin",
          element: <StudentLogin/>,
        },
        {
          path: "/AdminDashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/studentdetails",
          element: <StudentDetails />,
        }
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
