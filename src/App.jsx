import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./Homepage.jsx";
import Register from "./LeftSideNav/Register.jsx"
import Login from "./LeftSideNav/Login.jsx"

function App() {
  
   const Router=createBrowserRouter([{
    path:"/",
    element:<Homepage/>
   }
  ,
  {
   path:"/Register",
   element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
   }
 

  ])
  return(
    
    <RouterProvider router={Router}>
    </RouterProvider>
  
  );
}

export default App;
