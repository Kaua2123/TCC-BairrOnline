//CHAKRA
import { ChakraProvider, Button, useMediaQuery, Kbd, Box, Flex, Icon, Image, useToast, InputLeftElement, Grid, Text, Card, Center, Container, GridItem, IconButton, Wrap, WrapItem, HStack, VStack, Input, InputGroup, CardHeader, CardBody, CardFooter, Heading, Stack, Spinner, } from "@chakra-ui/react";

//componentes
import Header, { HeaderUsu, HeaderInst } from "../components/Header";
import Footer from "../components/Footer";

//sla
import jwt_decode from "jwt-decode";
import { HashLink as Link } from 'react-router-hash-link';

//imgs
import Logo from '../img/logo.svg';
import semImgDen from '../img/semImgDen.png';
import xd from '../img/design teste 15.png'

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
  const [carregando, setCarregando] = useState(false);
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const [nenhumaDen, setNenhumaDen] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const [mobile] = useMediaQuery("(max-width: 768px)");

  const carregarMaisDenuncias = () => {
    setPaginaAtual((prevPagina) => prevPagina + 1);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    if (decodificaToken.usu_tipo !== 'denunciante') {
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
      setDenunciasExcluidasFiltradas([]);
      setCarregando(true);
      setTextoPesquisa(e.target.value);
      setNenhumaDen(false);

      setTimeout(() => {
        const denunciasFiltradas = denunciasExcluidas.filter((denuncia) => 
        denuncia.den_nome.toLowerCase().includes(pesquisa.toLowerCase()));

        if(denunciasFiltradas.length === 0) {
          setNenhumaDen(true);
        }

        setDenunciasExcluidasFiltradas(denunciasFiltradas);
        setCarregando(false)
      }, 1000);
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

      <HStack w='full' h='80vh'>
        <Flex w='full' h='full'>
          <VStack m={{base: '14', md: '20'}} alignItems={{base: 'normal', md: 'flex-start'}}>
            <Text color='#338bb0' fontSize={{base: '25px', md: '50px'}}  fontFamily='BreeSerif-Regular'>Reverta suas denúncias, <br/> faça a diferença.</Text>
            {!mobile && (
              <Text mt={5}>Visualize o acompanhamento das suas denúncias e realize a reversão dos que foram excluídos. <br/> Seu bairro precisa de você.</Text>
            )}
            
            
            <HStack spacing={{base: '4', md: '8'}} mt={10} mr={{base: '10', md: '0'}} bgColor='#5271ff' p={{base: '3', md: '7'}} borderRadius='2xl' boxShadow='lg' >
              <Link smooth to={'/DenDetalhadas#denExcluida'}>
                <IconButton boxShadow='dark-lg' bgColor='white'  boxSize={{base: '60px', md: '80px'}} aria-label="xd" _hover={{ color: '#338bb0' }} icon={<FaRegTrashAlt size='40px' />}></IconButton >
              </Link>


              <Link smooth to={'/DenDetalhadas#reversaoDen'}>
                <IconButton boxShadow='dark-lg' bgColor='white' boxSize={{base: '60px', md: '80px'}} aria-label="xd" _hover={{ color: '#338bb0' }} icon={<FaUndo size='40px' />}></IconButton >
              </Link>


              <Link smooth to={'/DenDetalhadas#acompanhaDen'}>
                <IconButton boxShadow='dark-lg' bgColor='white' boxSize={{base: '60px', md: '80px'}} aria-label="xd" _hover={{ color: '#338bb0' }} icon={<PiMagnifyingGlassBold size='40px' />}></IconButton >
              </Link>

            </HStack>

    
          </VStack>
        
        </Flex>
  
        <Image src={xd} w='100%' objectFit='cover' position='absolute' zIndex='-1'/>
      
      </HStack>


      <Box pt='40px' mt={20} id="acompanhaDen">
        <Center>
          <Text color="#338bb0" fontSize='35px' fontFamily='BreeSerif-Regular'>Acompanhar Denúncias</Text>
        </Center>
        <Box>Aq vai ter algo dps tlggggggg</Box>
      </Box>

      <Box pt='40px' id='denExcluida'>
        {mobile ? (
           <Text color="#338bb0" fontSize='35px' ml={4} pb='30px' fontFamily='BreeSerif-Regular'>Denúncias Excluidas</Text>
        ) : (
        <Center>
          <Text color="#338bb0" fontSize='35px' pb='30px' fontFamily='BreeSerif-Regular'>Denúncias Excluidas</Text>
        </Center>
        )}
      

        <Center>
          <Box h='auto' maxH='900px' w='1400px' bg='white' boxShadow='lg' >

            <SlideDenExcluida denunciasExcluidas={denunciasExcluidas} />

          </Box>
        </Center>

        {mobile === false ? (
          <Box m='100px' id='reversaoDen' borderRadius='12px' h='40vh' display='flex' alignItems='center' boxShadow='lg'>

          <VStack w='full'>
            <VStack justify='center'>
              <Text fontFamily='BreeSerif-Regular' fontSize='45px' color='#338bb0'>Simples e fácil.</Text>
              <Text>Abaixo, pesquise suas denúncias e faça a reversão das mesmas. Pressione ENTER para validar sua pesquisa.</Text>
            </VStack>

          <Box justifyContent='center'>
            <InputGroup mt={3} >
              <InputLeftElement>
                <FiSearch/>
              </InputLeftElement>
              <Input type='text' w='30vw' onChange={(e) => setPesquisa(e.target.value)} onKeyPress={aoPesquisar} placeholder="Pesquisar denúncia"></Input>

            </InputGroup>
            {textoPesquisa && !carregando && (
              <Center>
              <Box m={20} mt={20}>
              <Text>Você pesquisou: {textoPesquisa}</Text>
              </Box>
              </Center>
            )}

            <Center>
            {carregando && (
              <Spinner mt={6} size="xl" color="blue.500" thickness="4px" speed="0.65s" />
            )}
            </Center>
          </Box>
          </VStack>

          </Box>
        ) : (
          <Box m='50px' id='reversaoDen' borderRadius='12px' h='40vh' display='flex' alignItems='center' boxShadow='lg'>

          <VStack w='full'>
            <VStack justify='center'>
              <Text fontFamily='BreeSerif-Regular' fontSize={{base: '30px', md: '45px'}} color='#338bb0'>Simples e fácil.</Text>
              <Text mt={3}>Abaixo, pesquise suas denúncias e faça a reversão das mesmas.</Text>
            </VStack>

          <Box justifyContent='center'>
            <InputGroup mt={3} >
              <InputLeftElement>
                <FiSearch/>
              </InputLeftElement>
              <Input type='text' w='30vw' onChange={(e) => setPesquisa(e.target.value)} onKeyPress={aoPesquisar} placeholder="Pesquisar denúncia"></Input>

            </InputGroup>
            {textoPesquisa && !carregando && (
              <Center>
              <Box m={20} mt={20}>
              <Text>Você pesquisou: {textoPesquisa}</Text>
              </Box>
              </Center>
            )}

            <Center>
            {carregando && (
              <Spinner mt={6} size="xl" color="blue.500" thickness="4px" speed="0.65s" />
            )}
            </Center>
          </Box>
          </VStack>

          </Box>
        )}

       
      <Center>
     
      </Center>

      
        <Box bgColor='gray.200' minH='240px' h='auto'>

           

            

          <Box m='100px' alignItems='center' justifyContent='center'>

          {nenhumaDen && !carregando && (
            <Center>
              <Box borderRadius='12px' bgColor='white' p={10} mt={10} boxShadow='lg'>
              <Text color='#338bb0' fontSize='40px' fontFamily='BreeSerif-Regular' > Nenhuma denúncia encontrada.</Text>
              </Box>
              </Center>
            )}
     
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
                      w={{ base: '40em', md: '50em' }}
                      h={{base: '38em', md: '200px'}}
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
                        <Button variant='solid' mt={24} bgColor='#338bb0' color='white' _hover={{ color: '#338bb0', backgroundColor: 'white' }} onClick={reverterDenunciaExcluida}>
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
              <Button bgColor='#338bb0' color='white' _hover={{ color: '#338bb0', backgroundColor: 'white' }} onClick={carregarMaisDenuncias}>Ver mais</Button>
            </Flex>
          )}



        </Box>

      </Box>

      <Footer />
    </ChakraProvider>
  )
}

export default MinhasDen;
