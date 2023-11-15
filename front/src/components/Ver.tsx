
import '../App.css';


//img



//chakra
import {
  ChakraProvider, extendTheme, Flex, Box, Button, Text, 
  FormLabel, Select, Input, InputLeftElement, InputGroup, Spinner, Divider, HStack, VStack, Grid
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi'
import { SiOpenstreetmap } from 'react-icons/si';
import { useMediaQuery } from '@chakra-ui/react';


//react
import { useEffect, useState } from "react";
import axios from 'axios';

//react icons
import CardGrande from './CardGrande';
import { CiLocationOn } from 'react-icons/ci';

const bairros = ['Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte',
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
  const [termoPesquisa, setTermoPesquisa] = useState(""); // Estado para armazenar o termo de pesquisa
  const [mensagemPesquisa, setMensagemPesquisa] = useState("");
  const [mensagemNenhumaDen, setMensagemNenhumaDen] = useState("");
  const [denunciasFiltradas, setDenunciasFiltradas] = useState([]); // Estado para armazenar as denúncias filtradas
  const [filtroAtivo, setFiltroAtivo] = useState(false); // Estado para controlar se o filtro está ativo
  const [nenhumaDenuncia, setNenhumaDenuncia] = useState(false);
  const bairrosUnicos = [...new Set(denuncias.map((denuncia) => denuncia.den_bairro))];
  const opcoesDeBairros = bairros.map((bairro, index) => ({
    value: bairro,
    label: bairro
  }));



  const [isMediumScreen] = useMediaQuery("(min-width: 992px)");
  const paddingLeft = isMediumScreen ? "40px" : "10px";



  useEffect(() => {
    axios.get('http://localhost:3344/getDenuncia')
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



      <HStack w='full' h='45vh'>
        <Flex w='full' h='full'>
          <VStack m={20} alignItems={{base: 'center', md: 'flex-start'}} >
            <Text color='#338bb0' fontSize={{md: '50px'}} display={{base: 'none', md: 'flex'}} fontFamily='BreeSerif-Regular'>Veja aqui as denúncias, apoie a comunidade.</Text>
            <Text color='#338bb0' fontSize={{md: '30px'}} display={{base: 'flex', md: 'none'}} fontFamily='BreeSerif-Regular' mb={{base: '4', md: '0'}}>Ver denúncias</Text>
            <Text mt={5} display={{base: 'none', md: 'flex'}}>Você pode filtrá-las para um melhor manuseio e visualização.</Text>
            <HStack display={{base: 'none', md: 'flex'}}>
            <Flex flexDirection="column">
                <FormLabel mt="30px" fontSize={{ base: '12px', md: '14px', lg: '18px' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>Pesquisa por nome</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    {isMediumScreen && <FiSearch color="black" size="20px" />}
                  </InputLeftElement>
                  <Input
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    border='1px solid black'
                    w={{ base: '140px', md: '180px', lg: '210px' }}
                    _hover={{ border: '1px solid #A9A9A9 ' }}
                    fontSize={{ base: '8px', md: '12px', lg: '14.8px' }}
                    mb='20px' mr='10px ' pl={paddingLeft}
                    type='text'
                  />
                </InputGroup>
              </Flex>
              <Flex flexDirection='column'>
                <FormLabel mt='30px' fontSize={{ base: '12px', md: '14px', lg: '18px' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>Bairro</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    {isMediumScreen && <CiLocationOn color='black' size='20px'/>}
                  </InputLeftElement>

                  <Select
  value={denBairro}
  onChange={(e) => setDenBairro(e.target.value)}
  border='1px solid black'
  w={{ base: '140px', md: '180px', lg: '240px' }}
  _hover={{ border: '1px solid #A9A9A9 ' }}
  fontSize={{ base: '8px', md: '12px', lg: '14.8px' }}
  mb='20px' mr='10px'
  textAlign='center'
>
  <option value=''></option>
  {opcoesDeBairros.map((bairro) => (
    <option key={bairro.value} value={bairro.value}>
      {bairro.label}
    </option>
  ))}
</Select>
                </InputGroup>
              </Flex>

      <Flex flexDirection='column' >
                <FormLabel mt='30px' whiteSpace='nowrap' fontSize={{ base: '12px', md: '14px', lg: '18px' }} fontFamily='BreeSerif-Regular' fontWeight='normal' >Problema específico</FormLabel>
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
                      </option> // mapeando oa array e pegando cada opção como uma posição do array
                    ))}
                  </Select>
                </InputGroup>

              </Flex>
  
              

              <Flex>
                <Button
                  type='submit'
                  onClick={() => {
                    // Filtrar as denúncias com base no termo de pesquisa
                    
                    if (termoPesquisa || denBairro || denProblema) {
                      // Se algum filtro estiver ativo, define o estado do filtroAtivo como verdadeiro
                      setCarregando(true);
                      setFiltroAtivo(true);

                      // Filtra as denúncias com base nos critérios de pesquisa
                      setTimeout(() => {
                        if (denunciasFiltradas.length === 0) {
                          setMensagemNenhumaDen('Nenhuma denúncia encontrada');
                        }
                      }, 1000)
                     
                      

                      setTimeout(() => {
                        let mensagem = 'Denúncias encontradas para a pesquisa: ' // para exibir pro usuario oq ele pesquisou
                        if (termoPesquisa) mensagem += ` "${termoPesquisa}"`;
                        if (denBairro) mensagem += ` Bairro selecionado: "${denBairro}"`;
                        if (denProblema) mensagem += ` Problema selecionado: "${denProblema}"`;
  
                        setMensagemPesquisa(mensagem);
                      }, 1000)

                      setTimeout(() => {

                  
                      const denunciasFiltradas = denuncias.filter((denuncia) => {
                        const nomeInclui = denuncia.den_nome.toLowerCase().includes(termoPesquisa.toLowerCase());
                        const bairroCorresponde = denuncia.den_bairro === denBairro || !denBairro;
                        const problemaCorresponde = denuncia.den_problema === denProblema || !denProblema;

                        return nomeInclui && bairroCorresponde && problemaCorresponde;
                      });

                      setDenunciasFiltradas(denunciasFiltradas);
                      setCarregando(false);
                    }, 1000)
                    } else {
                      // Se nenhum filtro estiver ativo, define o estado do filtroAtivo como falso
                      setFiltroAtivo(false);
                      setMensagemPesquisa(''); //limpando a mensagem da pesquisa
                    }
                  }}
                  bgColor='#338BB0'
                  color='white'
                  _hover={{ color: '#338BB0', bgColor: 'white' }}
                  mt={{ base: '35px', md: '38px', lg: '45px' }}
                  boxShadow='lg'
                >
                  Aplicar
                </Button>
              </Flex>
            </HStack>

{/* mobile, responsivo, sla */}
            <VStack display={{base: 'flex', md: 'none'}}> 
            <Flex mb={4}>
                <FormLabel fontSize={{ base: '14px' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>Nome</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    {isMediumScreen && <FiSearch color="black" size="20px" />}
                  </InputLeftElement>
                  <Input
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    border='1px solid black'
                    w={{ base: '140px', md: '180px', lg: '210px' }}
                    _hover={{ border: '1px solid #A9A9A9 ' }}
                    fontSize={{ base: '14px' }}
                    type='text'
                  />
                </InputGroup>
              </Flex>
              <Flex mb={4}>
                <FormLabel  fontSize={{ base: '14px' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>Bairro</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    {isMediumScreen && <CiLocationOn color='black' size='20px'/>}
                  </InputLeftElement>

                  <Select
  value={denBairro}
  onChange={(e) => setDenBairro(e.target.value)}
  border='1px solid black'
  w={{ base: '140px', md: '180px', lg: '240px' }}
  _hover={{ border: '1px solid #A9A9A9 ' }}
  fontSize={{ base: '14px' }}
  textAlign='center'
  
>
  <option value=''></option>
  {opcoesDeBairros.map((bairro) => (
    <option key={bairro.value} value={bairro.value}>
      {bairro.label}
    </option>
  ))}
</Select>
                </InputGroup>
              </Flex>

      <Flex mr={5}>
                <FormLabel whiteSpace='nowrap'    fontSize={{ base: '14px' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>Problema</FormLabel>
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
                    fontSize={{ base: '14px' }}
                    textAlign='center'>
                    <option value=''></option>
                    {opçoesDeProblemas.map((problema) => (
                      <option key={problema.value} value={problema.value}>
                        {problema.label}
                      </option> // mapeando oa array e pegando cada opção como uma posição do array
                    ))}
                  </Select>
                </InputGroup>

              </Flex>
  
              

              <Flex>
                <Button
                  type='submit'
                  onClick={() => {
                    // Filtrar as denúncias com base no termo de pesquisa
                    
                    if (termoPesquisa || denBairro || denProblema) {
                      // Se algum filtro estiver ativo, define o estado do filtroAtivo como verdadeiro
                      setCarregando(true);
                      setFiltroAtivo(true);

                      // Filtra as denúncias com base nos critérios de pesquisa
                      setTimeout(() => {
                        if (denunciasFiltradas.length === 0) {
                          setMensagemNenhumaDen('Nenhuma denúncia encontrada');
                        }
                      }, 1000)
                     
                      

                      setTimeout(() => {
                        let mensagem = 'Denúncias encontradas para a pesquisa: ' // para exibir pro usuario oq ele pesquisou
                        if (termoPesquisa) mensagem += ` "${termoPesquisa}"`;
                        if (denBairro) mensagem += ` Bairro selecionado: "${denBairro}"`;
                        if (denProblema) mensagem += ` Problema selecionado: "${denProblema}"`;
  
                        setMensagemPesquisa(mensagem);
                      }, 1000)

                      setTimeout(() => {

                  
                      const denunciasFiltradas = denuncias.filter((denuncia) => {
                        const nomeInclui = denuncia.den_nome.toLowerCase().includes(termoPesquisa.toLowerCase());
                        const bairroCorresponde = denuncia.den_bairro === denBairro || !denBairro;
                        const problemaCorresponde = denuncia.den_problema === denProblema || !denProblema;

                        return nomeInclui && bairroCorresponde && problemaCorresponde;
                      });

                      setDenunciasFiltradas(denunciasFiltradas);
                      setCarregando(false);
                    }, 1000)
                    } else {
                      // Se nenhum filtro estiver ativo, define o estado do filtroAtivo como falso
                      setFiltroAtivo(false);
                      setMensagemPesquisa(''); //limpando a mensagem da pesquisa
                    }
                  }}
                  bgColor='#338BB0'
                  color='white'
                  _hover={{ color: '#338BB0', bgColor: 'white' }}
                  mt={{ base: '35px', md: '38px', lg: '45px' }}
                  boxShadow='lg'
                >
                  Aplicar
                </Button>
              </Flex>
            </VStack>
            

            
    
                <Flex justifyContent='center'>
                  {carregando && (
                     <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
                  )}
                  {mensagemPesquisa && (
                    <Text>{mensagemPesquisa}</Text>
                  )}
                </Flex>
        
          </VStack>
        
        </Flex>
      </HStack>
      <VStack bgColor={'white'}>
            {/* Usar denuncias ou denunciasFiltradas com base no estado do filtroAtivo */}
 
              <Grid templateColumns="repeat(2, 1fr)" gap={4}  >
                {filtroAtivo ? (
                  denunciasFiltradas.length === 0 ? (
 
                    <Box mt='-20px' borderRadius='12px' bgColor='white' p={10} boxShadow='lg'>
                      <Text color='#338bb0' fontSize='40px' fontFamily='BreeSerif-Regular'>{mensagemNenhumaDen}</Text>
                    </Box>
   
                  ) : (
                    
                    denunciasFiltradas.map((denuncia, index) => (
                      <CardGrande key={index} denuncia={denuncia} />
                    ))
                  )       
                ) : (
                  denuncias.map((denuncia, index) => (
                    <CardGrande key={index} denuncia={denuncia} />
                  ))
                )}
              </Grid>
      

            <Divider />
          </VStack>
    



          {/* <Flex justifyContent='space-between'>



            <Flex flexDirection='column' p='100px' w='610px'>
              <Text color='#338BB0' fontSize={{ base: '12px', md: '20px', lg: '35px' }} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Veja outras denúncias</Text>
              <Text w='410px' mt='40px' fontSize={{ base: '12px', md: '18px', lg: '25px' }}>Aqui você pode ver denúncias feitas por outros usuários. Opte pelo filtro de denúncias caso queira vê-las especificadamente.</Text>


              <Text color='#338BB0' mt='30px' fontSize={{ base: '12px', md: '20px', lg: '35px' }} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Resolução</Text>
              <Text w='450px' mt='40px' fontSize={{ base: '12px', md: '18px', lg: '25px' }}> Comente e dê sua opinião de forma respeitosa e compreensível, isso ajuda muito na resolução e visibilidade das denúncias. Participe!</Text>

            </Flex>

            <Flex flexDirection='column' flexWrap='wrap' >
              <Image src={verDenuncia} boxSize={{ base: '20em', md: '30em', lg: '44em' }}></Image>
            </Flex>



          </Flex> */}

    



    </ChakraProvider>
  );
};

export default Ver;