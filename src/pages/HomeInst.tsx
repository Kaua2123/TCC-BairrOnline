import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link } from 'react-router-dom'
import { useState } from 'react';

//imgs
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import sectionOlaInst from "../img/sectionOlaInst.png";
import sectionDenAssumidas from "../img/sectionDenAssumidas.png";

import Sinin from './../img/notification-bell-svgrepo-com.svg'


//chakra
import {Button, Center, Box, 
ChakraProvider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, 
Image, extendTheme, Text, Wrap, WrapItem } from '@chakra-ui/react'

//componentes
import Footer from '../components/Footer';
import { HeaderUsu } from '../components/Header';
import CardDen from '../components/CardDen';


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
    <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
    <Flex align='center'>
      <Box bg='white' borderRadius='4px' h='250em' w='100%'>
        
        <Text p='100px' fontSize='64px' color='#338bb0' fontFamily='BreeSerif-Regular'>Olá, Instituição!</Text>

        <Flex justifyContent='space-between'>
          <Flex direction='column' mt='-200px'>
            <Image src={sectionOlaInst} boxSize='50em' ></Image>
          </Flex>

          <Flex direction='column' mr='140px' mt='50px'>
            <Box>
            <Text fontSize='44px' color='#338BB0'   fontFamily='BreeSerif-Regular' whiteSpace='nowrap' align='center'>Seção do Usuário</Text>
            </Box>  
            <Box mt='70px'>
            <Text fontSize='30px' whiteSpace='nowrap'>Veja as <b> reclamações </b> <br /> dos denunciantes<br /></Text>
            </Box>
          </Flex>
        </Flex>

        <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>

        <Flex justifyContent='space-between'> 

          <Flex direction='column'>
          <Box p='100px' mr='40px' mt='40px'>
              <Text fontSize='44px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Denúncias assumidas</Text>
            </Box>
            <Flex>
   
            </Flex>
          </Flex>
          <Flex direction='column'>
          <Image src={sectionDenAssumidas} boxSize='40em' w='2000px' mt='200px'></Image>
            
          </Flex>
    
        </Flex>
        <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>

      </Box>
      
    </Flex>




     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;