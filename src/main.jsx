import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import Register from './components/Register.jsx';
import { ToastContainer } from "react-toastify";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "verifyEmail/",
        element: <VerifyEmail />
      },
      {
        path: "register/:email",
        element: <Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
    <ToastContainer
      position="top-right"
    />
  </StrictMode>,
)
