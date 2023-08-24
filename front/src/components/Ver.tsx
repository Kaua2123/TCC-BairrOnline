
import '../App.css';


//img

import imgTemporaria from "../img/imgTemporaria.png";
import enviandoDen from "../img/enviandoDen.png";
import aguaParada from '../img/aguaParada.jpg'


//chakra
import { ChakraProvider, extendTheme, Image, Flex, Box, Button, Text,  FormControl,
FormLabel, Spacer, Select,  Input, InputLeftElement, InputGroup, Textarea, useToast, Spinner, Card, CardBody, CardFooter, CardHeader, Divider, Heading} from '@chakra-ui/react';



//react
import { useState } from "react";
import { useRef } from "react";
import axios from 'axios';

//react icons
import { BsCardText, BsCamera, BsListUl, BsCalendar3, BsChatSquareText} from "react-icons/bs"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { MdOutlineReportProblem } from 'react-icons/md';
import Comentarios from './Comentarios';
import { Reportar } from './reportar';

const bairros = ['Selecione dentre as opções', 'Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte',
'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal',
  'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 
  'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera',
  'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês',
    'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 
  'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];

const opçoesDeBairros = bairros.map((bairro, index) => ({
  value: index,
  label: bairro
}))

const Ver = () => {

  const [denImg, setDenImg] = useState('');  
  const [denNome, setDenNome] = useState('');
  const [denPrazo, setDenPrazo] = useState('');
  const [denDesc, setDenDesc] = useState('');
  const [bairroCod, setBairroCod] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const toast = useToast();
  

                        

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });

    return (
      <ChakraProvider theme={theme}>
  
  
  <Flex align='center'>
 
    <Box bg='#F8F8FF'  borderRadius='4px' h='auto' w='100%'>
                  
      <Flex justifyContent='space-between'>

    

        <Flex flexDirection='column' p='100px'  w='610px'>
        <Text color='#338BB0'   fontSize={{ base:'12px', md:'20px', lg: '35px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Veja outras denúncias</Text>
          <Text w='410px' mt='40px' fontSize={{ base:'12px', md:'18px', lg: '25px'}}>Aqui você pode ver denúncias feitas por outros usuários. Opte pelo filtro de denúncias caso queira vê-las especificamente.</Text>
               
                
          <Text color='#338BB0' mt='30px'  fontSize={{ base:'12px', md:'20px', lg: '35px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Resolução</Text>
          <Text w='450px' mt='40px' fontSize={{ base:'12px', md:'18px', lg: '25px'}}> Comente e dê sua opinião de forma respeitosa e compreensível, isso ajuda muito na resolução e visibilidade das denúncias. Participe!</Text>     
        
        </Flex>

        <Flex  flexDirection='column' flexWrap='wrap' >
            <Image src={imgTemporaria} boxSize={{base: '20em', md: '30em', lg: '50em'}}></Image>
        </Flex>
          


        </Flex>
   
        <Box bgColor={'white'}>
        <Flex justifyContent='space-between'>
        
    
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
                           >
                            
                               </Button>
                               <Button variant='ghost'   w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                                  
                               </Button>
                               <Box ml={{ lg: '80px'}} fontSize={{base: '12px', md: '14px', lg: '18px'}} mr={{base: '400px', md: '2600px', lg: '0px'}}  fontWeight='normal'>
                                 Água estancada en el jd cidade do aco
                              </Box>
                           </CardFooter>
                   </Card>
  
  
          </Flex>
          <Flex flexDirection='column'>
           
            </Flex>
        </Flex>
            
        </Box>
          </Box>

  </Flex>



      </ChakraProvider>
    );
};  

export default Ver;