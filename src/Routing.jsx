import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./WebSitePages/Home";
import Login from "./WebSitePages/Login";
// import PageNotFound from "./WebSitePages/PageNotFound";
import Register from "./WebSitePages/Register";
// import Cart from "./WebSitePages/Cart";
import Admin from "./WebSitePages/Admin/Admin";
import ProtectedAdmin from "./Components/Protection";
import Dashboard from "./WebSitePages/Admin/Dashboard";
import Addproduct_2 from "./WebSitePages/Admin/Addproduct_2";
import ViewProducts_2 from "./WebSitePages/Admin/ViewProducts_2";
import UserGrid from "./WebSitePages/Admin/UserGrid";
import UserList from "./WebSitePages/Admin/UserList";
import UserProfile from "./WebSitePages/Admin/UserProfile";
import Orders from "./WebSitePages/Admin/Orders";
import ProductView from "./WebSitePages/ProductView";
import CheckOut from "./WebSitePages/CheckOut";
import Payment from "./WebSitePages/Payment";
import AboutUs from "./WebSitePages/AboutUs";
import ContactUs from "./WebSitePages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/productview", element: <ProductView /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/payment", element: <Payment /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/contactus", element: <ContactUs /> },
    ],
  },
  ,
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <Admin />
      </ProtectedAdmin>
    ),
    children: [
      { path: "/admin/dash", element: <Dashboard /> },
      { path: "/admin/add", element: <Addproduct_2 /> },
      { path: "/admin/edit/", element: <Addproduct_2 /> },
      { path: "/admin/view", element: <ViewProducts_2 /> },
      { path: "/admin/usergrid", element: <UserGrid /> },
      { path: "/admin/userlist", element: <UserList /> },
      { path: "/admin/userprofile", element: <UserProfile /> },
      { path: "/admin/orders", element: <Orders /> },
    ],
  },
  {
    path: "*",
    // element: <PageNotFound />,
  },
]);

export default router;
