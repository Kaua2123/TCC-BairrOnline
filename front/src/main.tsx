import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import MinhasDen from './pages/MinhasDen.tsx';
import './App.css'

//rotas, componentes
import Home from './pages/Home.tsx'
import HomeADM from './pages/HomeAdm.tsx'
import Login from './pages/Login.tsx'
import Denuncie from './components/Denuncie.tsx'
import Cadastro from './pages/Cadastro.tsx';
import VerDenuncia from './pages/VerDenuncia.tsx';
import Gerenciador from './pages/GerenciadorDen.tsx'
import HomeUsuario from './pages/HomeUsuario.tsx';
import HomeInst from './pages/HomeInst.tsx';
import SaibaMais from './pages/saibaMais.tsx';
import Deslogado from './pages/Deslogado.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  
  {
    path:"/HomeUsuario",
    element: <HomeUsuario/>,
  },
  
  {
    path: "/Gerenciar",
    element: <Gerenciador/>,
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

 /* {
    path: "/MinhasDen",
    element: <MinhasDen/>,
  },
*/
  {
    path: "/Deslogado",
    element: <Deslogado/>
  },

  {
    path:"/homeADM",
    element: <HomeADM/>
  },
  {
    path:"/homeInst",
    element: <HomeInst/>
  },
  {
    path: "/SaibaMais",
    element: <SaibaMais/>
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
