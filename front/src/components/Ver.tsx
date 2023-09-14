
import '../App.css';


//img

import verDenuncia from "../img/verDenuncia.png";
import enviandoDen from "../img/enviandoDen.png";
import aguaParada from '../img/aguaParada.jpg'


//chakra
import { ChakraProvider, extendTheme, Image, Flex, Box, Button, Text,  FormControl,
FormLabel, Spacer, Select,  Input, InputLeftElement, InputGroup, Textarea, useToast, Spinner, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Center} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import { SiOpenstreetmap } from 'react-icons/si';
import { useMediaQuery} from '@chakra-ui/react';


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

  const problemas = ['Falta de estrutura', 'Poluição', 'Falta de recursos públicos', 'Desmatamento']


const opçoesDeBairros = bairros.map((bairro, index) => ({
  value: index,
  label: bairro
}))

const opçoesDeProblemas = problemas.map((problema) => ({
  value: problema,
  label: problema
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
  const [denBairro, setDenBairro] = useState('');
  const [denProblema, setDenProblema] = useState('');
  
  const toast = useToast();
  const [isMediumScreen] = useMediaQuery("(min-width: 992px)");
  const paddingLeft = isMediumScreen ? "40px" : "10px";

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
          <Text w='410px' mt='40px' fontSize={{ base:'12px', md:'18px', lg: '25px'}}>Aqui você pode ver denúncias feitas por outros usuários. Opte pelo filtro de denúncias caso queira vê-las especificadamente.</Text>
               
                
          <Text color='#338BB0' mt='30px'  fontSize={{ base:'12px', md:'20px', lg: '35px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Resolução</Text>
          <Text w='450px' mt='40px' fontSize={{ base:'12px', md:'18px', lg: '25px'}}> Comente e dê sua opinião de forma respeitosa e compreensível, isso ajuda muito na resolução e visibilidade das denúncias. Participe!</Text>     
        
        </Flex>

        <Flex  flexDirection='column' flexWrap='wrap' >
            <Image src={verDenuncia} boxSize={{base: '20em', md: '30em', lg: '44em'}}></Image>
        </Flex>
          


        </Flex>
   
        <Box bgColor={'white'}>
        <Center>
          <Flex flexDirection='column'>
        <FormLabel mt='30px' fontSize={{base: '12px', md: '14px', lg: '18px'}} fontFamily='BreeSerif-Regular' fontWeight='normal' >Pesquisa por nome</FormLabel>

<InputGroup>
<InputLeftElement pointerEvents='none'>
{isMediumScreen && <FiSearch color="black" size="20px" />}
      </InputLeftElement>
  <Input value={denNome}
    onChange={(e) => setDenNome(e.target.value)}
    border='1px solid black'
    w={{ base: '140px', md: '180px', lg: '210px' }}
    _hover={{ border: '1px solid #A9A9A9	' }}
    fontSize={{ base: '8px', md: '12px', lg: '14.8px' }}
    mb='20px' mr='10px '  pl={paddingLeft}
    type='text'></Input>
</InputGroup>
</Flex>
          <Flex flexDirection='column'>
          <FormLabel mt='30px' fontSize={{base: '12px', md: '14px', lg: '18px'}} fontFamily='BreeSerif-Regular' fontWeight='normal'>Bairro</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                  {isMediumScreen && <BsListUl size='20px' />}
                  </InputLeftElement>

                  <Select

                    value={denBairro}
                    onChange={(e) => setDenBairro(e.target.value)}
                    border='1px solid black'
                    w={{ base: '140px', md: '180px', lg: '240px' }}
                    _hover={{ border: '1px solid #A9A9A9	' }}
                    fontSize={{ base: '8px', md: '12px', lg: '14.8px' }}
                    mb='20px' mr='10px' 
                    textAlign='center'
                  >
                    <option value=''></option>
                    {opçoesDeBairros.map((bairro) => (
                      <option key={bairro.value} value={bairro.value}>
                        {bairro.label}
                      </option> // mapeando o array e pegando cada opção como uma posição do array
                    ))}
                  </Select>
                </InputGroup>
          </Flex>

          <Flex flexDirection='column'>
          <FormLabel mt='30px' whiteSpace='nowrap'  fontSize={{base: '12px', md: '14px', lg: '18px'}} fontFamily='BreeSerif-Regular' fontWeight='normal' >Problema específico</FormLabel>

<InputGroup>
  <InputLeftElement>
  {isMediumScreen && <SiOpenstreetmap size='20px' />}
  </InputLeftElement>

  <Select
    value={denProblema}
    onChange={(e) => setDenProblema(e.target.value)}
    border='1px solid black'
    w={{ base: '140px', md: '180px', lg: '240px' }}
    _hover={{ border: '1px solid #A9A9A9	' }}
    fontSize={{ base: '8px', md: '12px', lg: '14.8px' }}
    mb='20px' mr='10px' 
    textAlign='center'>
    <option value=''></option>
    {opçoesDeProblemas.map((problema) => (
      <option key={problema.value} value={problema.value}>
        {problema.label}
      </option> // mapeando o array e pegando cada opção como uma posição do array
    ))}
  </Select>
</InputGroup>

          </Flex>
          <Flex>
          <Button type='submit' onClick={() => {
                      enviaDen();
                    }} bgColor='#338BB0' color='white' _hover={{ color: '#338BB0', bgColor: 'white' }}
                    mt={{ base: '35px', md: '38px', lg: '45px' }}>
                      Aplicar
                    </Button>
                    </Flex>
        </Center>
        
    <Center>
          <Flex flexDirection='column'>
          {denuncias.map((denuncia, index) =>(
            <CardGrande key={index} denuncia={denuncia}/>
          ))}
  </Flex>
          </Center>
          
            <Divider/>
            <Flex justify='space-between'>
              <Flex flexDirection='column'>

              
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