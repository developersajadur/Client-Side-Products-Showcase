import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Layout/Root.jsx';
import Shop from './Components/Pages/Shop/Shop.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import Register from './Components/Forms/Register.jsx';
import Login from './Components/Forms/Login.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      { path: "/", element:<Shop/> },
    ],
  },
  { path: "/register", element:<Register/> },
  { path: "/login", element:<Login/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
