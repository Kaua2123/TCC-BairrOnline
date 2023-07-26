import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link } from 'react-router-dom'
import { useState } from 'react';

//imgs
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import Sinin from './../img/notification-bell-svgrepo-com.svg'

//chakra
import {Button, Center, Box, 
ChakraProvider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, 
Image, extendTheme } from '@chakra-ui/react'

//componentes
import Footer from '../components/Footer';
import { HeaderUsu } from '../components/Header';


const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "",
      },
    }),
  },
});


const HomeUsuario = () => { 


 return (
  <ChakraProvider theme={theme}>

    <HeaderUsu/>






     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;