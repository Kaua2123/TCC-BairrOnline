import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link } from 'react-router-dom'
import { useState } from 'react';

//imgs
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import sectionOla from "../img/sectionOlaDenunciante.png";
import sectionDen from "../img/sectionDen.png";
import sectionInst from "../img/sectionInst.png";
import denunciaNaoAssumida from "../img/denunciaNaoassumida.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
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
        
        <Text p='100px' fontSize='64px' color='#338bb0' fontFamily='BreeSerif-Regular'>Olá, Denunciante!</Text>

        <Flex justifyContent='space-between'>
          <Flex direction='column' mt='-200px'>
            <Image src={sectionOla} boxSize='50em' ></Image>
          </Flex>

          <Flex direction='column' p='180px' mt='-150px'>
            <Box>
            <Text fontSize='44px' color='#338BB0'   fontFamily='BreeSerif-Regular' whiteSpace='nowrap' align='center'>Seção do Usuário</Text>
            </Box>  
            <Box mt='70px'>
            <Text fontSize='30px' whiteSpace='nowrap'>Veja suas <b color='green'> denúncias</b> e o <br /> retorno das instituições</Text>
            </Box>
          </Flex>
        </Flex>

        <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>

        <Flex justifyContent='space-between'> 

          <Flex direction='column'>
            <Image src={sectionDen} boxSize='50em' mt='200px'></Image>
          </Flex>

          <Flex direction='column'>
            <Box p='100px' mr='40px' mt='40px'>
              <Text fontSize='44px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Suas denúncias</Text>
            </Box>
            <Flex>
         
              <Wrap spacing='20px'>
                <WrapItem>
                  <CardDen/>
                </WrapItem>

                <WrapItem>
                  <CardDen/>
                </WrapItem>
                
            </Wrap>
          
         
            </Flex>
          </Flex>
    
        </Flex>
        <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
        <Flex justify='center'>
          <Image src={sectionInst} boxSize='57em'></Image>
        </Flex>
        <Flex justify='center'>
          <Text mt='-100px' fontSize='54px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Denúncias assumidas</Text>
        </Flex>

        <Flex justify='center'>
          <Image src={denunciaNaoAssumida} boxSize='45em'></Image>
        </Flex>

        <Flex justify='center'>
        <Text mt='-100px' fontSize='30px'  whiteSpace='nowrap'>Parece que nenhuma instituição assumiu alguma denúncia sua.</Text> 
        </Flex>

      </Box>
    </Flex>




     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;