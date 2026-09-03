import App from "@/App";
import About from "@/Pages/About";
import Chat from "@/Pages/Chat";
import Contact from "@/Pages/Contact";
import Donate from "@/Pages/Donate";
import FindBlood from "@/Pages/FindBlood";
import ForgotPassword from "@/Pages/ForgotPassword";
import HomePage from "@/Pages/HomePage";
import Login from "@/Pages/Login";
import Posts from "@/Pages/Posts";
import Profile from "@/Pages/Profile";
import Register from "@/Pages/Register";
import ProtectedRoute from "@/components/ProtectedRoute";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        element: <ProtectedRoute />,

        children: [
          {
            path: "find-blood",
            element: <FindBlood />,
          },

          {
            path: "posts",
            element: <Posts />,
          },

          {
            path: "donate",
            element: <Donate />,
          },
        ],
      },
    ],
  },
]);