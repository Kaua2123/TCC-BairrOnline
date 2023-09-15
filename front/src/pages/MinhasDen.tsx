//CHAKRA
import { ChakraProvider, Button, Box, Flex, Image, Grid, Text, Card, Center, Container, GridItem, IconButton, Wrap, WrapItem, HStack, VStack, } from "@chakra-ui/react";

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
import {FiFilter} from 'react-icons/fi';
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
              <Flex direction='column' align='flex-end' bgColor='#338bb0' w='50%' h='40em'>
                <Box m='120px'>
                <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' color='white'>Denúncias detalhadas</Text>
                <Text fontSize='20px' color='white' >Acompanhar denúncias, reverter exclusão <br/> e ver suas denúncias</Text>
                <Text fontSize='15px' color='white'>Exibição detalhada das funções do usuário</Text>
                </Box>
              </Flex>

              <Flex direction='column' w='50%' flexWrap='wrap' align='flex-end'>
                <Box m='200px'> 
                  <Text mt='-40px' py='60px' fontSize='35px' color='#338bb0' fontFamily='BreeSerif-Regular' align='center'>Acesso rápido</Text>
                  <HStack spacing={8}>
                  
                    <Link to={'/'}>
                  <IconButton boxSize='80px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<FaRegTrashAlt size='40px' />}></IconButton >
                </Link>
                    
                  
                    <Link to={'/'}>
                  <IconButton boxSize='80px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<FaUndo size='40px'/>}></IconButton >
                </Link>
                    
                  
                    <Link to={'/'}>
                  <IconButton boxSize='80px' aria-label="xd" _hover={{color: '#338bb0'}} icon={<PiMagnifyingGlassBold size='40px'/>}></IconButton >
                </Link>
                    
                  </HStack>
                
                </Box> 
              </Flex>
            </Flex>
            <Flex justify='space-between'>
              <Flex direction='column' bgColor='gray.200' w='50%' h='40em' alignItems='center'>
                <Box m='120px' boxShadow='lg' bgColor='white' w='500px' h='80px' textAlign='center' alignItems='center'>
                
                    <Text fontFamily='BreeSerif-Regular' fontSize='35px' justifyContent='center'>
                      Funcionalidades:
                    </Text>
                </Box>

<Center>
                <Grid templateColumns="repeat(3, 1fr)" gap={8} w='80%' alignContent='center'>
  
          <GridItem colSpan={1}>
            <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
              <FaRegTrashAlt size='70px'/>
            </Card>
            <Text mt='1em' fontSize='18px' textAlign='center'>Delete as suas<br/> denúncias de  forma<br/> simples e facilitada</Text>
          </GridItem>

       
          <GridItem colSpan={1}>
            <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
              <FaUndo size='70px'/>
            </Card>
            <Text mt='1em' fontSize='18px' textAlign='center'>Excluiu alguma<br/> denúncia por engano?<br/> Basta reverter aqui</Text>
          </GridItem>

          <GridItem colSpan={1}>
          <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
                    <PiMagnifyingGlassBold size='70px'/>
                  </Card>
             
              <Text mt='1em' fontSize='18px' textAlign='center'> Acompanhe suas<br/> denúncias quanto<br/> ao feedback das instituições</Text>
           
          </GridItem>
        </Grid>
        </Center>

              </Flex>
              <Flex direction='column' justify='center' alignItems='center' mt={4}>
              <VStack spacing={4} alignItems='center' mr={40}>
                <FiFilter size='320px'/>
                <Text fontSize='18px'>Não se esqueça de utilizar o filtro para<br/> uma melhor eficiência no manuseio<br/> das denúncias.
                  Ainda, também<br/> na visualização das denúncias feitas<br/> por outros usuários. Denuncie conosco!
                </Text>
              </VStack>
              </Flex>
            </Flex>

            <Box pt='40px'>
              <Center>
              <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Acompanhar Denúncias</Text>
              </Center>
              <Box>Aq vai ter algo dps tlggggggg</Box>
            </Box>

            <Box pt='40px'>
              <Center>
              <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Denúncias Excluidas</Text>
              </Center>

              <Flex justify='space-between'>
                
                <Flex direction='column'>
                  <Box m='100px'>
                  AQUI ONDE VAO FICAR AS DENNCIAS EXCLUIDAS
                  </Box>
                </Flex>
                <Flex direction='column'>
                  <Box m='100px'>
                  AQUI ONDE VAO PODER SER REVERTIDAS E PESQUISADAS
                  </Box>
                </Flex>
              </Flex>
              
            </Box>

            <Footer/>
        </ChakraProvider>
    )
}

export default MinhasDen;