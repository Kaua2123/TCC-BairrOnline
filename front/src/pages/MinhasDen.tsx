//CHAKRA
import { ChakraProvider, Button, Box, Flex, Image, Grid, Text, Center, Container, GridItem, IconButton, Wrap, WrapItem, } from "@chakra-ui/react";

//componentes
import Header, { HeaderUsu, HeaderInst } from "../components/Header";
import Footer from "../components/Footer";

//sla
import jwt_decode from "jwt-decode";
import { HashLink as Link } from 'react-router-hash-link';

//imgs
import Logo from '../img/logo.svg';

//icones
import {FaUndo} from 'react-icons/fa';
import {FaRegTrashAlt} from 'react-icons/fa';
import {PiMagnifyingGlassBold} from 'react-icons/pi';


const MinhasDen = () => {
    
    const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;
  
  let headerComponent = null;
  
  if (decodificaToken && decodificaToken.usu_tipo === 'denunciante') {
    headerComponent = <HeaderUsu />;
  } else if (decodificaToken && decodificaToken.usu_tipo === 'instituicao') {
    headerComponent = <HeaderInst />;
  } else {
    headerComponent = <Header/>;
  }
    return(
        <ChakraProvider>
            {headerComponent}

            <Flex justify='space-between'  direction={{base: 'column', md: 'row'}}>
              <Flex direction='column' align='flex-end' bgColor='#338bb0' w='50%' h='30em'>
                <Box p='120px'>
                <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' color='white'>Minhas denúncias 2 nome temporairo</Text>
                <Text fontSize='20px' color='white' >Acompanhar denúncias, reverter exclusão <br/> e ver suas denúncias</Text>
                <Text fontSize='15px' color='white'>Exibição detalhada das funções do usuário</Text>
                </Box>
              </Flex>

              <Flex direction='column' w='60%' flexWrap='wrap' align='flex-end'>
                <Box p='200px'> 
                  <Text mt='-40px' fontSize='35px' color='#338bb0' fontFamily='BreeSerif-Regular' align='center'>Acesso rápido</Text>
                  <Wrap spacing={8}>
                    <WrapItem>
                    <Link to={'/'}>
                  <IconButton boxSize='100px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<FaUndo size='60px' />}></IconButton >
                </Link>
                    </WrapItem>
                    <WrapItem>
                    <Link to={'/'}>
                  <IconButton boxSize='100px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<FaRegTrashAlt size='60px'/>}></IconButton >
                </Link>
                    </WrapItem>
                    <WrapItem>
                    <Link to={'/'}>
                  <IconButton boxSize='100px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<PiMagnifyingGlassBold size='60px'/>}></IconButton >
                </Link>
                    </WrapItem>
                  </Wrap>
                
                </Box>
                 

              
               
              </Flex>

      
            </Flex>
            <Footer/>
        </ChakraProvider>
    )
}

export default MinhasDen;