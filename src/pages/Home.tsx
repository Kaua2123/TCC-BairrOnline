import '../App.css';


//imgs
import img2 from "../img/aguaEstancada.png";
import Logo from "../img/logo.svg";
import sectionDenAlta from "../img/sectionDenAlta.png";
import sectionInstHome from "../img/sectionInstHome.png"


//react
import { useState } from 'react';


//chakra 
import { ChakraProvider, Center, Box, Flex, Image, Text, Container, Card, CardHeader, CardBody, CardFooter
, Heading, Wrap, WrapItem, Button, Divider, Input, InputGroup, InputLeftElement, extendTheme} from '@chakra-ui/react';

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
    
    <Header></Header>
   

     <Flex > {/*componente do chakra que renderiza uma div com display:flex */}
           {/*------------FULLSCREEN AQUI------------*/}
           <Box bgColor='#338BB0' h='544px' w='100%'> {/*componente do chakra que renderiza uma div */}
            
             <Center> {/*componente do chakra que centraliza oq ta dentro (vishkkkkk) */}
                   <Image src={Logo} boxSize={'480px'}></Image> {/*componente do chakra que simula a tag img */}
             </Center>

               <Container centerContent ml='-3' w='100' mt='-80' >  {/*compopnente do chakra que cria um container*/}
                 <Text  color='white' textDecoration='underline' fontFamily='BreeSerif-Regular' fontSize='28pt'>Com problemas no bairro?</Text> {/*componente do chakra que renderiza um texto, p, h1, h2, etc */}
                 <Text textAlign='center'  color='white'  fontFamily='BreeSerif-Regular' fontSize='14pt'  fontWeight='normal'>Relate suas denúncias aqui,
                 e tenha o retorno das instituições 
                 responsáveis pela resolução dos problemas 
                 </Text>
               </Container>

               <Container centerContent mt='52'>
                 <Text color='white' fontSize='30pt' fontFamily='BreeSerif-Regular'>Seu portal de denúncias</Text>
               </Container>
                    
                  
                 <Container centerContent mr='20px' w='100' mt='-374px  ' >
                 <Text  color='white' textDecoration='underline' fontFamily='BreeSerif-Regular' fontSize='28pt'>Veja outras denúncias</Text>
                 <Text textAlign='center'  color='white'  fontFamily='BreeSerif-Regular' fontSize='14pt'  fontWeight='normal'>Se mantenha informado quanto aos problemas
                 de seu bairro ou de outros bairros de Volta Redonda
                 </Text>
               </Container> 
                </Box>
               
              
       </Flex>
         {/*------------FIM FULLSCREEN------------*/}
         <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
           {/* ------------SEÇÃO DENUNCIAS E INSTITUIÇOES AQUI------------*/}
         <Box  w="100%" bg='white' h='250em'  borderRadius='4px'>

             <Flex justifyContent='space-between'>
                 <Flex flexDirection='column' p='120px' mt='150px'>

                   <Box>
                 <Text color='#338BB0' fontSize='45px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Denúncias em alta</Text>
                 </Box>

                   <Box mt='40px'>
                     <Text fontSize='30px'>Denúncias em alta dos <br /> bairros de  <b>Volta Redonda</b></Text>
                   </Box>
                 </Flex>

                 <Flex flexDirection='column'>
                 <Image src={sectionDenAlta} boxSize='50em'></Image>
                 </Flex>
             </Flex>

             <Wrap> {/*componente do chakra que renderiza tipo uma div que tem quebra de linha */}
                  
               <Flex p='30px'>
                   <Image src={img2} boxSize='320px' h='420px' boxShadow='lg'></Image>
               </Flex>
               <Flex mt='20px'>
                        
                   <Card mr='50px' fontFamily='BreeSerif-Regular' bgColor='gray.100' mt='10px'  h={[100, 290, 420]} w={[100, 200, 320]} boxShadow='lg' border='1px solid gray' _hover={{boxShadow: 'dark-lg', transition: '0.2s', cursor: 'pointer'}}> 
                   {/* Card componente do chakra que cria um card  */}
                     <CardHeader> {/* header do card, usado pra por titulo  */}
                         <Heading size='md' textAlign='center' bgColor='#338BB0' color='white' fontFamily='BreeSerif-Regular' fontWeight='normal'>El agua estas estancada</Heading>
                     </CardHeader>
                         <CardBody> {/* corpo do card */}
                             <Box>
                                 <Heading size='xs' fontWeight='bold'> @usuário </Heading>
                                   <Text fontWeight='light'> “Agua estancada en el barrio Jd Cidade do <br /> Aço y nadie hace nada” </Text>
                             </Box>
                                
                        
                         </CardBody>
                              
                         <Divider/> {/* divisor, geralmente é uma linha */}
                              
                           <CardFooter> {/* rodapé do card  */}
                               <Button 
                           leftIcon={<BsChatSquareText/>}
                           bgColor='#338BB0'
                           color='white'
                           _hover={{background: '#fff', color:'#338BB0'}}
                           onClick={() => {setOpenCom(true)}}>
                               <Comentarios
                                   isOpen={openCom} 
                                   setCloseCom = {() => {setOpenCom(!openCom)}}>
                               </Comentarios>
                                   Abrir comentários
                               </Button>
                               <Button color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                                   <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                               </Button>
            
                           </CardFooter>
                   </Card>
               </Flex>
                   <Flex>
                        
                     <Wrap p='30px' spacing='20px'>            
                                
                             {/* ESSES CARDS TÃO COM CONTEÚDO SÓ DE EXEMPLO, MAS NA REAL ELES TEM Q SER
                           VAZIOS, POIS É O USUARIO QUE PÕE O CONTEUDO, TITULO, TEXTO, IMAGEM, ETCC
                             */}

                         <WrapItem>
                             <CardDen/>  
                         </WrapItem>

                         <WrapItem>
                             <CardDen/>                              
                         </WrapItem>
                              
                         <WrapItem>
                             <CardDen/> 
                         </WrapItem>

                         <WrapItem>  
                             <CardDen/> 
                         </WrapItem>
                              
                     </Wrap>
                        
                   </Flex>
                       
           </Wrap>
           <Flex justifyContent='end' mr='20px'>
                 <Button variant='link' color='black'>Ver mais</Button>
           </Flex>
               
      {/* ------------AQUI ACABAM DENUNCIAS------------*/}
      <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>

    
           <Flex justifyContent='space-between'>

              <Flex flexDirection='column'>
                <Image src={sectionInstHome} boxSize='50em'></Image>
              </Flex>

              <Flex flexDirection='column' p='120px'>
                <Box  mt='150px' textAlign='center'>
                  <Text color='#338BB0' fontSize='45px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Instituições</Text>
                </Box>

                <Box mt='50px'>
                  <Text fontSize='30px'>
                    Conheça as <b>instituições</b> que <br />poderão resolver os <br /> problemas de seu <b>bairro</b>
                  </Text>
                </Box>  

              </Flex>
           </Flex>
                
           <Flex p='30px' justify='space-between'>
              <Flex flexDirection='column'>
                  <Wrap spacing='50px'> 
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                            
                      <WrapItem>
                              <CardInst/>
                      </WrapItem>
                  </Wrap>         
               </Flex>
          
                <Flex flexDirection='column'>
                       <InputGroup> 
                           <InputLeftElement pointerEvents='none'>
                               <FiSearch color='white' />
                           </InputLeftElement>
                           <Input /* onSubmit= */ w='280px' color='white' placeholder='Busque por instituições' _placeholder={{color: "white"}} bg='#338BB0'/>
                       </InputGroup>
                </Flex>
            </Flex>
                    
         

         <Flex p='30px'> 
           <Wrap spacing='50px'> 
               <WrapItem>
                   <CardInst/>
               </WrapItem>

               <WrapItem>
                   <CardInst/>
               </WrapItem>

                

           </Wrap>        
       </Flex>

         </Box>
      {/* ------------E AQUI INSTITUIÇOES------------*/}
            

    <Footer/>
     </ChakraProvider>
     
  );
}

export default Home;