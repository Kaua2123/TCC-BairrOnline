


//imgs

import Logo from "../img/logohome.svg";
import aguaParada from "../img/aguaParada.jpg";
import denunciaNotFound from "../img/denunciaNotFound.png";

//react
import { useState } from 'react';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

//chakra
import { ChakraProvider, Center, Box, Flex, Image, Text, Container, Card, CardHeader, CardBody, CardFooter
, Heading, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, Wrap, WrapItem, Button, Divider, Input, InputGroup, InputLeftElement, extendTheme, Grid, GridItem, useDisclosure, useColorMode, theme, Avatar, Tag, TagLeftIcon} from '@chakra-ui/react';
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'
//componentes
import  Header, { HeaderADM, HeaderInst, HeaderUsu }  from '../components/Header';
import Footer from '../components/Footer';
import theme from '../breakpoints.tsx';

import CardInst from '../components/CardInst';
import { Reportar } from '../components/reportar';
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



const Home = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [temDenuncia, setTemDenuncia] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [comments, setComments] = useState([]);

  const {colorMode} = useColorMode();

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
    headerComponent = <Header/>;
  }

 

  const handleCommentSubmit = (comment) => {setComments(
    [
      ...comments, comment
    ]
  )}

  const [rep, setrep] = useState(false);

  async function getDenuncia() {
    axios.get('http://localhost:3344/getDenuncia')
    .then(response => {
      setDenuncias(response.data);

      if(response.data.length > 0){
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



 return (

  // BAIRRONLINE GRANDAO TLG (usando os componentes de estilo do chakra)

  <ChakraProvider theme={theme} >

  {headerComponent}


    <Grid templateColumns={{base: '1fr', sm: '1fr 2fr 1fr'}} gap={4} bgColor='#338bb0'>
        {/* container da esquerda */}
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>

          <Container centerContent mt={{base: '55px', md: '90px', lg:'120px'}}>
            <Text color="white" textDecoration="underline" fontFamily="BreeSerif-Regular" whiteSpace="nowrap"fontSize={{ base: "15px", md: "24px", lg: "35px" }}>
              Com problemas no bairro?
            </Text>
            <Text textAlign="center"color="white" fontFamily="BreeSerif-Regular" fontSize={{ base: "13px", md: "15px", lg: "18px" }} fontWeight="normal">
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
        </GridItem>

        {/* container com os textos na direita */}
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <Container centerContent mt={{base: '55px', md: '90px', lg:'120px'}}>
            <Text
              color="white"
              textDecoration="underline"
              fontFamily="BreeSerif-Regular"
              whiteSpace="nowrap"
              fontSize={{ base: "15px", md: "25px", lg: "35px" }}
            >
              Veja outras denúncias
            </Text>
            <Text
              textAlign="center"
              color="white"
              fontFamily="BreeSerif-Regular"
              fontSize={{ base: "13px", md: "15px", lg: "18px" }}
              fontWeight="normal"
            >
              Se mantenha informado quanto aos problemas de seu bairro ou de outros bairros de Volta Redonda
            </Text>
          </Container>
        </GridItem>
      </Grid>
         {/*------------FIM FULLSCREEN------------*/}

           {/* ------------SEÇÃO DENUNCIAS E INSTITUIÇOES AQUI------------*/}
         <Box  w="100%" bgColor='gray.200' h='auto'  borderRadius='4px'>

             <Flex justifyContent='space-between' direction={{base: "column", md: "row"}}>
                 <Flex flexDirection='column' p='120px' >

                   <Box>
                 <Text color='#338BB0' fontSize={{base: '28px', md: '35px', lg:'36px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Denúncias em alta</Text>
                 </Box>

                   <Box mt='40px'>
                     <Text fontSize={{base: '24px', md: '25px', lg:'25px'}}>Denúncias em alta dos <br /> bairros de  <b>Volta Redonda</b></Text>
                   </Box>
                 </Flex>



                 <Flex flexDirection='column'>
                 <Center>
      
      {denuncias.length > 0 && (

      
        <Card bgColor='white' border='1px solid #A9A9A9' w={{base: '535px', md: '653px', lg: '802px'}}> {/* border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> */}
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

        <Box>
          <Heading fontSize={{base: '12px', md: '14px', lg: '16px'}}>{denuncias[0].usu_nome}</Heading>
           
        </Box>
      </Flex>
    
    </Flex>
  </CardHeader>
  <CardBody>
    <Center>
    <Text fontWeight='normal' textAlign='center' borderRadius='7px' bgColor='#338BB0' color='white' w='100%' mt='-20px'  fontSize={{ base: '14px', md: '18px', lg: '25px' }} fontFamily='BreeSerif-Regular' >{denuncias[0].den_nome}</Text>
    </Center>
    <Flex flexDirection='column' mt='15px' ml='-18px' color='gray'>
    
    <Tag bg='white' color='gray' fontSize={{base: '12px', md: '14px', lg: '16px'}}>
      <TagLeftIcon as={CiLocationOn} />
      <Text fontFamily='BreeSerif-Regular'>{denuncias[0].den_bairro}</Text>
    </Tag>
 
    <Tag bg='white' color='gray' fontSize={{base: '12px', md: '14px', lg: '16px'}}>
    <TagLeftIcon as={SiOpenstreetmap} />
    <Text fontFamily='BreeSerif-Regular'>{denuncias[0].den_problema} </Text>
    </Tag>
    </Flex>
    <Text  mt='10px'>
    {denuncias[0].den_desc}
    </Text>
  </CardBody>
  <Box>
                  {denuncias[0].den_img ? ( // se o usuario tiver adicionado imagem
                    <Image src={`http://localhost:3344/retornaImagem/${denuncias[0].den_img}`}  w='100%' h='350px' />
                ) : (
                    <HiOutlineClipboardDocumentList size='10vh'  color='gray' /> // se n tiver adicionado imagem, é o que será exibido
                )}
                  </Box>

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button ml='20px'  bgColor='#338BB0' color='white' _hover={{ color: '#338BB0', bgColor: 'white' }}> <BiSolidLike style={{ color: "white" }} />
    <Text  mr='15px' ml='6px'>
      Curtir
      </Text>
    </Button>
    <Button mr='400px' bgColor='#338BB0' color='white' _hover={{ color: '#338BB0', bgColor: 'white' }}> <BiSolidCommentDetail style={{ color: 'white' }}/>
      <Text mr='15px' ml='7px'>     
      Comentar
      </Text> 
    </Button>
     <Button variant='ghost' mt={{base: '-75px', md: '-75px', lg: '-35px'}} ml={{base:'400px', md:'500px', lg:'650px'}} w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='2.5vh' />} onClick={()=>{setrep(true)}}>
                        <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                    </Button>
  </CardFooter>
</Card>
)}
        </Center>
                 </Flex>
             </Flex>


                  {temDenuncia ? (
                     <SlideDen denuncias={denuncias}/>
                  ) : (
                    <>
                    <Box bgColor='white' boxShadow='lg'>
                    <Flex justify='center'>
                      <Image src={denunciaNotFound}></Image> {/*img temporaria */}
                    </Flex>
                    <Flex justify='center'>
                      <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' p={8}  color='#338bb0' mt='-50px'>Parece que não há nenhuma denúncia em alta...</Text>
                    </Flex>
                    </Box>
                    </>
                  )}

   {/* ------------AQUI ACABAM DENUNCIAS------------*/}

           <Flex justifyContent='space-between'>

              <Flex flexDirection='column'>

              <Wrap spacing='50px' m='80px'>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>

                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>

                      <WrapItem>
                              <CardInst/>
                      </WrapItem>

                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>


                  </Wrap>
              </Flex>

              <Flex flexDirection='column' p='120px' >

                <Box>
                  <Text color='#338BB0' fontSize={{base: '28px', md: '35px', lg:'36px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Instituições</Text>
                </Box>

                <Box mt='50px'>
                  <Text fontSize={{base: '21px', md: '25px', lg:'25px'}}>
                    Conheça as <b>instituições</b> que poderão resolver os problemas de seu <b>bairro</b>
                  </Text>
                </Box>

                <Box mt='100px' w={{base: '5%', md: '40%', xl: '100%'}}>
                      <InputGroup>
                           <InputLeftElement pointerEvents='none'>
                               <FiSearch color='white' />
                           </InputLeftElement>
                           <Input /* onSubmit= */ w='280px' color='white' placeholder='Busque por instituições' _placeholder={{color: "white"}} bg='#338BB0'/>
                       </InputGroup>
              </Box>

              </Flex>
           </Flex>



                <Flex flexDirection='column'>

                </Flex>

              <Button variant='link' color='black' ml='15px'>Ver mais</Button>
         </Box>
      {/* ------------E AQUI INSTITUIÇOES------------*/}


    <Footer/>
     </ChakraProvider>

  );
}

export default Home;
