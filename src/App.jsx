import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import Register from './components/Register.jsx';
import { ToastContainer } from "react-toastify";


function App() {

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
          path: "register/",
          element: <Register />
        }
      ]
    }
  ])

  return (
    <>
      <ToastContainer
        position="top-right"
      />
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
