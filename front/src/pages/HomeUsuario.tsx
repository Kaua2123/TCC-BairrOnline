import '../App.css';



//imgs
import sectionOla from "../img/sectionOlaDenunciante.png";

import denunciaNotFound from "../img/denunciaNotFound.png";


//react
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

//chakra
import {Center, Box,
ChakraProvider, Flex,
Image,
Button, Text, useColorMode, useToast,
AlertDialogContent, AlertDialogHeader,
AlertDialogBody,
AlertDialogFooter,
AlertDialog,
AlertDialogOverlay,
Spacer,
Modal,
useDisclosure,
ModalBody,
ModalCloseButton,
ModalContent,
ModalFooter,
ModalHeader,
ModalOverlay,
Spinner,
HStack,
Stack,
Heading
} from '@chakra-ui/react'



//componentes
import Footer from '../components/Footer';
import { HeaderUsu } from '../components/Header';
import Denuncie from '../components/Denuncie';
import { SlideDenUsu } from '../components/SlideDen';
import axios from 'axios';
import AcompanharDen from '../components/AcompanharDen';

//icones
import {IoTrashBinSharp} from 'react-icons/io5'
import jwtDecode from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';





const HomeUsuario = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [temDenuncia, setTemDenuncia] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const navigate = useNavigate();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    if(decodificaToken.usu_tipo !== 'denunciante'){
      navigate('/');
    }
  }, [])


  async function getDenuncia () { //pega os dados da denuncia

    const token = localStorage.getItem('token'); //primeiro pegar o token, pois é uma rota protegida
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
      }

   await axios.get('http://localhost:3344/getDenunciaLogado')
      .then(response => {
        setDenuncias(response.data)

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

  

  async function deleteTodasDenuncias () {

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
      }

    await axios.delete('http://localhost:3344/deleteTodasDenuncias')
      .then(response => {
        console.log('Todas as denúncias foram deletadas.', response)
        if(response){
          toast({
            title: 'Deletadas',
            description: 'Todas suas denúncias foram deletadas com sucesso. Você pode reverter...',
            status: 'success',
            isClosable: true,
            duration: 4000
          })
        }
      })
      .catch(error => {
        console.error(error);
        if(error){
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro ao deletar todas as denúncias.',
            status: 'error',
            isClosable: true,
            duration: 4000
          })
        }
      })
  }

  

  const openAlertDialog = () => {
    setIsAlertDialogOpen(true);
};

const closeAlertDialog = () => {
    setIsAlertDialogOpen(false);
};



 return (
  <ChakraProvider>
    <HeaderUsu/>



        <HStack w='full' h='100vh'>
          
          <Flex w='full' h='full' display={{base: 'none', md: 'flex'}} id='denuncie'>

          <Flex flexDirection='column' alignItems='center'>
            <Heading mt={14} fontSize='5xl' color='#338bb0' fontFamily='BreeSerif-Regular' fontWeight='none'>Olá, denunciante!</Heading>
            <Image src={sectionOla} objectFit='cover' zIndex='-1' />
          </Flex>

          </Flex>


          <Flex w='full' h='full' alignItems='center' justifyContent='center'>
            <Stack w='full' maxW='md' spacing={4} p={6}>
            
            <Heading fontSize='35px' color='#338bb0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Seção do Usuário</Heading>
          
            <Text fontSize='25px' whiteSpace='nowrap'>Denuncie, veja suas <b> denúncias</b> <br /> e o retorno das instituições</Text>
          
            </Stack>
          </Flex>
       
          </HStack>

        <Box id='denuncieAqui'>
          <Denuncie/>
        </Box>

        <Box id='minhasDen'>
        <Flex justify='center'>
          <Box>
            <Text fontSize='44px' color='#338BB0'  fontFamily='BreeSerif-Regular' whiteSpace='nowrap' >Suas denúncias</Text>
          </Box>
        </Flex>


            <Center>
                <Box maxH='900px' w='1400px' mt='20px'  boxShadow='lg'>

                  {temDenuncia ? ( // se tiver denuncia
                     <SlideDenUsu denuncias={denuncias}/>
                  ) : ( // se não
                    <>
                    <Flex justify='center'>
                      <Image src={denunciaNotFound}></Image> {/*img temporaria */}
                    </Flex>
                    <Flex justify='center'>
                      <Text fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='normal' mt='-60px' p={8} color='#338bb0'>Parece que você não realizou nenhuma denúncia...</Text>
                    </Flex>
                    </>
                  )}


              {/* as denuncias da home n tem mais comentarios diretamente nelas agora, tem um botao
              ver denuncia q vai pra pagina de ver denuncias do gabriel, e lá vai ter a exibição da denuncia
              que foi clicada e de outras se o cara quiser filtrar. lá vai ter os comentarioszin */}



                </Box>
                </Center>
          </Box>

          {temDenuncia && ( // oq ta aq dentro só aparece se tiver denúncia
            <Box>
            <Center>
              <Button mt='20px' onClick={openAlertDialog} colorScheme='red'>
                Apagar todas
              </Button>
            </Center> 
          </Box>
        )}


          <AlertDialog isOpen={isAlertDialogOpen} leastDestructiveRef={cancelRef} onClose={closeAlertDialog}>
                            <AlertDialogOverlay>
                                <AlertDialogContent fontSize='lg' fontWeight='bold'>
                                    <AlertDialogHeader>
                                        <Text color='#338BB0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Apagar todas as denúncias</Text>
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <Text fontWeight='normal'>Tem certeza? </Text>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={closeAlertDialog}>
                                            Cancelar
                                        </Button>
                                        <Button bgColor='#E75760' color='white' _hover={{ backgroundColor: '#D71D28' }} onClick={() => {
                                            deleteTodasDenuncias();
                                            closeAlertDialog();
                                        }} ml={3}>
                                            Apagar
                                        </Button>

                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

         
      

 

                     


     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;
