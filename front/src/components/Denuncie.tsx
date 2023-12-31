
import '../App.css';


//img

import realizarDen from "../img/realizarDen.png";
import enviandoDen from "../img/enviandoDen.png";


//chakra
import {
  ChakraProvider, extendTheme, Image, Flex, Box, Button, Text, FormControl,
  FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, Spacer, Select, Input, InputLeftElement, InputGroup, Textarea, useToast, Spinner, useColorMode, HStack, Stack, Heading, VStack, ModalCloseButton, ModalContent, ModalOverlay, IconButton
} from '@chakra-ui/react';



//react
import { useState } from "react";
import { useRef } from "react";


//bibliotecas
import axios from 'axios';
import jwt_decode from 'jwt-decode';

//react icons
import { BsCardText, BsCamera, BsListUl, BsCalendar3, BsImage } from "react-icons/bs"
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagemUrl, setImagemUrl] = useState('');
  const [isImageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [erro, setErro] = useState(false);
  const toast = useToast();

  const {colorMode} = useColorMode();




  const enviaDen = async () => {
    setCarregando(true);
    setErro(false);
  
    if (denNome === "" || denDesc === "" || denBairro === "" || !selectedImage || denProblema === "") {
      toast({
        title: 'Atenção',
        description: "Verifique se todos os campos estão preenchidos e uma imagem foi selecionada.",
        status: 'warning',
        duration: 4000,
        isClosable: true
      });
      console.log('Erro, algum campo vazio ou imagem não selecionada.');
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
      });
      setErro(true);
      setCarregando(false);
      return;
    }
  
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  
    const decodificaToken: any = await jwt_decode(token);
  
    const formData = new FormData();
    formData.append('selectedImage', selectedImage); // 'selectedImage' é o arquivo da imagem
    formData.append('den_nome', denNome);
    formData.append('den_desc', denDesc);
    formData.append('den_data', new Date().toISOString());
    formData.append('den_bairro', denBairro);
    formData.append('den_problema', denProblema);
    formData.append('usuario_usu_cod', decodificaToken.usu_cod);
  
    axios.post('http://localhost:3344/criarDenuncia', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('Denúncia postada');
      console.log(response.data);
      setDenCod(response.data.den_cod);
  
      setTimeout(() => {
        if (response) {
          toast({
            title: 'Denúncia criada',
            description: "Sua denúncia foi realizada e será encaminhada para as instituições.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
  
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        setCarregando(false);
      }, 1100);
  
    }).catch(error => {
      setErro(true);
      setCarregando(false);
  
      setTimeout(() => {
        setErro(false);
      });
  
      if (error) {
        toast({
          title: 'Erro',
          description: "Ocorreu um erro ao criar a denúncia. Verifique os campos e tente novamente.",
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        console.error(error);
      }
    });
  }
  

  const pegaTecla = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      enviaDen();
    }
  }

  const uploadImage = async () => {

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    if (!selectedImage) {
        return;
    }

    const formData = new FormData();
    formData.append('selectedImage', selectedImage);

    try {

        const response = await axios.post(
            `http://localhost:3344/uparImagem/${denCod}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    den_cod: denCod,
                },
            }
        );



        setImagemUrl(response.data);

        if (response) {
            toast({
                title: 'Imagem enviada',
                description: 'Sua imagem foi enviada e será exibida na denúncia.',
                status: 'success',
                duration: 4000,
                isClosable: true
            })
        }

        closeImageUploadModal();
    } catch (error) {
        console.error(error);
        toast({
            title: 'Erro',
            description: 'A imagem não pôde ser enviada. Verifique e tente novamente.',
            status: 'error',
            duration: 4000,
            isClosable: true
        })
    }
};
 const openImageUploadModal = () => {
        setImageUploadModalOpen(true);
    }

    const closeImageUploadModal = () => {
        setImageUploadModalOpen(false);
    }








  return (
    <ChakraProvider >

          <HStack w='full' h='120vh' bgColor='#f8f8ff'>

            <Flex w='full' h='full' alignItems='center' justifyContent='center'>
              <VStack >  
              <Text color='#338bb0' fontSize='35px' fontFamily='BreeSerif-Regular' mr={20} display={{base: 'none', md: 'flex'}}>Realize sua denúncia</Text>
               <Stack w='full' maxW='md' spacing={4} p={6}>
              <FormControl>

            <Text fontSize='35px' fontFamily='BreeSerif-Regular' display={{base: 'block', md:'none'}} color='#338bb0'  justifyContent='center'>Realize sua denúncia</Text> {/* exibir no cel, telas pequenas*/}
                <FormLabel mt='30px' fontSize={{ base: '17px', md: '18px' }} fontWeight='normal' >Título da denúncia:</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <HiOutlineClipboardDocumentList size='25px' />
                  </InputLeftElement>
                  <Input value={denNome}
                    onChange={(e) => setDenNome(e.target.value)}
                    border='1px solid black'
                    _hover={{ border: '1px solid #A9A9A9	' }}
                    type='text'
                    w={{base: '70vw'}}></Input>
                </InputGroup>
                <br></br>

                <FormLabel  fontSize={{ base: '17px', md: '18px' }} fontWeight='normal' >Selecione o bairro a ser denunciado</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <BsListUl size='25px' />
                  </InputLeftElement>

                  <Select
                    value={denBairro}
                    onChange={(e) => setDenBairro(e.target.value)}
                    border='1px solid black'
                    w={{base: '70vw'}}
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
                <br></br>
                <FormLabel whiteSpace='nowrap'  fontWeight='normal'  fontSize={{ base: '17px', md: '18px' }} >Digite o que está lhe incomodando: </FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <BsCardText size='25px' />
                  </InputLeftElement>
                  <Textarea value={denDesc}
                    onChange={(e) => setDenDesc(e.target.value)}
                    border='1px solid black'
                    w={{base: '70vw'}}
                    resize='vertical'
                    maxLength={130}
                    pl='2.5rem'
                    _hover={{ border: '1px solid #A9A9A9	' }}>
                  </Textarea>
                </InputGroup>
                      <br></br>
                <FormLabel whiteSpace='nowrap' placeholder='tipo de problema' fontWeight='normal' fontSize={{ base: '17px', md: '18px' }} >Problema específico:</FormLabel>

                <InputGroup>
                  <InputLeftElement>
                    <SiOpenstreetmap size='25px' />
                  </InputLeftElement>

                  <Select
                    value={denProblema}
                    onChange={(e) => setDenProblema(e.target.value)}
                    border='1px solid black'
                    _hover={{ border: '1px solid #A9A9A9	' }}
                    textAlign='center'
                    w={{base: '70vw'}}
                    onKeyDown={pegaTecla}>
                    <option value=''></option>
                    {opçoesDeProblemas.map((problema) => (
                      <option key={problema.value} value={problema.value}>
                        {problema.label}
                      </option> // mapeando o array e pegando cada opção como uma posição do array
                    ))}
                  </Select>
                </InputGroup>
                  
                <IconButton aria-label='imagem' mt={4}  boxShadow='lg' icon={<BsImage/>} bgColor='#338bb0' _hover={{ background: '#fff', color: '#338BB0' }} mr={3} color='white' onClick={openImageUploadModal}>Adicionar imagem</IconButton>
                <Modal isOpen={isImageUploadModalOpen} onClose={closeImageUploadModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Adicionar Imagem</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setSelectedImage(file);
                                }}
                            />
                            {selectedImage && (
                                <Image src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" boxShadow='lg' borderRadius='10px' />
                            )}
                        </ModalBody>
                        <ModalFooter> 
                            <Button boxShadow='lg' bgColor="#338bb0" _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}} color='white' onClick={closeImageUploadModal}>
                                Ok
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

              </FormControl>     
              <Spacer />
                  {carregando ? (
                     <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
                  ) : (
                   
                    <Button w='124px' type='submit' onClick={() => {
                      enviaDen();
                    }} bgColor='#338BB0' boxShadow='lg' color='white' _hover={{ color: '#338BB0', bgColor: 'white' }}>
                      Criar denúncia
                    </Button>
                  
                  )}
              </Stack>
              </VStack>
             
            </Flex>

            <Flex w='full' h='full' display={{base: 'none', md: 'flex'}} >
              <Image src={enviandoDen} objectFit='cover'></Image>
            </Flex>

            
            </HStack>

          {/* <HStack w='full' bgColor='#f8f8ff' h='100vh' display={{base: 'none', md: 'flex'}}>

            <Flex w='full' h='full' >
              <Image src={realizarDen} objectFit='cover'></Image>
            </Flex>


            <Flex display={{base: 'none', md: 'flex'}} w='full' h='full' alignItems='center' justifyContent='center'>
              <Stack w='full' maxW='md' spacing={4} p={6} mt={5}>
              <Heading fontSize={{base: '1xl', md: '3xl'}} fontFamily='BreeSerif-Regular' fontWeight='normal' color='#338bb0'>Realize sua denúncia</Heading>
              <Text  fontSize={{ base: '16px', md: '19px'}}>Seu lugar de denunciar é aqui. Esteja ciente de que suas denúncias poderão ser visualizadas por outros usuários e/ou instituições.</Text>


              <Heading fontSize={{base: '1xl', md: '3xl'}} fontFamily='BreeSerif-Regular' fontWeight='normal' color='#338bb0'>Acompanhamento</Heading>
              <Text fontSize={{ base: '16px', md: '19px' }}>O apoio dos outros usuários às denúncias ajuda na visibilidade, fazendo com que instituições vejam e desejem assumir a solução destas. Você pode acompanhar as soluções na página Denúncias Detalhadas</Text>
              </Stack>
            </Flex>

        </HStack> */}




    </ChakraProvider>
  );
};

export default Denuncie;