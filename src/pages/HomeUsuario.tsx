import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Sinin from './../img/notification-bell-svgrepo-com.svg'

import Footer from '../components/Footer';
import {Button, Center, ChakraProvider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Image } from '@chakra-ui/react'

import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';


const HomeUsuario = () => { 
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (
  <ChakraProvider>
    <div>

      <Flex w='100%'  bg='#322F2F' boxShadow='xl' > 

          <Center>
          <Menu>
            <MenuButton bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
            <MenuItem  >BairrOnline</MenuItem>
            <MenuItem  as='a' href="#">Sobre nós</MenuItem>
            <MenuItem as='a' href="#">Contate-nos</MenuItem>
            </MenuList>
          </Menu>
          </Center>

          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>

          <Spacer/>
          
            <HStack w='25%' spacing='20' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                  <Link to='/Denuncie'> Denuncie aqui</Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              mr='-10'>
                 <Link to='/'> Acompanhar denúncias</Link>
              </Button> 
            </HStack>
            <Spacer/>

            <HStack spacing='4'>
              <Button colorScheme='blackAlpha' _hover={{backgroundColor: 'white', color: '#338bb0'}}> <Link to='/Cadastro'> Cadastre-se </Link> </Button>
              <Button colorScheme='blackAlpha' _hover={{backgroundColor: 'white', color: '#338bb0'}} mr='4' >  <Link to='/Login'> Login </Link></Button>
            </HStack>
          

      </Flex>
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