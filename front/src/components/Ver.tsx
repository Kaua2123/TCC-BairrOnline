
import '../App.css';


//img

import imgTemporaria from "../img/imgTemporaria.png";
import enviandoDen from "../img/enviandoDen.png";
import aguaParada from '../img/aguaParada.jpg'


//chakra
import { ChakraProvider, extendTheme, Image, Flex, Box, Button, Text,  FormControl,
FormLabel, Spacer, Select,  Input, InputLeftElement, InputGroup, Textarea, useToast, Spinner, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Center} from '@chakra-ui/react';



//react
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from 'axios';

//react icons
import { BsCardText, BsCamera, BsListUl, BsCalendar3, BsChatSquareText} from "react-icons/bs"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { MdOutlineReportProblem } from 'react-icons/md';
import Comentarios from './Comentarios';
import { Reportar } from './reportar';
import CardGrande from './CardGrande';

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

  const [denuncias, setDenuncias] = useState([]);
  const [denImg, setDenImg] = useState('');  
  const [denNome, setDenNome] = useState('');
  const [denPrazo, setDenPrazo] = useState('');
  const [denDesc, setDenDesc] = useState('');
  const [bairroCod, setBairroCod] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const toast = useToast();
  

  useEffect(() => {
    axios.get('http://localhost:3344/cardDenuncia')
    .then(response => {
      setDenuncias(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar denuncias', error);
    });
  }, []);

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

        
    <Center>
          <Flex >
          {denuncias.map((denuncia, index) =>(
            <CardGrande key={index} denuncia={denuncia}/>
          ))}
  
  
          </Flex>
          </Center>
            <Divider/>
            <Flex justify='space-between'>
              <Flex flexDirection='column'>

                <Box p='120px' >
                <Text mt='-60px' fontFamily='BreeSerif-Regular' fontWeight='bold' fontSize={{base: '12px', md: '14px', lg: '18px'}}>@Schweinsteger</Text>
                <Text mt='50px' fontSize={{base: '12px', md: '14px', lg: '18px'}}>Stehendes Wasser in der Nähe von JD Cidade do Aco, ich kann
        es nicht mehr ertragen! Es blockiert den größten Teil des 
        Durchgangs. 
</Text>
                </Box>
              </Flex>

                <Flex flexDirection='column'>

                <Box>
                <Text mt={{base:'-42px', md:'-46px' , lg:'-60px'}} p='100px' color='#338BB0'   fontSize={{ base:'16px', md:'20px', lg: '35px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' mr='150px'>Comentários</Text>
                </Box>
              </Flex>
            </Flex>
        </Box>
          </Box>

  </Flex>



      </ChakraProvider>
    );
};  

export default Ver;