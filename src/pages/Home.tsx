import '../App.css';


//imgs
import img2 from "../img/aguaEstancada.png";
import Logo from "../img/logo.svg";
import inst from "../img/inst.png"

//react
import { useState } from 'react';


//chakra 
import { ChakraProvider, Center, Box, Flex, Image, Text, Container, Card, CardHeader, CardBody, CardFooter
, Heading, Wrap, WrapItem, Button, Divider, Spacer, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';

//componentes
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDen from '../components/CardDen';
import CardInst from '../components/CardInst';
import { Reportar } from './reportar';
import Comentarios from './Comentarios';

//icones
import { BsChatSquareText } from 'react-icons/bs'
import { MdOutlineReportProblem } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi'



const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (

  // BAIRRONLINE GRANDAO TLG (usando os componentes de estilo do chakra)
  <ChakraProvider>
      <Header/>
          <Flex >
                <Box bgColor='#338BB0' h='xl' w='100%'>

                  <Center>
                      <Image src={Logo} boxSize='480px' />
                  </Center>

                    <Container centerContent ml='-3' w='100' mt='-80' >
                      <Text  color='white' textDecoration='underline' fontFamily='BreeSerif-Regular' fontSize='28pt'>Com problemas no bairro?</Text>
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
         
            <Center>
                
              <Box mt={[2, 4, 6, 8]} w="87em" bg='white' h='120em'  borderRadius='4px' border='1px solid black'>
                  <Flex p='30px'>
                     <Text color='#338BB0' textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Denúncias em alta</Text>
                  </Flex>

                 <Wrap>
                    <Flex p='30px'>
                        <Image src={img2} boxSize='320px' h='420px' boxShadow='lg'></Image>
                    </Flex>
                    <Flex mt='20px'>
                        <Card mr='50px' fontFamily='BreeSerif-Regular' bgColor='gray.100' mt='10px'  h={[100, 290, 420]} w={[100, 200, 320]} boxShadow='lg' border='1px solid gray' _hover={{boxShadow: 'dark-lg', transition: '0.2s', cursor: 'pointer'}}> 
                          <CardHeader>
                              <Heading size='md' textAlign='center' bgColor='#338BB0' color='white' fontFamily='BreeSerif-Regular' fontWeight='normal'>El agua estas estancada</Heading>
                          </CardHeader>
                              <CardBody>
                                  <Box>
                                      <Heading size='xs' fontWeight='bold'> @usuário </Heading>
                                        <Text fontWeight='light'> “Agua estancada en el barrio Jd Cidade do <br /> Aço y nadie hace nada” </Text>
                                  </Box>
                              </CardBody>

                              <Divider/>
                                <CardFooter>
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
                          <Wrap p='30px' spacing='20px' ml='44px'>
                              <WrapItem>
                                  <CardDen/>                  
                              </WrapItem>

                              <WrapItem>
                                  <CardDen/>                              
                              </WrapItem>

                          </Wrap>
                         </Flex>
                        <Flex p='30px' mt='-20px'>
                          <Wrap spacing='20px'>
                              <WrapItem>
                          
                                  <CardDen/> 
                                {/* ESSES CARDS TÃO COM CONTEÚDO SÓ DE EXEMPLO, MAS NA REAL ELES TEM Q SER
                                VAZIOS, POIS É O USUARIO QUE PÕE O CONTEUDO, TITULO, TEXTO, IMAGEM, ETCC
                                 */}
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

                              <WrapItem>
                                  <CardDen/>
                              </WrapItem>
                          </Wrap>
                        
                       </Flex>
                       
                </Wrap>
                <Flex justifyContent='end' mr='20px'>
                      <Button variant='link' color='black'>Ver mais</Button>
               </Flex>

                <Flex p='30px'>
                    <Text color='#338BB0' textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Instituições</Text>
                </Flex>
                
                <Flex p='30px'>
                    <Wrap spacing='50px'> 
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
                    
                    <Wrap ml='100px'>        
                         <WrapItem>
                            <InputGroup> 

                                <InputLeftElement pointerEvents='none'>
                                    <FiSearch color='white' />
                                </InputLeftElement>

                                <Input /* onSubmit= */ w='280px' color='white' placeholder='Busque por instituições' _placeholder={{color: "white"}} bg='#338BB0'/>
                            </InputGroup>
                        </WrapItem>
                    </Wrap>
                    
             </Flex>

             <Flex p='30px'> 
                <Wrap spacing='50px'> 
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

              </Box>
            </Center>

        


    
   

     <Footer/>
     </ChakraProvider>
  );
}

export default Home;