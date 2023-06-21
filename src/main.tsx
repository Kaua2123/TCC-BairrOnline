import React from 'react'
import ReactDOM from 'react-dom/client'

import './App.css'

import Home from './pages/Home.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx'
import Denuncie from './pages/Denuncie.tsx'
import Cadastro from './pages/Cadastro.tsx';
import VerDenuncia from './pages/VerDenuncia.tsx';
import MinhasDen from './pages/MinhasDen.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },

  {
    path: "/Login",
    element: <Login/>,
  },

  {
    path: "/Cadastro",
    element: <Cadastro/>,
  },

  {
    path: "/Denuncie",
    element: <Denuncie/>,
  },

  {
    path: "/VerDenuncia",
    element: <VerDenuncia/>,
  },

  {
    path: "/MinhasDen",
    element: <MinhasDen/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
