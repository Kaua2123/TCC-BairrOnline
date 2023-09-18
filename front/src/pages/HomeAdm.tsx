import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Comentarios from '../components/Comentarios';
import { useState } from 'react';
import { Reportar } from '../components/reportar';

//componentes 
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { HeaderADM, HeaderUsu } from '../components/Header';

const HomeADM = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

  const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;

  let headerComponent = null;

  if (decodificaToken && decodificaToken.usu_tipo === 'administrador') {
    headerComponent = <HeaderADM />;
  } 


 return (
  <ChakraProvider>
      {headerComponent}
        
        <Footer/>
        

     </ChakraProvider>

  );
}

export default HomeADM;