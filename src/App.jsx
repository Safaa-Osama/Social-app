import MainLayout from "./Components/MainLayout/MainLayout";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Postdetails from "./Pages/Postdetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "post-details", element: <Postdetails /> },
    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
