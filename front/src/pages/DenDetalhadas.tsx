//CHAKRA
import { ChakraProvider, Button, Kbd, Box, Flex, Icon, Image, useToast, InputLeftElement, Grid, Text, Card, Center, Container, GridItem, IconButton, Wrap, WrapItem, HStack, VStack, Input, InputGroup, CardHeader, CardBody, CardFooter, Heading, Stack, } from "@chakra-ui/react";

//componentes
import Header, { HeaderUsu, HeaderInst } from "../components/Header";
import Footer from "../components/Footer";

//sla
import jwt_decode from "jwt-decode";
import { HashLink as Link } from 'react-router-hash-link';

//imgs
import Logo from '../img/logo.svg';
import semImgDen from '../img/semImgDen.png';

//icones
import { FaUndo, FaTrash } from 'react-icons/fa';
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

//swiper

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SlideDenExcluida } from "../components/SlideDen";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MinhasDen = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [denunciasExcluidas, setDenunciasExcluidas] = useState([]);
  const [denunciasExcluidasFiltradas, setDenunciasExcluidasFiltradas] = useState([]);
  const [denunciaExcluidaCod, setDenunciaExcluidaCod] = useState();
  const [pesquisa, setPesquisa] = useState('');
  const [denunciasPorPagina, setDenunciasPorPagina] = useState(5);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();


  const carregarMaisDenuncias = () => {
    setPaginaAtual((prevPagina) => prevPagina + 1);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    if(decodificaToken.usu_tipo !== 'denunciante'){
      navigate('/');
    }
  }, [])


  async function getDenuncia() { //pega os dados da denuncia
    await axios.get('http://localhost:3344/getDenuncia')
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

    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }


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

          setTimeout(() => { // esperar um tempo e recarregar a pagina
            window.location.reload();
          }, 1000);
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

  const aoPesquisar = (e) => {
    if (e.key === 'Enter') {
      setPaginaAtual(1);
      const denunciasFiltradas = denunciasExcluidas.filter((denuncia) => denuncia.den_nome.toLowerCase().includes(pesquisa.toLowerCase()));
      setDenunciasExcluidasFiltradas(denunciasFiltradas);
    }
  }

  const inicioDenuncias = (paginaAtual - 1) * denunciasPorPagina;
  const denunciasExibidas = denunciasExcluidasFiltradas.slice(
    inicioDenuncias,
    inicioDenuncias + denunciasPorPagina
  );


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
          <Box m='120px' boxShadow='lg' bgColor='white' w='600px' h='80px' textAlign='center' alignItems='center'>

            <Text fontFamily='BreeSerif-Regular' fontSize='35px' justifyContent='center'>
              Funcionalidades:
            </Text>
          </Box>

          <Center>
            <Grid templateColumns="repeat(3, 1fr)" gap={8} w='57%' alignContent='center' alignItems='center' mr={32}>

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
            <Text fontSize='25px' mt='40px'>Não se esqueça de utilizar o filtro para<br /> uma melhor eficiência no manuseio<br /> das denúncias.
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

<Center>
        <Box h='auto' maxH='900px' w='1400px'  bg='white' boxShadow='lg' >

          <SlideDenExcluida denunciasExcluidas={denunciasExcluidas}/>

        </Box>
        </Center>


      <Box m='100px' borderRadius='12px' h='40vh' display='flex' alignItems='center' boxShadow='lg'>
        
        <VStack w='full'>
        <VStack justify='center'>
          <Text fontFamily='BreeSerif-Regular' fontSize='45px' color='#338bb0'>Simples,  e fácil.</Text>
          <Text>Abaixo, pesquise suas denúncias e faça a reversão das mesmas. Pressione ENTER para validar sua pesquisa.</Text>
        </VStack>

          <InputGroup mt={3} justifyContent='center'>
            <InputLeftElement>
              <FiSearch color='white' />
            </InputLeftElement>
            <Input type='text' w='30vw' color='white' _placeholder={{color: "white"}} bg='#338BB0' onChange={(e) => setPesquisa(e.target.value)} onKeyPress={aoPesquisar} placeholder="Pesquisar denúncia"></Input>

          </InputGroup>
          </VStack>
    
         

       
        </Box>

        <Box bgColor='gray.200' minH='240px' h='auto'>



            <Box m='100px' alignItems='center' justifyContent='center'>
            {denunciasExibidas.map((denunciaExcluida, index) => (
              <>


                <Box key={index} pt='20px'   >
                  <Center>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bgColor='#f7f7f7'
                    boxShadow='lg'
                    marginBottom='20px'
                    w={{base: '40em', md:'50em'}}
                  >
                    {denunciaExcluida.den_img ? (
                      <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={`http://localhost:3344/retornaImagem/${denunciaExcluida.den_img}`}

                      />
                    ) : (
                      <Image src={semImgDen} maxW={{ base: '100%', sm: '200px' }} objectFit='cover' />
                    )}




                      <CardBody>
                        <Heading size='md'>{denunciaExcluida.den_nome}</Heading>

                        <Heading size='10px' color='gray' >EM {denunciaExcluida.den_bairro.toUpperCase()}</Heading>
                        <Heading size='10px' color='gray'>Data de exclusão: {denunciaExcluida.den_data_exclusao}</Heading>
                        
                        <Text fontSize='18px' color='#338bb0'>
                          <Icon as={FaTrash} mr={2} />
                          Excluída
                        </Text>

                        <Text py='2'>
                          {denunciaExcluida.den_desc}
                        </Text>


                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' mt={24} bgColor='#338bb0' color='white' _hover={{color: '#338bb0', backgroundColor: 'white'}} onClick={reverterDenunciaExcluida}>
                          Reverter
                        </Button>
                      </CardFooter>

                  </Card>
                  </Center>
                </Box>
              </>
            ))}
            </Box>

            {denunciasExcluidasFiltradas.length > denunciasPorPagina * paginaAtual && (

              <Flex justifyContent='center' >
                <Button bgColor='#338bb0' color='white' _hover={{color: '#338bb0', backgroundColor: 'white'}} onClick={carregarMaisDenuncias}>Ver mais</Button>
              </Flex>
            )}



        </Box>

      </Box>

      <Footer />
    </ChakraProvider>
  )
}

export default MinhasDen;
