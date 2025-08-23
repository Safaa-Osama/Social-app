import MainLayout from "./Components/MainLayout/MainLayout";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./Components/Posts/Post";
import AuthProtectedRoute from "./Components/ProtectedRoute/AuthProtectedRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthContextProvider from "./Components/Context/AuthContext";
import PostDetails from "./Components/Posts/PostDetails";


const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "/profile", element: <ProtectedRoute>  <Profile />  </ProtectedRoute> },
      { path: "/post-details/:id", element: <ProtectedRoute> <PostDetails />  </ProtectedRoute> },
      { path: "/post", element: <ProtectedRoute>  <Post /> </ProtectedRoute> },
      { path: "/profile", element: <ProtectedRoute>  <Profile /> </ProtectedRoute> },


    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <AuthProtectedRoute> <Login /> </AuthProtectedRoute> },
      { path: "register", element: <AuthProtectedRoute> <Register /></AuthProtectedRoute> },
    ],
  }
]);

export default function App() {
  return (

    <AuthContextProvider>
      <RouterProvider router={router}> </RouterProvider>
    </AuthContextProvider>


  );
}
