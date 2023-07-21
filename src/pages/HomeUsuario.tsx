import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Sinin from './../img/notification-bell-svgrepo-com.svg'

import Footer from '../components/Footer';
import {Button, Center, ChakraProvider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Image } from '@chakra-ui/react'
import Header, { HeaderUsu } from '../components/Header';
import { useState } from 'react';



const HomeUsuario = () => { 
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);


 return (
  <ChakraProvider>

    <HeaderUsu/>

    <div>

    <body>
      <section id='miranhatrem'>
        <div className='containerH1'>
          <div>
        <h1 className='xdUsu'>Olá, denunciante!</h1> {/* tentar centralizar certinho dps */}
          </div>
        </div>
      <article className='artiUsuario' id='barraRolagem'>
        <h1 className='h1Den'>Suas denúncias</h1><br></br>  
        <div className='containerUsu'>

          <div className='denunciasUsu'>
            <img src={img2} alt="imagem" className='imgUsu' />
            <br />
            <h2>sei n tlgd</h2>
            <h2>14:23 </h2>
            <h2>19/02/2002</h2>
          </div>

          <div className='denunciasUsu'>
            <img src={img2} alt="imagem" className='imgUsu' />
            <br />
            <h2>TITULO</h2>
            <h2>00:00 HORA</h2>
            <h2>04/04/2009 DATA</h2>
         </div>

    
         
        </div>
        <h3 className='h3Den'> <Link className='linkVermais' to="/MinhasDen"> Ver mais </Link> </h3>
    </article>

  <article id='arti'>
    <div className='bordinhaUsu'>
  <h1 className='h1Usu'>Nenhuma denúncia foi assumida para resolução.</h1>
    </div>
    <div className='containerUsu2'> </div>
  <h2 className='h2Usu'>Denúncias escolhidas pelas instituições aparecerão abaixo. </h2>
  <nav className='UsuNav'></nav>
 </article>



</section>

    </body>
        
  
 
     </div>
     <Footer/>
     </ChakraProvider>

  );
}

export default HomeUsuario;