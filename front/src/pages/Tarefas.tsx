//componentes
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';


//Chakra
import {ChakraProvider, Flex, HStack, Text, VStack, Image, Box, Center } from '@chakra-ui/react'

//imgs
import tarefa from '../img/tarefa.png'


export const Tarefas = () => {

    return(
        <ChakraProvider>
            <HeaderInst/>
            <HStack w='full' h='100vh'> 
          <Flex w='full'h='full'>
            <VStack m={20} alignItems='flex-start'>
            <Text color='#338bb0' fontSize='50px' fontFamily='BreeSerif-Regular' whiteSpace='nowrap'> Há trabalho a fazer, <br /> instituição.</Text>
            <Text mt={5}> Visualize suas <b>tarefas</b> a fazer, além das que já foram concluídas.</Text>
            </VStack>
          </Flex>
          <Flex w='full' h='full'>
          <Image src={tarefa} objectFit='cover' position='absolute' boxSize='35em'  ml='100px' />
          </Flex>
            </HStack>
          <VStack>
            <Box>
          <Center>
          <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Em andamento</Text>
        </Center>
      </Box>
      <Box>
          <Center>
          <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Concluidas</Text>
        </Center>
      </Box>
      </VStack>
            <Footer/>
        </ChakraProvider>

    )
}
