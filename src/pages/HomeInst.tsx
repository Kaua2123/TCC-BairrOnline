import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link } from 'react-router-dom'
import { useState } from 'react';

//imgs
import sectionOlaInst from "../img/sectionOlaInst.png";
import sectionDenAssumidas from "../img/sectionDenAssumidas.png";
import tarefasInst from "../img/tarefasInst.png";



//chakra
import {Box, ChakraProvider, Flex, Image, extendTheme, Text, Card, CardBody, CardFooter } from '@chakra-ui/react'

//componentes
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';
import CardTarefa from '../components/CardTarefa';



const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "",
      },
    }),
  },
});


const HomeInst = () => { 


 return (
  <ChakraProvider theme={theme}>
    <HeaderInst/>
    <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
    <Flex align='center'>
      <Box bg='white' borderRadius='4px' h='auto' w='100%'>
        
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
          <Image src={tarefasInst} boxSize='44em'></Image>
            
          </Flex>

          <Flex direction='column'>
          <Box p='100px' mr='40px' mt='40px'>
              <Text fontSize='44px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Gerenciar tarefas</Text>
          </Box>
          <Flex>
            <CardTarefa/>
          </Flex>
            <Flex>
   
            </Flex>
          </Flex>
          
    
        </Flex>
      </Box>
      
    </Flex>
    <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>





     <Footer/>
     </ChakraProvider>

  );
};

export default HomeInst;