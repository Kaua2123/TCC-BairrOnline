import { Box, ChakraProvider, Image, Text, VStack, Input, Flex, HStack, Button, Grid, useToast, Modal, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalHeader, ModalBody, } from "@chakra-ui/react"
import { HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';

import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";



export const MeuPerfil = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [nomeUsu, setNomeUsu] = useState("");
    const [cepUsu, setCepUsu] = useState("");
    const [emailUsu, setEmailUsu] = useState("");
    const [senhaUsu, setSenhaUsu] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagemUrl, setImagemUrl] = useState(''); //para imagem de perfil
    const [isImageUploadModalOpen, setImageUploadModalOpen] = useState(false);
    const toast = useToast();
    
    const getUsuarios  = () => {
        axios.get('http://localhost:3344/getUsuarios')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.log('Erro ao buscar usuarios', error)
        })
    }

    useEffect(() => {
        getUsuarios();
    }, [])

    const updateUsuarios = async () => {

        const token = localStorage.getItem('token'); //token para proteção das rotas
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        const decodificaToken: any = jwtDecode(token);

        await axios.put(`http://localhost:3344/updateUsuarios/${decodificaToken.usu_cod}`, {
            usu_nome: nomeUsu,
            usu_cep: cepUsu,
            usu_email: emailUsu,
            usu_senha: senhaUsu
        })
        .then((response) => {
            console.log('sucesso', response);
            toast({
                title: 'Dados atualizados.',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        })
        .catch((error) => {
            console.log('erro', error)
            toast({
                title: 'Erro ao atualizar os dados.',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        })
    }

    const uploadImage = async () => {

        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        const decodificaToken: any = jwtDecode(token);


        if (!selectedImage) {
            return;
        }
        
        const formData = new FormData();
        formData.append('selectedImage', selectedImage);

        try {

            const response = await axios.post(
                `http://localhost:3344/imgPerfil/${decodificaToken.usu_cod}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        usu_cod: decodificaToken.usu_cod,
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
        <ChakraProvider>
            <HeaderUsu/>    
        <Box boxShadow='lg'  mt={8} borderRadius='12px' >
            <HStack  justify='center' w='full' h='60vh' alignItems='center'>
                {usuarios.map((usuario) => (
                    <>
                    {usuario.usu_img ? (
                        <>
                        <VStack alignItems='flex-start'>
                        <Image src={`http://localhost:3344/retornaImgPerfil/${usuario.usu_img}`} mr={20} boxShadow='lg' borderRadius='lg' boxSize='150px' />
                        <Text color='#338bb0'  fontSize='25px'>{usuario.usu_nome} </Text>
                        </VStack>
                        </>
                    ) : (
                        <Image src={imgAvatar} boxSize={{ base: '90px', md: '150px' }} mr={20}></Image>
                    )}
                    </>
                ))}
            
                <Text fontSize='35px'>Altere sua foto de perfil</Text>

                <Button ml={24} w='10vw' boxShadow='lg' bgColor='#338bb0' color='white' onClick={openImageUploadModal}>Alterar</Button>
            </HStack>
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
                            <Button colorScheme="blue" mr={3} onClick={uploadImage}>
                                Enviar Imagem
                            </Button>
                            <Button variant="ghost" onClick={closeImageUploadModal}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </Box>

        <Box boxShadow='lg' pb={10} mt={16} borderRadius='12px'>
            <VStack w='full' h='70vh' mt={10}>
                <Text fontSize='35px'>Altere seus dados aqui</Text>
                <HStack>
                    <Grid gap={20} templateColumns='1fr 1fr'>

                    <VStack alignItems='flex-start'>
                        <Text>Nome completo</Text>
                        <Input value={nomeUsu} onChange={(e) => {
                            setNomeUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>CEP</Text>
                        <Input value={cepUsu} onChange={(e) => {
                            setCepUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Email</Text>
                        <Input value={emailUsu} onChange={(e) => {
                            setEmailUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Senha</Text>
                        <Input value={senhaUsu} onChange={(e) => {
                            setSenhaUsu(e.target.value);
                        }}/>
                    </VStack>


                    </Grid> 
                </HStack>
                <Button mt={14} w='60%' bgColor='#338bb0' color='white' onClick={updateUsuarios}> Salvar suas informações </Button>
            </VStack>
        </Box>
        </ChakraProvider>
    )
}


