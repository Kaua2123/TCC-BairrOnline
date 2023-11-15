import { Box, ChakraProvider, Image, Text, VStack, Input, Flex, HStack, Button, Grid, useToast, Modal, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalHeader, ModalBody, IconButton, } from "@chakra-ui/react"
import Header, { HeaderADM, HeaderInst, HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';

import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { FaEyeSlash, FaEye } from "react-icons/fa";



const MeuPerfil = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [nomeUsu, setNomeUsu] = useState("");
    const [cepUsu, setCepUsu] = useState("");
    const [emailUsu, setEmailUsu] = useState("");
    const [senhaUsu, setSenhaUsu] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagemUrl, setImagemUrl] = useState(''); //para imagem de perfil
    const [alterando, setAlterando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isImageUploadModalOpen, setImageUploadModalOpen] = useState(false);
    const toast = useToast();

    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    const getUsuarios = () => {

        const token = localStorage.getItem('token'); //primeiro pegar o token, pois é uma rota protegida
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        axios.get('http://localhost:3344/getUsuarioLogado')
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

        if (nomeUsu === "" || emailUsu === "") {//lógica de validação dos campos pra n mandar nada vazio
            toast({
                title: 'Preencha todos os campos.',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
            console.log('Erro, algum campo vazio.')
            return;
        }


        await axios.put(`http://localhost:3344/updateUsuarios/${decodificaToken.usu_cod}`, {
            usu_nome: nomeUsu,
            usu_email: emailUsu,
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

    let headerComponent = null;

    if (decodificaToken && decodificaToken.usu_tipo === 'denunciante') {
        headerComponent = <HeaderUsu />;
    } else if (decodificaToken && decodificaToken.usu_tipo === 'instituicao') {
        headerComponent = <HeaderInst />;
    } else if (decodificaToken && decodificaToken.usu_tipo === 'administrador') {
        headerComponent = <HeaderADM />
    }
    else {
        headerComponent = <Header />;
    }


    return (
        <ChakraProvider>
            {headerComponent}
            <Box boxShadow='lg' mt={8} borderRadius='12px' >
                <HStack justify='center' w='full' h='60vh' alignItems='center'>
                    {usuarios.map((usuario, index) => (
                        <Box >

                            <>
                                <VStack alignItems='flex-start' >
                                    <Image src={`http://localhost:3344/retornaImgPerfil/${usuario.usu_img}`} fallbackSrc={imgAvatar} mr={20} boxShadow='lg' borderRadius='lg' boxSize='150px' />
                                    <Text color='#338bb0' fontSize='25px' >Nome: {usuario.usu_nome} </Text>
                                    <Text color='#338bb0' fontSize='25px' >Email: {usuario.usu_email} </Text>
                                </VStack>
                            </>

                        </Box>
                    ))}

                    <Text display={{base: 'none', md: 'flex'}} fontSize={{base: '25px', md: '35px'}}>Altere sua foto de perfil</Text>
 
                    <Button ml={{base: '0', md: '24'}} w={{base: '30vw', md: '10vw'}} boxShadow='lg' bgColor='#338bb0' color='white' onClick={openImageUploadModal}>Alterar foto</Button>
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
                            <Button bgColor='#338bb0' color='white' boxShadow='lg' _hover={{background: 'white', color: '#338bb0'}} mr={3} onClick={uploadImage}>
                                Enviar Imagem
                            </Button>
                            <Button variant="ghost" onClick={closeImageUploadModal}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

            <Box boxShadow='lg' pb={10}  borderRadius='12px'>
                <VStack w='full' justify='center' h='75vh' mt={26}  p={7} borderRadius='2xl' boxShadow='lg'>
                    <Text fontSize={{base: '25px', md: '35px'}}>Altere seus dados aqui</Text>
                    {usuarios.map((usuario, index) => (
                        <Box key={index}>
                           

                                {alterando ? (
                                    <Box boxShadow='lg' p={6} borderRadius='20px'>
                                        <VStack alignItems='flex-start'>
                                            <Text>Nome de usuário:</Text>

                                            <Input value={nomeUsu} onChange={(e) => {
                                                setNomeUsu(e.target.value)
                                            }} />


                                        </VStack>


                                        <VStack alignItems='flex-start'>
                                            <Text>Email</Text>
                                            <Input value={emailUsu} onChange={(e) => {
                                                setEmailUsu(e.target.value)
                                            }} />
                                        </VStack>

                                        {/* <VStack alignItems='flex-start'>
                                            <Text>Senha</Text>
                                            <Input value={senhaUsu} onChange={(e) => {
                                                setSenhaUsu(e.target.value);
                                            }} />
                                        </VStack> */}
                                    </Box>
                                ) : (
                                    <Box boxShadow='lg' p={6} borderRadius='20px'>
                                    <VStack alignItems='flex-start'>
                                        <HStack>
                                            <Text>Nome de usuário: </Text>
                                            <Text><b>{usuario.usu_nome}</b></Text>
                                        </HStack>
                                     

                                    </VStack>

                                    <VStack alignItems='flex-start'>
                                        <HStack>
                                            <Text>Email: </Text>
                                            <Text><b>{usuario.usu_email}</b></Text>
                                        </HStack>
                                    
                                    </VStack>

                                    {/* <VStack alignItems='flex-start'>
                                        <HStack>
                                        <Text>Senha: </Text>
                                        <Box display="flex" alignItems="center" >
                                        <Text><b>{mostrarSenha ? usuario.usu_senha : "••••••••"}</b></Text>
                                        {!mostrarSenha && ( 
                                            <IconButton
                                            icon={mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                            onClick={() => {setMostrarSenha(true)}}
                                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                            variant="ghost"
                                            ml={2}
                                            />
                                        )}
                                       {mostrarSenha && (
                                         <IconButton
                                         icon={mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                         onClick={() => {setMostrarSenha(false)}}
                                         aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                         variant="ghost"
                                         ml={2}
                                         />
                                       )}
                                    </Box>
                                    </HStack>
                                    </VStack> */}
                                </Box>
                    )}



                        </Box>
                    ))}

                    {alterando ? (
                        <>
              
              <Flex justifyContent="flex-start">
              <Button mt={14} mr={4}  bgColor="red" color="white"  onClick={() => { setAlterando(false) }}
            >
    Cancelar
  </Button>
  <Button mt={14} bgColor="#338bb0" color="white" onClick={updateUsuarios}>
    Salvar suas informações
  </Button>

</Flex>
                        </>
                    ) : (
                        <Button mt={14} w='60%' bgColor='#338bb0' color='white' onClick={() => { setAlterando(true) }}> Alterar seus dados </Button>
                    )}
                </VStack>
            </Box>
        </ChakraProvider>
    )
}


export default MeuPerfil;