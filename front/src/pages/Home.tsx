import '../App.css';


//imgs

import Logo from "../img/logo.svg";
import aguaParada from "../img/aguaParada.jpg";


//react
import { useState } from 'react';


//chakra 
import { ChakraProvider, Center, Box, Flex, Image, Text, Container, Card, CardHeader, CardBody, CardFooter
, Heading, Wrap, WrapItem, Button, Divider, Input, InputGroup, InputLeftElement, extendTheme, Grid, GridItem} from '@chakra-ui/react';

//componentes
import  Header  from '../components/Header';
import Footer from '../components/Footer';
import CardDen from '../components/CardDen';
import CardInst from '../components/CardInst';
import { Reportar } from '../components/reportar';
import Comentarios from '../components/Comentarios';

//icones
import { BsChatSquareText } from 'react-icons/bs'
import { MdOutlineReportProblem } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi'

//react-swiper pros slides de denuncia
import { Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



//remove o background color padrao do chakra
const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });


const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (

  // BAIRRONLINE GRANDAO TLG (usando os componentes de estilo do chakra)
  
  <ChakraProvider theme={theme}>
    
    <Header/>
   

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
                           
                           onClick={() => {setOpenCom(true)}}>
                               <Comentarios
                                   isOpen={openCom} 
                                   setCloseCom = {() => {setOpenCom(!openCom)}}>
                               </Comentarios>
                                 Abrir comentários
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

                 <Box h='auto' mt='20px' p='20px' bg='#F2F2F2' boxShadow='lg'>

          
                
                        <Swiper style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={5}
                        navigation
                        pagination={{clickable: true}}>

                       <Wrap>
                        <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>

                       <WrapItem>
                       <SwiperSlide><CardDen/></SwiperSlide>
                       </WrapItem>
                       
                       </Wrap>
                        </Swiper>
              {/* as denuncias da home n tem mais comentarios diretamente nelas agora, tem um botao
              ver denuncia q vai pra pagina de ver denuncias do gabriel, e lá vai ter a exibição da denuncia
              que foi clicada e de outras se o cara quiser filtrar. lá vai ter os comentarioszin */}

                </Box>
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
         

         </Box>
      {/* ------------E AQUI INSTITUIÇOES------------*/}
            

    <Footer/>
     </ChakraProvider>
     
  );
}

export default Home;