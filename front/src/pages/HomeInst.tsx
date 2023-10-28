import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

//imgs
import sectionOlaInst from "../img/sectionOlaInst.png";
import sectionDenAssumidas from "../img/sectionDenAssumidas.png";
import tarefasInst from "../img/tarefasInst.png";



//chakra
import {Box, ChakraProvider, Flex, Image, extendTheme, Text, Card, CardBody, CardFooter, Stack, Heading, HStack } from '@chakra-ui/react'

//componentes
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';
import CardTarefa from '../components/CardTarefa';
import axios from 'axios';

//jwt
import jwtDecode from 'jwt-decode';


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

  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    if(decodificaToken.usu_tipo !== 'instituicao'){
      navigate('/');
    }
  }, [])


  const getAcompanhamento =  () => {

    const token = localStorage.getItem('token') //pegando token do usuario logado para exibir somente os acompanhamentos dele
    if (!token) {
      console.log('não autenticado')
      return;
    }

    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }


     axios.get(`http://localhost:3344/getAcompanhamento`)
      .then((response) => {
        setAcompanhamentos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar acompanhamentos', error);
      })

  }
  
  useEffect(() => {
    getAcompanhamento();
  }, [])

  


 return (

  
  <ChakraProvider theme={theme}>
    <HeaderInst/>

      <Box bg='white' borderRadius='4px' h='auto' w='100%'>
      <HStack w={{base: '', md: 'full'}} h='100vh'>
          
          <Flex w='full' h='full' display={{base: 'none', md: 'flex'}} id='denuncie'>

          <Flex flexDirection='column' alignItems='center'>
            <Text mt={14} fontFamily='BreeSerif-Regular' fontWeight='normal' color='#338bb0' fontSize='45px'>Olá, instituição!</Text>
            <Image src={sectionOlaInst} boxSize='40em'/>
          </Flex>

          </Flex>


          <Flex w='full' h='full' alignItems='center' justifyContent='center'>
            <Stack w='full' maxW='md' spacing={4} p={{base: '18', md: '6'}}>
            <Heading fontSize={{base: '32px', md: '35px'}} color='#338bb0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Seção do Usuário</Heading>
            <Text fontSize={{base: '20px', md: '25px'}}  whiteSpace='nowrap'>Proponha <b>soluções</b> para as <br/><b>reclamações</b> dos denunciantes</Text>
          
            </Stack>
          </Flex>
       
          </HStack>


          <Flex justifyContent='space-between'> 

          <Flex direction='column' mt={20}> 
          <Image src={tarefasInst} boxSize='38em'></Image>
            
          </Flex>

          <Flex direction='column'>
          <Box p='100px' mr='40px' mt='40px'>
              <Text fontSize='44px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Gerenciar tarefas</Text>
          </Box>
          
          
          <Stack spacing={7} direction='column'>

          {acompanhamentos.map((acompanhamento) => (
          <CardTarefa key={acompanhamento.aco_num} acompanhamento={acompanhamento} />
        ))}

         
    
          </Stack>
         

          


          
      
            <Flex>
   
            </Flex>
          </Flex>
          
    
        </Flex>
      </Box>


     <Footer/>
     </ChakraProvider>

  );
};

export default HomeInst;