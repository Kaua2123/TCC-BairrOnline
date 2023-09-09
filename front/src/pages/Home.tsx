import '../App.css';


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
, Heading, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, Wrap, WrapItem, Button, Divider, Input, InputGroup, InputLeftElement, extendTheme, Grid, GridItem, useDisclosure} from '@chakra-ui/react';
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'
//componentes
import  Header, { HeaderInst, HeaderUsu }  from '../components/Header';
import Footer from '../components/Footer';

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



//remove o background color padrao do chakra


//Estilizar Modal do Comentários
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const xl = defineStyle({
  px: '6',
  py: '2',
  fontSize: 'xl',
})

const sm = defineStyle({
  fontSize: 'sm',
  py: '6',
})

const sizes = {
  xl: definePartsStyle({ header: sm, dialog: xl }),
}

export const modalTheme = defineMultiStyleConfig({
  sizes,
})

 

const Home = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [temDenuncia, setTemDenuncia] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [comments, setComments] = useState([]);

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
 

  const handleCommentSubmit = (comment) => {setComments(
    [
      ...comments, comment
    ]
  )}

  const [rep, setrep] = useState(false);

  async function getDenuncia() {
    axios.get('http://localhost:3344/cardDenuncia')
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
  
  <ChakraProvider>
    
  {headerComponent}
   

    <Grid templateColumns="1fr 2fr 1fr" gap={4} bgColor="#338BB0">
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
              boxSize={{ base: "360px", md: "420px", lg: "480px" }}
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

             <Flex justifyContent='space-between'>
                 <Flex flexDirection='column' p='120px' >

                   <Box>
                 <Text color='#338BB0' fontSize={{base: '28px', md: '35px', lg:'36px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Denúncias em alta</Text>
                 </Box>

                   <Box mt='40px'>
                     <Text fontSize={{base: '24px', md: '25px', lg:'25px'}}>Denúncias em alta dos <br /> bairros de  <b>Volta Redonda</b></Text>
                   </Box>
                 </Flex>

                
                 
                 <Flex flexDirection='column'>
                 <Card m='20px'  fontFamily='BreeSerif-Regular' bgColor='white' mt='10px' boxShadow='lg' h={{base: '550px', md: 'auto', lg:'450px'}} w={{base: '220px', md: '380px', lg: '700px'}} border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> 
                   {/* Card componente do chakra que cria um card  */}
                     <CardHeader> {/* header do card, usado pra por titulo  */}
                         <Heading borderRadius='7px' textAlign='center' bgColor='#338BB0' color='white' fontFamily='BreeSerif-Regular' fontWeight='normal'>El agua estas estancada</Heading>
                     </CardHeader>
                         <CardBody> {/* corpo do card */}
                             <Box>
                                <Image src={aguaParada}  w='100%' h='250px'  boxShadow='lg'></Image>
                             </Box>
                                
                        
                         </CardBody>
                              
                         <Divider/> {/* divisor, geralmente é uma linha */}
                              
                           <CardFooter w={{base: '640px', md: '3000px', lg: '700px'}} h={{base: '200px', md: '90px', lg: '80px'}}> {/* rodapé do card  */}
                               <Button 
                           leftIcon={<BsChatSquareText/>}
                           bgColor='#338BB0'
                           color='white'
                           _hover={{background: '#fff', color:'#338BB0'}}
                           fontWeight='normal'
                           w={{base: '240px', md: '125px', lg: '180px'}}
                           fontSize={{base: '11px', md: '12px', lg: '16px'}}
                           onClick={onOpen}
                           >
                            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>
                                <Text fontFamily='BreeSerif-Regular' fontSize='25px' color='#338bb0' fontWeight='normal'>
                                  Comentários
                                  </Text>
                                </ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                              <CommentList comments={comments} />
                              <CommentForm onCommentSubmit={handleCommentSubmit} />
                             
                              </ModalBody>

                              <ModalFooter>
                          
               
                              </ModalFooter>
                             </ModalContent>
                             </Modal>
                           
                               </Button>
                               <Button variant='ghost'   w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                                   <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                               </Button>
                               <Box ml={{ lg: '80px'}} fontSize={{base: '12px', md: '14px', lg: '18px'}} mr={{base: '400px', md: '2600px', lg: '0px'}}  fontWeight='normal'>
                                 Água estancada en el jd cidade do aco
                              </Box>
                           </CardFooter>
                   </Card>
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