import "styles/App.css"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import HomePage from "pages/HomePage";
import Cardspage from "pages/Cardspage";
import MatchPage from "pages/MatchPage";
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<HomePage/>
    },
    {
      path:"/cards",
      element:<Cardspage/>
    },
    {
      path:"/match",
      element:<MatchPage/>
    }

  ])

  return (
    <div style={{minHeight:'100vh'}}>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
