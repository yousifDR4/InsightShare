import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversations from "./pages/Coversations";
import Test from "./components/Conversation.jsx/test";
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Conversations",
      element: <Conversations />,
    },
    {
      path: "/Test",
      element: <Test />,
    },
  ]);
  return <RouterProvider router={Router}></RouterProvider>;
}

export default App;
