import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
//   const isAuthenticated = currentUser !== null;
//   console.log(navigation.state, "navigation", pathname);
//   const isLoading = navigation.state === "loading";

  return (
    <div
     div className="min-h-screen" 
    >
      {/* {isLoading && <Loader />} */}
      {/* {true && <Loader />} */}
      <div >
        <div >
          <Navbar />
        </div>
      </div>
      <main className="main-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
