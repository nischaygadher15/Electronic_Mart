import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./WebSitePages/Home";
import Login from "./WebSitePages/Login";
import PageNotFound from "./WebSitePages/PageNotFound";
import Register from "./WebSitePages/Register";
import Products from "./WebSitePages/Products";
import Cart from "./WebSitePages/Cart";
import Admin from "./WebSitePages/Admin/Admin";
import ProtectedAdmin from "./Components/Protection";
import Dashboard from "./WebSitePages/Admin/Dashboard";
import Addproduct_2 from "./WebSitePages/Admin/Addproduct_2";
import ViewProducts_2 from "./WebSitePages/Admin/ViewProducts_2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
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
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
