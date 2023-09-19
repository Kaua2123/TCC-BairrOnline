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
import { ChakraProvider, Flex, HStack, Text, IconButton } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { HeaderADM, HeaderUsu } from '../components/Header';

import { Sidebar } from '../components/ADM/Sidebar';
import { MdMenu } from 'react-icons/md';

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
    <HStack w='full' h='100vh' bg='gray.200' padding={10}>
        <Flex as='aside' w='full' h='full' maxW={350} bg='white' alignItems='center' padding={3}
            flexDirection='column' justifyContent='space-between' borderRadius='3xl'>
              <Sidebar/>
        </Flex>
        {/* sidebar */}
        

        <Flex as='main' w='full' h='full' bg='white' alignItems='center' justifyContent='center' flexDirection='column'
        position='relative' borderRadius='3xl'>
            <IconButton aria-label='xd' icon={<MdMenu/>} position='absolute' top={6} left={6} onClick={() => null}></IconButton>
            <Text fontSize={100} color='gray.800'>ADM</Text>
        </Flex>
    </HStack>
    </ChakraProvider>
)
}

export default HomeADM;