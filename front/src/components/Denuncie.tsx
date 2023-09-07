
import '../App.css';


//img

import realizarDen from "../img/realizarDen.png";
import enviandoDen from "../img/enviandoDen.png";


//chakra
import {
  ChakraProvider, extendTheme, Image, Flex, Box, Button, Text, FormControl,
  FormLabel, Spacer, Select, Input, InputLeftElement, InputGroup, Textarea, useToast, Spinner
} from '@chakra-ui/react';



//react
import { useState } from "react";
import { useRef } from "react";


//bibliotecas
import axios from 'axios';
import jwt_decode from 'jwt-decode';

//react icons
import { BsCardText, BsCamera, BsListUl, BsCalendar3 } from "react-icons/bs"
import { SiOpenstreetmap } from 'react-icons/si';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"

const bairros = ['Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte',
  'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal',
  'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia',
  'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera',
  'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês',
  'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta',
  'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];

const problemas = ['Falta de estrutura', 'Poluição', 'Falta de recursos públicos', 'Desmatamento']

const opçoesDeBairros = bairros.map((bairro) => ({
  value: bairro,
  label: bairro
}))

const opçoesDeProblemas = problemas.map((problema) => ({
  value: problema,
  label: problema
}))

const Denuncie = () => {

  const [denCod, setDenCod] = useState('');
  const [denImg, setDenImg] = useState('');
  const [denNome, setDenNome] = useState('');
  const [denPrazo, setDenPrazo] = useState('');
  const [denDesc, setDenDesc] = useState('');
  const [denBairro, setDenBairro] = useState('');
  const [denProblema, setDenProblema] = useState('');
  const [usuCod, setUsuCod] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const toast = useToast();




  const enviaDen = async () => {
    setCarregando(true);
    setErro(false);


    if (denNome === "" || denDesc === "" || denBairro === "") {//lógica de validação dos campos pra n mandar nada vazio
      toast({
        title: 'Erro',
        description: "Algum campo parece estar vazio ou com dados incorretos. Verifique e tente novamente.",
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      console.log('Erro, algum campo vazio.')
      setErro(true);
      setCarregando(false);
      return;

    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Usuário não autenticado',
        description: 'Logue para realizar a denúncia.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      setErro(true);
      setCarregando(false);
      return;
    }

    const decodificaToken: any = await jwt_decode(token);



    axios.post('http://localhost:3344/criarDenuncia', {
      den_nome: denNome,
      den_desc: denDesc,
      den_data: new Date(),
      den_bairro: denBairro,
      den_problema: denProblema,
      usuario_usu_cod: decodificaToken.usu_cod
    }).then(response => {
      console.log('Denúncia postada');
      console.log(response.data);
      setDenCod(response.data.den_cod);

      if (response) { // se for criada, executa o codigo abaixo, responsavel pelo feedback ao usuario
        toast({
          title: 'Denúncia criada',
          description: "Sua denúncia foi realizada e será encaminhada para as instituições.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
      setCarregando(false);
    }).catch((error) => {

      setErro(true);
      setCarregando(false);

      setTimeout(() => {
        setErro(false);
      })
      if (error) {
        toast({
          title: 'Erro',
          description: "Algum campo parece estar vazio ou com dados incorretos. Verifique e tente novamente.",
          status: 'error',
          duration: 4000,
          isClosable: true
        })
        setCarregando(false);
      }
      console.error(error);
    });
  }






  //pra upar a imagem com click no iconezinho da camera




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

        <Box bg='#F8F8FF' borderRadius='4px' h='auto' w='100%'>

          <Flex justifyContent='space-between'>

            <Flex flexDirection='column' flexWrap='wrap' >
              <Image src={realizarDen} boxSize={{ base: '25em', md: '34em', lg: '54em' }}></Image>
            </Flex>


            <Flex flexDirection='column' m='20px' mt='100px' w='610px'>
              <Text color='#338BB0' fontSize={{ base: '12px', md: '20px', lg: '35px' }} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Realize sua denúncia</Text>
              <Text w='410px' mt='40px' fontSize={{ base: '12px', md: '18px', lg: '25px' }}>Seu lugar de denunciar é aqui. Esteja ciente de que suas denúncias poderão ser visualizadas por outros usuários e/ou instituições.</Text>


              <Text color='#338BB0' mt='30px' fontSize={{ base: '12px', md: '20px', lg: '35px' }} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Acompanhamento </Text>
              <Text w='450px' mt='40px' fontSize={{ base: '12px', md: '18px', lg: '25px' }}>O apoio dos outros usuários às denúncias ajuda na visibilidade, fazendo com que instituições vejam e desejem assumir a solução destas. Você pode acompanhar as soluções na página Acompanhar Denúncias</Text>

            </Flex>



          </Flex>


          <Flex justifyContent='space-between'>


            <Flex flexDirection='column'>
              <FormControl p='100px'  >
                <FormLabel fontSize={{ base: '14px', md: '20px', lg: '28px' }} fontWeight='normal' >Protocolo da denúncia: </FormLabel>

                <FormLabel mt='30px' fontSize={{ base: '14px', md: '20px', lg: '28px' }} fontWeight='normal' >Título da denúncia:</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <HiOutlineClipboardDocumentList size='25px' />
                  </InputLeftElement>
                  <Input value={denNome}
                    onChange={(e) => setDenNome(e.target.value)}
                    border='1px solid black'
                    w={{ base: '220px', md: '280px', lg: '340px' }}
                    _hover={{ border: '1px solid #A9A9A9	' }}
                    type='text'></Input>
                </InputGroup>

                <FormLabel mt='30px' fontSize={{ base: '14px', md: '20px', lg: '28px' }} fontWeight='normal' >Selecione o bairro a ser denunciado</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <BsListUl size='25px' />
                  </InputLeftElement>

                  <Select

                    value={denBairro}
                    onChange={(e) => setDenBairro(e.target.value)}
                    border='1px solid black'
                    w={{ base: '220px', md: '280px', lg: '340px' }}
                    _hover={{ border: '1px solid #A9A9A9	' }}
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

                <FormLabel mt='30px' whiteSpace='nowrap' fontSize={{ base: '14px', md: '20px', lg: '28px' }} fontWeight='normal' >Digite o que está lhe incomodando: </FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <BsCardText size='25px' />
                  </InputLeftElement>
                  <Textarea value={denDesc}
                    onChange={(e) => setDenDesc(e.target.value)}
                    border='1px solid black'
                    w={{ base: '29ch', md: '37ch', lg: '45ch' }}
                    resize='vertical'
                    maxLength={220}
                    pl='2.5rem'
                    _hover={{ border: '1px solid #A9A9A9	' }}>
                  </Textarea>
                </InputGroup>

                <FormLabel mt='30px' whiteSpace='nowrap' placeholder='tipo de problema' fontSize={{ base: '14px', md: '20px', lg: '28px' }} fontWeight='normal' >Problema específico:</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <SiOpenstreetmap size='25px' />
                  </InputLeftElement>

                  <Select
                    value={denProblema}
                    onChange={(e) => setDenProblema(e.target.value)}
                    border='1px solid black'
                    w={{ base: '220px', md: '280px', lg: '340px' }}
                    _hover={{ border: '1px solid #A9A9A9	' }}
                    textAlign='center'>
                    <option value=''></option>
                    {opçoesDeProblemas.map((problema) => (
                      <option key={problema.value} value={problema.value}>
                        {problema.label}
                      </option> // mapeando o array e pegando cada opção como uma posição do array
                    ))}
                  </Select>
                </InputGroup>



                <InputGroup>


                  <Spacer />
                  {carregando ? (
                    <Spinner size='xl' color='#338BB0' />
                  ) : (
                    <Box mt='80px'>
                    <Button type='submit' onClick={() => {
                      enviaDen();
                    }} bgColor='#338BB0' color='white' _hover={{ color: '#338BB0', bgColor: '#DCDCDC' }}>
                      Criar denúncia
                    </Button>
                    </Box>
                  )}

                </InputGroup>

                {/*essa linha de baixo que mostra as imagens dps de enviar */}
                {denImg && (
                  <Image
                    src={denImg}
                    alt="Imagem da denúncia"
                    maxW="100%"
                    h="auto"
                    boxShadow='2xl'
                    borderRadius='10px'
                  />
                )}
              </FormControl>

            </Flex>
            <Flex direction='column'>
              <Image src={enviandoDen} boxSize={{ base: '38em', md: '42em', lg: '48em' }}></Image>
            </Flex>
          </Flex>

        </Box>

      </Flex>



    </ChakraProvider>
  );
};

export default Denuncie;