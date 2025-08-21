import MainLayout from "./Components/MainLayout/MainLayout";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Postdetails from "./Pages/Postdetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./Components/Posts/Post";
import AuthContextProvider from "./Components/Context/AuthContext";


const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "post-details/:id ", element: <Postdetails /> },
      { path: "post", element: <Post /> },
      { path: "profile", element: <Profile /> },


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
<AuthContextProvider>
      <RouterProvider router={router}>

      </RouterProvider>
</AuthContextProvider>

  );
}
