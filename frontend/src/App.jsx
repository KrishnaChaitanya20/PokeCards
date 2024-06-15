// frontend/src/App.jsx
import "styles/App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/HomePage";
import Cardspage from "pages/Cardspage";
import MatchPage from "pages/MatchPage";
import LoginPage from "pages/LoginPage"; // Assuming you have a LoginPage
import AdminDashboard from "pages/AdminDashboard"; // Assuming you have an AdminDashboard
import { useLogin } from "./LoginContext"; // Import useLogin

function App() {
  const { isLoggedIn } = useLogin(); // Use the login context

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
      element: isLoggedIn ? <MatchPage /> : <LoginPage />
    },
    {
      path: "/admin",
      element: <AdminDashboard />
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;