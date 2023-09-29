//componentes
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';


//Chakra
import {ChakraProvider, Flex, HStack, Text, VStack, Image } from '@chakra-ui/react'

//imgs



export const Tarefas = () => {

    return(
        <ChakraProvider>
            <HeaderInst/>
            <HStack w='full' h='100vh'> 
          <Flex w='full'h='full'>
            <VStack m={20} alignItems='flex-start'>
            <Text color='#338bb0' fontSize='50px' fontFamily='BreeSerif-Regular' whiteSpace='nowrap'> Há trabalho a fazer, instituição.</Text>
            <Text mt={5}> Visualize suas <b>tarefas</b> a fazer, além das que já foram concluídas.</Text>
            </VStack>
          </Flex>
          <Flex w='full' h='full'>
            <Image/>
          </Flex>
               
               
            </HStack>
            <Footer/>
        </ChakraProvider>

    )
}
