


//imgs

import Logo from "../img/logohome.svg";
import aguaParada from "../img/aguaParada.jpg";
import denunciaNotFound from "../img/denunciaNotFound.png";

//react
import { useState } from 'react';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

//chakra
import {
  ChakraProvider, Center, Box, Flex, Image, Text, Container, Card, CardHeader, CardBody, CardFooter
  , Heading, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, Wrap, WrapItem, Button, Divider, Input, InputGroup, InputLeftElement, extendTheme, Grid, GridItem, useDisclosure, useColorMode, theme, Avatar, Tag, TagLeftIcon, HStack, Stack, VStack
} from '@chakra-ui/react';
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'
//componentes
import Header, { HeaderADM, HeaderInst, HeaderUsu } from '../components/Header';
import Footer from '../components/Footer';
import theme from '../breakpoints.tsx';

import CardInst from '../components/CardInst';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import CardCom from '../components/CardCom';
//icones
import { BsChatSquareText } from 'react-icons/bs'
import { MdOutlineReportProblem } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi'

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SlideDen from '../components/SlideDen';

//axios limdo
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BiSolidLike, BiSolidCommentDetail } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { SiOpenstreetmap } from "react-icons/si";
import CardGrande from "../components/CardGrande.tsx";



const Home = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [temInst, setTemInst] = useState(false);
  const [temDenuncia, setTemDenuncia] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [instFiltradas, setInstFiltradas] = useState([]);

  const [comments, setComments] = useState([]);

  const { colorMode } = useColorMode();

  const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;

  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return true; // verdadeiro, expirou
    }

    try {
      const tokenDados = jwt_decode(token);
      const tempoExpiracao = tokenDados.exp * 1000; //milisegundos
      const tempoAgora = Date.now();
      return tempoAgora > tempoExpiracao;
    }
    catch (error) {
      return true;
    }
  }

  if (isTokenExpired()) {
    localStorage.removeItem('token');

  }

  let headerComponent = null;

  if (decodificaToken && decodificaToken.usu_tipo === 'denunciante') {
    headerComponent = <HeaderUsu />;
  } else if (decodificaToken && decodificaToken.usu_tipo === 'instituicao') {
    headerComponent = <HeaderInst />;
  } else if (decodificaToken && decodificaToken.usu_tipo === 'administrador') {
    headerComponent = <HeaderADM />
  }
  else {
    headerComponent = <Header />;
  }



  const handleCommentSubmit = (comment) => {
    setComments(
      [
        ...comments, comment
      ]
    )
  }

  const [rep, setrep] = useState(false);

  async function getDenuncia() {
    axios.get('http://localhost:3344/getDenuncia')
      .then(response => {
        setDenuncias(response.data);

        if (response.data.length > 0) {
          setTemDenuncia(true);
        }

      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getDenuncia();
  }, [])

  async function getInstituicoes() {
    axios.get('http://localhost:3344/getInstituicoes')
      .then(response => {
        setInstituicoes(response.data);

        if (response.data.length > 0) {
          setTemInst(true);
        }

      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getInstituicoes();
  }, [])

  const aoPesquisar = (e) => {
    if (e.key === 'Enter') {

      const instFiltradas = instituicoes.filter((instituicao) => instituicao.usu_nome.toLowerCase().includes(pesquisa.toLowerCase()));
      setInstFiltradas(instFiltradas);
    }
  }


  return (

    // BAIRRONLINE GRANDAO TLG (usando os componentes de estilo do chakra)

    <ChakraProvider theme={theme} >

      {headerComponent}


      <Grid templateColumns={{ base: '1fr', sm: '1fr 2fr 1fr' }} gap={4} bgColor='#338bb0'>
        {/* container da esquerda */}
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>

          <Container centerContent mt={{ base: '55px', md: '90px', lg: '120px' }}>
            <Text color="white" display={{base: 'none', md: 'flex'}} textDecoration="underline" fontFamily="BreeSerif-Regular" whiteSpace="nowrap" fontSize={{ base: "15px", md: "24px", lg: "35px" }}>
              Com problemas no bairro?
            </Text>
            <Text textAlign="center" display={{base: 'none', md: 'flex'}}  color="white" fontFamily="BreeSerif-Regular" fontSize={{ base: "13px", md: "15px", lg: "18px" }} fontWeight="normal">
              Relate suas denúncias aqui, e tenha o retorno das instituições responsáveis pela resolução dos problemas
            </Text>
          </Container>

        </GridItem>

        {/* logo no meiozin */}
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <Center>
            <Image
              mt="-60px"
              src={Logo}
              boxSize={{ base: "400px", md: "420px", lg: "480px" }}
            />
          </Center>
          <Text color="white" display={{base: 'flex', md: 'none'}} mr={4}  fontFamily="BreeSerif-Regular" whiteSpace="nowrap" fontSize={{ base: "35px" }} justifyContent='center'>Seu portal de denúncias</Text>
        </GridItem>

        {/* container com os textos na direita */}
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <Container centerContent mt={{ base: '55px', md: '90px', lg: '120px' }}>
            <Text
              color="white"
              textDecoration="underline"
              fontFamily="BreeSerif-Regular"
              whiteSpace="nowrap"
              fontSize={{ base: "15px", md: "25px", lg: "35px" }}
              display={{base: 'none', md: 'flex'}} 
            >
              Veja outras denúncias
            </Text>
            <Text
              textAlign="center"
              color="white"
              fontFamily="BreeSerif-Regular"
              fontSize={{ base: "13px", md: "15px", lg: "18px" }}
              fontWeight="normal"
              display={{base: 'none', md: 'flex'}} 
            >
              Se mantenha informado quanto aos problemas de seu bairro ou de outros bairros de Volta Redonda
            </Text>
          </Container>
        </GridItem>
      </Grid>
      {/*------------FIM FULLSCREEN------------*/}

      {/* ------------SEÇÃO DENUNCIAS E INSTITUIÇOES AQUI------------*/}
      <Box w="100%" bgColor='gray.200' h='full' borderRadius='4px'>

        {temDenuncia ? (
          <HStack w='full' h={{base: '100vh', md: '60vh'}}>
            <Flex w='full' h='full' display={{ base: 'none', md: 'flex' }} alignItems='center' justifyContent='center' >

              <VStack>
                <Heading color='#338bb0' fontSize='3xl' fontFamily='BreeSerif-Regular' fontWeight='normal'>Denúncias em alta </Heading>
                <Text fontSize='19px' mr={6}>Denúncias em alta dos <br /> bairros de  <b>Volta Redonda</b></Text>

              </VStack>
            </Flex>


            <Flex w='full' h='full'  mr={5} alignItems='center' justifyContent='center'>
              <VStack>
                <Text color='#338bb0' display={{base: 'flex', md: 'none'}} fontSize='30px' fontFamily='BreeSerif-Regular'>Denúncia mais curtida</Text>
              <CardGrande denuncia={denuncias[0]} />
              </VStack>
           
            </Flex>
          </HStack>
        ) : (
          <VStack w='full' h='60vh'>
            <Flex w={{base: '90vw', md: 'full'}} h={{base: 'full', md: 'full'}} display={{ base: 'flex', md: 'flex' }} alignItems='center' justifyContent='center'>
              <Box borderRadius='12px' bgColor='white' p={10} boxShadow='lg'>
                <Text color='#338bb0' fontSize='40px' fontFamily='BreeSerif-Regular'>Nenhuma denúncia em alta encontrada...</Text>
                <Text fontSize='20px'>Continue a denunciar!</Text>
              </Box>
            </Flex>
          </VStack>
        )}



        {temDenuncia ? (
          <SlideDen denuncias={denuncias} />
        ) : (
          <>
          <Center>
            <Box bgColor='white' boxShadow='lg' borderRadius='12px' justifyContent={{base: 'center'}} w={{base: '90vw', md: 'full'}}>
              <Flex  justify='center' >
                <Image src={denunciaNotFound}></Image> {/*img temporaria */}
              </Flex>
              <Flex justify='center'>
                <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' p={8} color='#338bb0' mt='-50px'>Parece que não há nenhuma denúncia em alta...</Text>
              </Flex>
            </Box>
          </Center>
          </>
        )}

        {/* ------------AQUI ACABAM DENUNCIAS------------*/}

        {temInst ? (
          <HStack w='full' h='100vh'>

            <Flex w='full' h='full' flexDirection='column' alignItems='center' >

              <Flex gap={4} display={{ base: 'flex', md: 'none' }} w='full' maxW='md' p={6}>
                <Heading fontSize='2xl' color='#338bb0' >Instituições</Heading>
                <InputGroup >
                  <InputLeftElement pointerEvents='none'>
                    <FiSearch color='white' />
                  </InputLeftElement>
                  <Input value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyPress={aoPesquisar}  color='white' placeholder='Busque por instituições' _placeholder={{ color: "white" }} bg='#338BB0' />
                </InputGroup>
              </Flex>

              <Flex>

                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={{ base: 16, md: 4 }} p={20}>
                  {instituicoes.map((instituicao) => (
                    <GridItem key={instituicao.usu_cod}>
                      <CardInst instituicao={instituicao} />
                    </GridItem>
                  ))}
                </Grid>
              </Flex>


            </Flex>

            <Flex w='full' h='full' alignItems='center' display={{ base: 'none', md: 'flex' }} justifyContent='center' >
              <Stack w='full' maxW='md' spacing={4}>
                <Heading fontSize={{ base: '1xl', md: '3xl' }} textAlign='center' color='#338bb0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Instituições</Heading>

                <Text fontSize={{ base: '16px', md: '19px' }} textAlign='center'>
                  Conheça as <b>instituições</b> que poderão <br/>resolver os problemas de seu <b>bairro</b>
                </Text>


              </Stack>

            </Flex>

          </HStack>

        ) : (
          <VStack w='full' h='60vh'>
            <Flex w={{base: '90vw', md: 'full'}}  h={{base: 'full', md: 'full'}} display={{ base: 'flex', md: 'flex' }} alignItems='center' justifyContent='center'>
              <Box borderRadius='12px' bgColor='white' p={10} boxShadow='lg'>
                <Text color='#338bb0' fontSize='40px' fontFamily='BreeSerif-Regular'>Nenhuma instituição cadastrada...</Text>
                <Text fontSize='20px'>Continue a denunciar!</Text>
              </Box>
            </Flex>
          </VStack>
          )}

      </Box>
      {/* ------------E AQUI INSTITUIÇOES------------*/}


      <Footer/>
    </ChakraProvider>

  );
}

export default Home;
