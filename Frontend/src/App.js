import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./component/AppLayout";
import AdminLogin from "./features/AdminLogin/AdminLogin";
import StudentLogin from "./features/StudentLogin/StudentLogin";
import AdminDashboard from "./features/AdminDashboard/AdminDashboard";
import StudentDetails from "./features/AdminDashboard/StudentDetails";
import BookManagement from "./features/AdminDashboard/components/BookManagement";
import StudentManagement from "./features/AdminDashboard/components/StudentManagement";
import StudentBorrowedBooks from "./features/AdminDashboard/StudentBorrowedBooks";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

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
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/studentdetails",
          element: (
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/books",
          element: (
            <ProtectedRoute>
              <BookManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/students",
          element: (
            <ProtectedRoute>
              <StudentManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/students/:id/borrowed-books",
          element: (
            <ProtectedRoute>
              <StudentBorrowedBooks />
            </ProtectedRoute>
          ),
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;