import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/HomePage";
import Cardspage from "pages/Cardspage";
import MatchPage from "pages/MatchPage";
import LoginPage from "pages/LoginPage";
import AdminLoginPage from "pages/AdminLoginPage";
import AdminDashboard from "pages/AdminDashboard";
import { useAdminLogin } from "./AdminLoginContext";
import { useLogin } from "./LoginContext"; 

function App() {
  const { isLoggedIn } = useLogin(); 
  const { isAdmin } = useAdminLogin();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: "/cards",
      element: <Cardspage />
    },
    {
      path: "/match",
      element: isLoggedIn ? <MatchPage /> : <LoginPage to="/match"/>
    },
    {
      path: "/admin",
      element: isAdmin ? <AdminDashboard /> : <AdminLoginPage to="/admin"/>
    },
    {
      path: "/login",
      element: <LoginPage />
    },{
      path: "/adminlogin",
      element: <AdminLoginPage />
    }
  ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;