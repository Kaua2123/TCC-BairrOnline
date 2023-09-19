import '../App.css';

import { useState } from 'react';

//chakra
import { ChakraProvider, Flex, HStack, Text, IconButton, Box } from '@chakra-ui/react';


//componentes 


import jwt_decode from 'jwt-decode';
import { HeaderADM, HeaderUsu } from '../components/Header';

import { Sidebar } from '../components/ADM/Sidebar';
import { MdMenu } from 'react-icons/md';
import { CardsReportadas } from '../components/ADM/CardsReportadas';
import { GestaoDenuncias } from '../components/ADM/GestaoDenuncias';

const HomeADM = () => {


  const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;

  let headerComponent = null;

  if (decodificaToken && decodificaToken.usu_tipo === 'administrador') {
    headerComponent = <HeaderADM />;
  } 

  const [menuClicado, setMenuClicado] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState()

  return (

  

    <ChakraProvider>
    <HStack w='full' h='100vh' bg='gray.200' padding={10}>
        <Flex as='aside' w={menuClicado ? '5vw' : 'full'} transition='width 0.2s ease-in-out' h='full' maxW={350} bg='white' alignItems='center' padding={3}
            flexDirection='column' justifyContent='space-between' borderRadius='3xl'>
              <Sidebar menuClicado={menuClicado} secaoAtiva={secaoAtiva} setSecaoAtiva={setSecaoAtiva}/>
        </Flex>
       
        
        

        <Flex as='main' overflowY='auto' w='full' h='full' bg='white'  flexDirection='column'
        position='relative' borderRadius='3xl'>
           <IconButton aria-label='xd' icon={<MdMenu/>} position='absolute' top={6} left={6} onClick={menuClicado ? () => setMenuClicado(false) : () => setMenuClicado(true)}></IconButton>
           
          {secaoAtiva === 'gestaoDenuncias' && (
            <HStack w='full' m='80px'>
              <GestaoDenuncias/>
            </HStack>
          )}
      
        
           
        </Flex>
       
    </HStack>
    </ChakraProvider>
)
}

export default HomeADM;