//CHAKRA
import { ChakraProvider, Button, Box, Flex, Image, useToast, InputLeftElement, Grid, Text, Card, Center, Container, GridItem, IconButton, Wrap, WrapItem, HStack, VStack, Input, InputGroup, CardHeader, } from "@chakra-ui/react";

//componentes
import Header, { HeaderUsu, HeaderInst } from "../components/Header";
import Footer from "../components/Footer";

//sla
import jwt_decode from "jwt-decode";
import { HashLink as Link } from 'react-router-hash-link';

//imgs
import Logo from '../img/logo.svg';

//icones
import { FaUndo } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { BsListUl } from "react-icons/bs";

//react
import { useState, useEffect } from "react";

//axios
import axios from 'axios';

//componentes
import CardDenExcluida from "../components/CardDenExcluida";

const MinhasDen = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [denunciasExcluidas, setDenunciasExcluidas] = useState([]);
  const [denunciaExcluidaCod, setDenunciaExcluidaCod] = useState([]);
  const toast = useToast();

  async function getDenuncia() { //pega os dados da denuncia
    await axios.get('http://localhost:3344/cardDenuncia')
      .then(response => {
        setDenuncias(response.data)


      })
      .catch(error => {
        console.error(error);
      })

  }

  useEffect(() => {
    getDenuncia();

  }, [])

  async function getDenunciaExcluida() {
    await axios.get('http://localhost:3344/getDenunciaExcluida')
      .then(response => {
        setDenunciasExcluidas(response.data);
        const codigosExcluidos = response.data.map(denunciaExcluida => denunciaExcluida.den_cod);
        setDenunciaExcluidaCod(codigosExcluidos);
      })
      .catch(error => {
        console.error('Erro ao buscar as denúncias excluidas', error);
      });
  }

  useEffect(() => {
    getDenunciaExcluida();
  }, [])

  async function reverterDenunciaExcluida() {

    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    await axios.post(`http://localhost:3344/reverterDenunciaExcluida/${denunciaExcluidaCod}`)
      .then(response => {
        if (response) {
          toast({
            title: 'Sucesso',
            description: 'Sua denúncia foi revertida.',
            status: 'success',
            duration: 4000,
            isClosable: true
          });

        }
      })
      .catch(error => {
        if (error) {
          toast({
            title: 'Erro',
            description: 'Houve um erro ao reverter a denúncia excluída.',
            status: 'error',
            duration: 4000,
            isClosable: true
          });

        }
      })
  }


  const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;

  let headerComponent = null;

  if (decodificaToken && decodificaToken.usu_tipo === 'denunciante') {
    headerComponent = <HeaderUsu />;
  } else if (decodificaToken && decodificaToken.usu_tipo === 'instituicao') {
    headerComponent = <HeaderInst />;
  } else {
    headerComponent = <Header />;
  }


  return (
    <ChakraProvider>
      {headerComponent}

      <Flex justify='space-between' direction={{ base: 'column', md: 'row' }}>
        <Flex direction='column' align='flex-end' bgColor='#338bb0' w='50%' h='40em'>
          <Box m='120px'>
            <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' color='white'>Denúncias detalhadas</Text>
            <Text fontSize='20px' color='white' >Acompanhar denúncias, reverter exclusão <br /> e ver suas denúncias</Text>
            <Text fontSize='15px' color='white'>Exibição detalhada das funções do usuário</Text>
          </Box>
        </Flex>

        <Flex direction='column' w='50%' flexWrap='wrap' align='flex-end'>
          <Box m='200px'>
            <Text mt='-40px' py='60px' fontSize='35px' color='#338bb0' fontFamily='BreeSerif-Regular' align='center'>Acesso rápido</Text>
            <HStack spacing={8}>

              <Link to={'/'}>
                <IconButton boxSize='80px' aria-label="xd" _hover={{ color: '#338bb0' }} icon={<FaRegTrashAlt size='40px' />}></IconButton >
              </Link>


              <Link to={'/'}>
                <IconButton boxSize='80px' aria-label="xd" _hover={{ color: '#338bb0' }} icon={<FaUndo size='40px' />}></IconButton >
              </Link>


              <Link to={'/'}>
                <IconButton boxSize='80px' aria-label="xd" _hover={{ color: '#338bb0' }} icon={<PiMagnifyingGlassBold size='40px' />}></IconButton >
              </Link>

            </HStack>

          </Box>
        </Flex>
      </Flex>
      <Flex justify='space-between' h='53em'>
        <Flex direction='column' bgColor='gray.200' w='50%' alignItems='center' justifyContent='center'>
          <Box m='120px' boxShadow='lg' bgColor='white' w='500px' h='80px' textAlign='center' alignItems='center'>

            <Text fontFamily='BreeSerif-Regular' fontSize='35px' justifyContent='center'>
              Funcionalidades:
            </Text>
          </Box>

          <Center>
            <Grid templateColumns="repeat(3, 1fr)" gap={8} w='50%' alignContent='center' alignItems='center' mr={32}>

              <GridItem colSpan={1}>
                <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
                  <FaRegTrashAlt size='70px' />
                </Card>
                <Text mt='1em' fontSize='18px' textAlign='center'>Delete as suas<br /> denúncias de  forma<br /> simples e facilitada</Text>
              </GridItem>


              <GridItem colSpan={1}>
                <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
                  <FaUndo size='70px' />
                </Card>
                <Text mt='1em' fontSize='18px' textAlign='center'>Excluiu alguma<br /> denúncia por engano?<br /> Basta reverter aqui</Text>
              </GridItem>

              <GridItem colSpan={1}>
                <Card boxShadow='lg' w='150px' minH='150px' bg='white' display='flex' justifyContent='center' alignItems='center'>
                  <PiMagnifyingGlassBold size='70px' />
                </Card>

                <Text mt='1em' fontSize='18px' textAlign='center'> Acompanhe suas<br /> denúncias quanto<br /> ao feedback das instituições</Text>

              </GridItem>
            </Grid>
          </Center>

        </Flex>
        <Flex direction='column' justify='center' alignItems='center' mt={4}>
          <VStack spacing={4} alignItems='center' mr={40}>
            <FiFilter size='320px' />
            <Text fontSize='25px' textAlign='center' mt='140px'>Não se esqueça de utilizar o filtro para<br /> uma melhor eficiência no manuseio<br /> das denúncias.
              Ainda, também<br /> na visualização das denúncias feitas<br /> por outros usuários. Denuncie conosco!
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
          <Text color="#338bb0" fontSize='35px' pb='80px' fontFamily='BreeSerif-Regular'>Denúncias Excluidas</Text>
        </Center>

        <Flex justify='space-between'>

          <Flex direction='column'>
            {denunciasExcluidas.map((denunciaExcluida, index) => ( //mapeando as denuncias excluidas
              <CardDenExcluida key={index} denunciaExcluida={denunciaExcluida} />
              //key index para gerar um card novo a cada denuncia excluida
            ))}




          </Flex>
          <Flex direction='column' bgColor='gray.200'>
            <Box m='100px'>
              <HStack spacing={8} justifyContent='center'>
                <InputGroup>
                  <InputLeftElement>
                    <FiSearch />
                  </InputLeftElement>
                  <Input type='text' bgColor='white' placeholder="Pesquisar denúncia"></Input>
                </InputGroup>

                <InputGroup>
                  <InputLeftElement>
                    <BsListUl />
                  </InputLeftElement>
                  <Input type='text' bgColor='white' placeholder="Bairros"></Input>
                </InputGroup>

              </HStack>
            </Box>
          </Flex>
        </Flex>

      </Box>

      <Footer />
    </ChakraProvider>
  )
}

export default MinhasDen;