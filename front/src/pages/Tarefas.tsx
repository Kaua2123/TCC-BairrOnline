//componentes
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';


//Chakra
import { ChakraProvider, Flex, HStack, Text, VStack, Image, Box, Center } from '@chakra-ui/react'

//imgs
import tarefa from '../img/tarefa.png'
import CardTarefaGrande from '../components/CardTarefaGrande';

import axios from "axios";

//react
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { SlideDenAcompanhamento, SlideDenAcompanhamentoConcluidos } from '../components/SlideDen';


export const Tarefas = () => {

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
    <ChakraProvider>
      <HeaderInst />
      <HStack w='full' h='64vh'>
        <Flex w='full' h='full'>
          <VStack m={20} alignItems='flex-start'>
            <Text color='#338bb0' fontSize='50px' fontFamily='BreeSerif-Regular' whiteSpace='nowrap'> Há trabalho a fazer, <br /> instituição.</Text>
            <Text mt={5}> Visualize suas <b>tarefas</b> a fazer, além das que já foram concluídas.</Text>
          </VStack>
        </Flex>
        <Flex w='full' h='full'>
          <Image src={tarefa} objectFit='cover' position='absolute' boxSize='35em' ml='100px' />
        </Flex>
      </HStack>
      <VStack>
        <Box>

          <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Em andamento</Text>
          
          <SlideDenAcompanhamento acompanhamentos={acompanhamentos}/>

        </Box>
        <Box>
     
            <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Concluidas</Text>
            <SlideDenAcompanhamentoConcluidos acompanhamentos={acompanhamentos}/>
        </Box>
      </VStack>
      <Footer />
    </ChakraProvider>

  )
}
