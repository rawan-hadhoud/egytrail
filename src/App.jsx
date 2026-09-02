import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import Destinations from "./pages/Destinations";
import TripPlanner from "./pages/TripPlanner";
import DestinationDetails from "./pages/DestinationDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App(){
const router = createBrowserRouter([

  {
    path:"/",element:<Layout />, children:[
      {index:true,element:<Home />},
      {path:"destinations",element:<Destinations />},
      {path:"destinations/:id",element:<DestinationDetails />},
      {path:"trip-planner",element:<TripPlanner />},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"my-bookings",element:<MyBookings />},
      {path:"favorites",element:<Favorites />},
       {path:"*",element:<NotFound />}
    ]
  }
])

return (
  <RouterProvider router={router}/>
)
}

export default App;