import '../App.css';

import { useState, useEffect } from 'react';

//chakra
import { ChakraProvider, Flex, HStack, Text, IconButton, Box } from '@chakra-ui/react';


//componentes 


import jwt_decode from 'jwt-decode';
import { HeaderADM, HeaderUsu } from '../components/Header';

import { Sidebar } from '../components/ADM/Sidebar';
import { MdMenu } from 'react-icons/md';
import { CardsReportadas } from '../components/ADM/CardsReportadas';
import { GestaoDenuncias } from '../components/ADM/GestaoDenuncias';
import { UsuariosReportados } from '../components/ADM/UsuariosReportados';

const HomeADM = () => {


  const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;

  let headerComponent = null;

  if (decodificaToken && decodificaToken.usu_tipo === 'administrador') {
    headerComponent = <HeaderADM />;
  } 

  const [menuClicado, setMenuClicado] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState()

  useEffect(() => {
   
    const redimensionar = () => { // se a tela for menor que 768px
      const isSmallScreen = window.innerWidth <= 768;
      setMenuClicado(isSmallScreen);
    }
  
    window.addEventListener('resize', redimensionar); // irá redimensionar o tamanho da sidebar
  
    return () => {
      window.removeEventListener('resize', redimensionar);
    };
  }, []);

  

  return (

  

    <ChakraProvider>
      {headerComponent}
    <HStack w='full' h='100vh' bg='gray.200' padding={10}>
        <Flex as='aside' w={menuClicado ? {base: '5vw'} : 'full'} transition='width 0.2s ease-in-out' h='full' maxW={350} bg='white' alignItems='center' padding={3}
            flexDirection='column' justifyContent='space-between' borderRadius='3xl'>
              <Sidebar menuClicado={menuClicado} secaoAtiva={secaoAtiva} setSecaoAtiva={setSecaoAtiva}/>
        </Flex>
       
        
        

        <Flex as='main' overflowY='auto' w='full' h='full' bg='white'  flexDirection='column'
        position='relative' borderRadius='3xl'>
           <IconButton aria-label='xd' icon={<MdMenu/>} position='absolute' top={6} left={6} onClick={menuClicado ? () => setMenuClicado(false) : () => setMenuClicado(true)}></IconButton>
           {secaoAtiva === 'gestaoDenuncias' && (
            <>
              <Text align='center' color='#338bb0' fontSize={{base: '0px', md: '25px'}} fontFamily='BreeSerif-Regular' mt={6}>Gestão de Denúncias</Text>
              <HStack w='1000px' m='70px' transition='opacity 0.5s ease-in-out'>
              <GestaoDenuncias secaoAtiva={secaoAtiva} menuClicado={menuClicado}/>
            </HStack>
            </>
           )}

           {secaoAtiva === 'usuariosReportados' && (
            <>
             <Text align='center' color='#338bb0' fontSize={{base: '0px', md: '25px'}} fontFamily='BreeSerif-Regular' mt={6}>Usuários reportados</Text>
             <HStack w='1000px' >
             <UsuariosReportados secaoAtiva={secaoAtiva} menuClicado={menuClicado}/>
             </HStack>
            
            </>
           )}

           {secaoAtiva === 'comentariosReportados' && (
            <>
             <Text align='center' color='#338bb0' fontSize={{base: '0px', md: '25px'}} fontFamily='BreeSerif-Regular' mt={6}>Comentários reportados</Text>
             <HStack w='1000px' >
             <UsuariosReportados secaoAtiva={secaoAtiva} menuClicado={menuClicado}/>
             </HStack>
            
            </>
           )}
           
         
          
      
        
           
        </Flex>
       
    </HStack>
    </ChakraProvider>
)
}

export default HomeADM;