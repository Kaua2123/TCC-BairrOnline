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
Spinner
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





const HomeUsuario = () => {

  const [denuncias, setDenuncias] = useState([]);
  const [denunciasExcluidas, setDenunciasExcluidas] = useState([]);
  const [denunciaExcluidaCod, setDenunciaExcluidaCod] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [temDenuncia, setTemDenuncia] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();


  async function getDenuncia () { //pega os dados da denuncia
   await axios.get('http://localhost:3344/cardDenuncia')
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

  async function getDenunciaExcluida () {
    await axios.get('http://localhost:3344/getDenunciaExcluida')
      .then(response => {
        setDenunciasExcluidas(response.data);
        const codigosExcluidos = response.data.map(denunciaExcluida => denunciaExcluida.den_cod);
        setDenunciaExcluidaCod(codigosExcluidos);
      })
      .catch(error => {
        console.error('Erro ao buscar as denúncias excluidas', error);
      });
  }

  useEffect(() => {
    getDenunciaExcluida();
  }, [])

  async function reverterDenunciaExcluida () {
    setCarregando(true);

    await axios.post(`http://localhost:3344/reverterDenunciaExcluida/${denunciaExcluidaCod}`)
    .then(response => {
      if(response){
        toast({
          title: 'Sucesso',
          description: 'Sua denúncia foi revertida.',
          status: 'success',
          duration: 4000,
          isClosable: true
        });
        setCarregando(false);
      }
    })
    .catch(error => {
      if(error){
        toast({
          title: 'Erro',
          description: 'Houve um erro ao reverter a denúncia excluída.',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        setCarregando(false);
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


    <Flex align='center'>
      <Box borderRadius='4px' h='auto' w='100%'>

        <Text p='100px' fontSize='64px' color='#338bb0' fontFamily='BreeSerif-Regular'>Olá, Denunciante!</Text>

        <Flex justifyContent='space-between'>
          <Flex direction='column' mt='-200px' id='denuncie'>
            <Image src={sectionOla} boxSize='50em' ></Image>
          </Flex>


          <Flex direction='column' p='180px' mt='-150px'>
            <Box>
            <Text fontSize='44px' color='#338bb0'  fontFamily='BreeSerif-Regular' whiteSpace='nowrap' align='center'>Seção do Usuário</Text>
            </Box>
            <Box mt='70px'>
            <Text fontSize='25px' whiteSpace='nowrap'>Denuncie, veja suas <b color='green'> denúncias</b> <br /> e o retorno das instituições</Text>
            </Box>
          </Flex>
        </Flex>


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
            <Box mt='-30px'>
            <Button bgColor='#338bb0' color='white' _hover={{ background: '#fff', color: '#338BB0' }} leftIcon={<IoTrashBinSharp/>} onClick={onOpen}>
              Denúncias excluidas
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Denúncias Excluidas</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                           {denunciasExcluidas.map((denunciaExcluida, index) => (
                            <Box key={index}>
                            <p>Nome: {denunciaExcluida.den_nome}</p>
                            <p>Prazo: {denunciaExcluida.den_prazo}</p>
                            <p>Descrição: {denunciaExcluida.den_desc}</p>
                            <p>Data: {denunciaExcluida.den_data}</p>
                            <p>Imagem: {denunciaExcluida.den_img}</p>
                            <p>Bairro: {denunciaExcluida.den_bairro}</p>
                            <p>Problema: {denunciaExcluida.den_problema}</p>
                            <p>Data de Exclusão da denúncia: {denunciaExcluida.den_data_exclusao}</p>
                            </Box>
                           ))}
                        </ModalBody>
                        <ModalFooter>
                          {carregando && (
                            <Spinner color='#338bb0'/>
                          )}
                            <Button bgColor='#338bb0' color='white' display={carregando ? 'none' : 'unset'} _hover={{ background: '#fff', color: '#338BB0' }} mr={3} onClick={reverterDenunciaExcluida} >
                                Reverter
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
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

          <Box id='acompanharDen'>
            <AcompanharDen/>
          </Box>
      </Box>

    </Flex>




     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;
