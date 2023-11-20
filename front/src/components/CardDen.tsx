import {
    Card, CardBody, CardHeader, Stack, Heading, Divider, CardFooter, Button, Image, Text, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, AlertDialog,
    AlertDialogOverlay, Tag, TagLabel, Avatar, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast, Box, Input, Textarea, InputGroup, InputLeftElement, FormLabel, Center, Flex, useDisclosure, useColorMode, Select, HStack, Badge
} from "@chakra-ui/react";

import { Reportar } from "./Reportar";
import img2 from '../img/aguaEstancada.png';


//icons
import { TbReportSearch } from 'react-icons/tb'
import { BsChatSquareText } from 'react-icons/bs'
import { MdOutlineReportProblem } from 'react-icons/md'
import { BsCardText } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

//react
import { useEffect, useState } from 'react';
import React from "react";
import axios from "axios";

//Exibir Comentários
import CardCom from "./CardCom";

//imgs
import semImgDen from '../img/semImgDen.png';
import jwtDecode from "jwt-decode";


const CardDen = ({ nome, descricao, bairro, imagem, usuNome, usuImg, denCod }) => {

    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isModalRepOpen, setIsModalRepOpen] = useState();
    const [repMotivo, setRepMotivo] = useState('');
    const [repStatus, setRepStatus] = useState("pendente");
    const [comCont, setComCont] = useState();
    

    const toast = useToast();


    const postReportar = () => {

        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        const decodificaToken: any = jwtDecode(token);

        if (!token) {
            toast({
                title: 'Erro ao reportar a denúncia. você está deslogado',
                duration: 2000,
                status: 'error',
                isClosable: true
            })

            return;
        }

        axios.post("http://localhost:3344/postReportar", {
            rep_motivo: repMotivo,
            rep_data: new Date().toISOString(),
            rep_status: repStatus,
            denuncias_den_cod: denCod,
            usuario_usu_cod: decodificaToken.usu_cod
        })
        .then((response) => {
            toast({
                title: 'Denúncia reportada com sucesso.',
                duration: 2000,
                status: 'success',
                isClosable: true
            })
        })
        .catch((error) => {
            toast({
                title: 'Erro ao reportar a denúncia',
                duration: 2000,
                status: 'error',
                isClosable: true
            })
        })
    }

    const openModal = () => {
        setIsModalRepOpen(true);
      };
    
      const closeModal = () => {
        setIsModalRepOpen(false);
      };

 
    const caracteresMaxDescricao = 24;
    const caracteresMaxTitulo = 20;

    const cortaTextoDescricao = (text) => {
        if (text.length > caracteresMaxDescricao) {
            return text.slice(0, caracteresMaxDescricao) + '...';
        }
        return text;
    }

    const cortaTextoTitulo = (text) => {
        if (text.length > caracteresMaxTitulo) {
            return text.slice(0, caracteresMaxTitulo) + '...';
        }
        return text;
    }


 

  const enviaCom = async () => {
    if (!comCont.trim()) {
      toast({
        title: 'Error',
        description: "O campo não pode estar vazio",
        status: 'error',
        duration: 4000,
        isClosable: true
      });
      return;
    }

    const token = localStorage.getItem('token');
    if(!token){
      toast({
        title: 'Usuário não autenticado',
        description: 'Logue para realizar comentários.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      return;
    }

    const decodificaToken: any = await jwtDecode(token);

 
    await axios.post(`http://localhost:3344/criarComent`, {
        com_conteudo: comCont,
        com_data: new Date(),
        usuario_usu_cod: decodificaToken.usu_cod,
        denuncias_den_cod: denCod
      }).then((response) => {
        console.log('Comentário enviado');
        console.log(response.data);

        toast({
            title: 'Comentário enviado.',
            status: 'success',
            duration: 3000,
            isClosable: true
          });
      })
      .catch((error) => {
        console.log(error);
        toast({
            title: 'Erro ao enviar comentário.',
            status: 'error',
            duration: 3000,
            isClosable: true
          });
      }) 


      
  };



    return (

        <Card w={{base: '60vw', md: '17vw'}}  bgColor={colorMode === 'light' ? 'gray.100' : '#2D3748'} align={{base: 'center', md: 'normal'}} border='1px solid #A9A9A9' boxShadow='lg' _hover={{ boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s' }}>
            <CardBody>

                {imagem ? (
                    <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                ) : (
                    <Image src={semImgDen} align='center'></Image>
                )}

                <Stack mt='6' spacing='3'>
                    <Tag size='sm' colorScheme='blue' borderRadius='full' >
                    {usuImg ? (
                        <Avatar src={`http://localhost:3344/retornaImgPerfil/${usuImg}`} size='xs' name={usuNome} ml={-1} mr={2}> </Avatar>
                    ) : (
                       
                       <Avatar
                            size='xs'
                            name={usuNome}
                            ml={-1}
                            mr={2}
                        />
                    )}
                        
                        <TagLabel>{usuNome}</TagLabel>
                    </Tag>
                    <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                    <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                    <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                        {cortaTextoDescricao(descricao)}
                    </Text>

                </Stack>

            </CardBody>
            <Divider />
            <CardFooter>


                <Button
    
                    leftIcon={<BsChatSquareText />}
                    bgColor='#338BB0'
                    color='white'
                    fontWeight='normal'
                    w={{ base: '5px', md: '5px', lg: '150px' }}
                    fontSize={{ base: '11px', md: '12px', lg: '16px' }}
                    onClick={onOpen}
                    _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}}
                >
                    Comentários
                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Text fontFamily='BreeSerif-Regular' fontSize='25px' color='#338bb0' fontWeight='normal'>
                                    Comentários
                                </Text>
                            </ModalHeader>
                            <ModalCloseButton />
                            <CardHeader>
                                <Input placeholder="comenta aq" onChange={(e) => setComCont(e.target.value)} ></Input>
                            </CardHeader>
                            <CardBody>
                                <CardCom denCod={denCod}/>
                            </CardBody>

                            <ModalFooter>

                                <Button onClick={enviaCom}>Enviar comentario</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Button>

                <Button variant='ghost' color='red' _hover={{ color: '#8B0000' }} leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={openModal}>
                    
                </Button>

                    <Modal isOpen={isModalRepOpen} onClose={closeModal} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Text fontFamily='BreeSerif-Regular' fontSize='25px' color='#338bb0' fontWeight='normal'>
                                    Reportar denúncia
                                </Text>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                           
                            <Text fontFamily='BreeSerif-Regular' fontSize='18px'  fontWeight='normal' >Por que deseja reportar esta denúncia?</Text>

                            <Select value={repMotivo} onChange={(e) => setRepMotivo(e.target.value)}>
                                <option value="Descrição falsa">Descrição falsa</option>
                                    <option value="Descrição ofensiva">Descrição ofensiva</option>
                                    <option value="Imagem inadequada">Imagem imprópria</option> 
                                    <option value="Informação irrelevante">Informação irrelevante </option>
                                <option value="Spam: Denúncia repetida">Denuncia repetida</option>
                            </Select>
                            </ModalBody>

                            <ModalFooter>

                        <Button boxShadow='lg' color='white' bgColor='#338bb0' _hover={{color: '#338bb0', backgroundColor: 'white'}} onClick={postReportar}>Reportar</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

            </CardFooter>
        </Card>



    );

}

export default CardDen;

export const CardDenUsu = ({ nome, descricao, data, bairro, imagem, denCod }) => {

    const dataFormatada = new Date(data).toLocaleDateString("pt-BR");





    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editando, setEditando] = useState(false);
    const [img, setImg] = useState<any>('');
    const [tituloEditado, setTituloEditado] = useState(nome);
    const [descricaoEditada, setDescricaoEditada] = useState(descricao);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageUploadModalOpen, setImageUploadModalOpen] = useState(false);
    const [imagemUrl, setImagemUrl] = useState('');
    const cancelRef = React.useRef();
    const toast = useToast();
    const { colorMode } = useColorMode();


    async function deleteDenuncia(denCod) {

        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }


        await axios.delete(`http://localhost:3344/deleteDenuncia/${denCod}`)
            .then(response => {
                closeAlertDialog();

                if (response) {
                    toast({
                        title: 'Denúncia deletada',
                        status: 'success',
                        duration: 4000,
                        isClosable: true
                    })
                }
            })
            .catch(error => {
                console.error(error);
            })


    };

    async function updateDenuncia(denCod) {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        await axios.put(`http://localhost:3344/updateDenuncia/${denCod}`, {
            den_nome: tituloEditado,
            den_desc: descricaoEditada
        })
            .then(response => {
                if (response.status === 201) {
                    toast({
                        title: 'Dados da denúncia atualizados',
                        status: 'success',
                        duration: 4000,
                        isClosable: true
                    });
                }
                setEditando(false);
                onClose();
            })
            .catch(error => {
                console.error(error);
                if (error) {
                    toast({
                        title: 'Ocorreu um erro ao atualizar os dados da denúncia. Tente novamente',
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    });
                }
            })

    }



    const openAlertDialog = () => {
        setIsAlertDialogOpen(true);
    };

    const closeAlertDialog = () => {
        setIsAlertDialogOpen(false);
    };


    const openImageUploadModal = () => {
        setImageUploadModalOpen(true);
    }

    const closeImageUploadModal = () => {
        setImageUploadModalOpen(false);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
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

    const caracteresMaxDescricao = 24;
    const caracteresMaxTitulo = 20;

    const cortaTextoDescricao = (text) => {
        if (text.length > caracteresMaxDescricao) {
            return text.slice(0, caracteresMaxDescricao) + '...';
        }
        return text;
    }

    const cortaTextoTitulo = (text) => {
        if (text.length > caracteresMaxTitulo) {
            return text.slice(0, caracteresMaxTitulo) + '...';
        }
        return text;
    }


    return (




        <Card maxW='sm' w={{ base: '280px', md: '265px', lg: '250px' }} maxH='lg' h={{ base: '23em', md: '29em' }} onClick={onOpen} bgColor={colorMode === 'light' ? 'gray.100' : '#2D3748'} align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{ boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s' }}>
            <CardBody>

                {imagem ? (
                    <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                ) : (
                    <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                )}




                <Stack mt='6' spacing='3'>
                    <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                    <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                    <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                    <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs', lg: 'md' }} fontWeight='thin'>
                        {cortaTextoDescricao(descricao)}
                    </Text>
                </Stack>

            </CardBody>
            <Divider />

            <CardFooter     display={{base: 'none', md: 'flex'}}>
                <Button
                    w={{ base: '100%', md: '180px', lg: 'auto' }}
                    mb={{ base: '1rem', md: '0', lg: '0' }}
                    leftIcon={<TbReportSearch size='3vh' />}
                    bgColor={colorMode === 'light' ? '#338BB0' : 'blue.800'}
                    color='white'
                    _hover=
                    {colorMode === 'light' ? { background: '#fff', color: '#338BB0' }
                        : { background: 'gray.500', color: 'white' }}
                    textAlign='center'
                    onClick={onOpen}
                
                >
                    Gerenciar denúncia
                </Button>
            </CardFooter>


            <Modal size={editando ? '6xl' : '3xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader textAlign='center'>
                        <Text fontFamily='BreeSerif-Regular' color='#338BB0' fontWeight='normal' fontSize='35px'>Gerenciar denúncia</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={editando ? 'column' : 'row'} justify={editando ? 'space-between' : 'center'} align={editando ? 'flex-start' : 'normal'} >
                            {!editando && (
                                <Center>
                                    <Card boxShadow='lg' bgColor={colorMode === 'light' ? 'gray.100' : '#2D3748'}>
                                        <CardBody>
                                            {imagem ? (
                                                <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                                            ) : (
                                                <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                                            )}
                                            <Stack mt='6' spacing='3'>
                                                <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                                                <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                                                <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                                                <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs', lg: 'md' }} fontWeight='thin'>
                                                    {cortaTextoDescricao(descricao)}
                                                </Text>
                                            </Stack>
                                        </CardBody>

                                    </Card>
                                </Center>
                            )}

                        </Flex>
                        {editando ? (
                            <Flex justify='space-between' w='100%'>
                                <Flex flexDirection='column' p={10} ml='30px'>
                                    <Card boxShadow='lg' bgColor={colorMode === 'light' ? 'gray.100' : '#2D3748'} >
                                        <CardBody>
                                            {imagem ? (
                                                <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                                            ) : (
                                                <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                                            )}
                                            <Stack mt='6' spacing='3'>
                                                <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                                                <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                                                <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                                                <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs', lg: 'md' }} fontWeight='thin'>
                                                    {cortaTextoDescricao(descricao)}
                                                </Text>
                                            </Stack>
                                        </CardBody>

                                    </Card>
                                </Flex>
                                <Flex flexDirection='column' w='45%' p={10}>
                                    <Text fontSize='20px'>Altere aqui o título e a descrição de sua denúncia. Por motivos de
                                        segurança, não é possível alterar a imagem.
                                    </Text>

                                    <Box mt='30px'>

                                        {/* TITULO */}
                                        <FormLabel>Título da denúncia:</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <HiOutlineClipboardDocumentList size='25px' />
                                            </InputLeftElement>
                                            <Input
                                                border='1px solid black'
                                                _hover={{ border: '1px solid #A9A9A9	' }}
                                                type='text'
                                                value={tituloEditado}
                                                onChange={(e) => setTituloEditado(e.target.value)}></Input>
                                        </InputGroup>

                                        {/* DESCRIÇÃO */}
                                        <FormLabel>Descrição</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <BsCardText size='25px' />
                                            </InputLeftElement>
                                            <Textarea
                                                border='1px solid black'
                                                resize='vertical'
                                                maxLength={220}
                                                pl='2.5rem'
                                                _hover={{ border: '1px solid #A9A9A9	' }}
                                                value={descricaoEditada}
                                                onChange={(e) => setDescricaoEditada(e.target.value)}>
                                            </Textarea>
                                        </InputGroup>

                                    </Box>
                                </Flex>
                            </Flex>
                        ) : (
                            <Box></Box> //
                        )}

                    </ModalBody>
                    <ModalFooter>


                        {editando ? (
                            <>
                                <Button boxShadow='lg' mr={3} bgColor='#338bb0' color='white' _hover={{ background: '#fff', color: '#338BB0' }} onClick={() => setEditando(false)}>Cancelar</Button>
                                <Button boxShadow='lg' colorScheme="green" mr={3} onClick={() => updateDenuncia(denCod)}>Salvar alterações</Button>
                            </>
                        ) : (
                            <>
                                <Button boxShadow='lg' bgColor='#E75760' mr={3} color='white' onClick={openAlertDialog} _hover={{ backgroundColor: '#D71D28' }}>Apagar</Button>
                                <Button boxShadow='lg' bgColor='#338bb0' _hover={{ background: '#fff', color: '#338BB0' }} mr={3} color='white' onClick={openImageUploadModal}>Adicionar imagem</Button>
                                <Button boxShadow='lg' bgColor='#338bb0' color='white' _hover={{ background: '#fff', color: '#338BB0' }} mr={3} onClick={() => setEditando(true)}>Editar</Button>

                            </>
                        )}

                        <AlertDialog isOpen={isAlertDialogOpen} leastDestructiveRef={cancelRef} onClose={closeAlertDialog}>
                            <AlertDialogOverlay>
                                <AlertDialogContent fontSize='lg' fontWeight='bold'>
                                    <AlertDialogHeader>
                                        <Text color='#338BB0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Apagar denúncia</Text>
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <Text fontWeight='normal'>Tem certeza? Você não poderá desfazer essa ação.</Text>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button boxShadow='lg' ref={cancelRef} onClick={closeAlertDialog}>
                                            Cancelar
                                        </Button>
                                        <Button boxShadow='lg' bgColor='#E75760' color='white' _hover={{ backgroundColor: '#D71D28' }} onClick={() => {
                                            deleteDenuncia(denCod);
                                            closeAlertDialog();
                                        }} ml={3}>
                                            Apagar
                                        </Button>

                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

                    </ModalFooter>
                </ModalContent>
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
                            <Button boxShadow='lg' bgColor='#338bb0' _hover={{ background: '#fff', color: '#338BB0' }} mr={3} color='white' onClick={uploadImage}>
                                Enviar Imagem
                            </Button>
                            <Button boxShadow='lg' variant="ghost" onClick={closeImageUploadModal}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Modal>





        </Card>



    );

}

export const CardDenSimples = ({ nome, descricao, bairro, imagem, denCod }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [estadoAcompanhamento, setEstadoAcompanhamento] = useState('');

    const cancelRef = React.useRef();
    const toast = useToast();
    const { colorMode } = useColorMode();


    

    const getAcompanhamentoEstado = async () => {
        
        await axios.get(`http://localhost:3344/getEstadoAcompanhamento/${denCod}`)
        .then((response) => {
            setEstadoAcompanhamento(response.data.estado || "");
        })
        .catch((error) => {
            console.error(error);
        })
    };

    useEffect(() => {
        getAcompanhamentoEstado();
    }, [denCod])

    const caracteresMaxDescricao = 24;
    const caracteresMaxTitulo = 20;

    const cortaTextoDescricao = (text) => {
        if (text.length > caracteresMaxDescricao) {
            return text.slice(0, caracteresMaxDescricao) + '...';
        }
        return text;
    }

    const cortaTextoTitulo = (text) => {
        if (text.length > caracteresMaxTitulo) {
            return text.slice(0, caracteresMaxTitulo) + '...';
        }
        return text;
    }


    return (




        <Card maxW='sm' w={{ base: '', md: '17vw' }} maxH='lg' h={{ base: '23em', md: '26em' }} onClick={onOpen} bgColor={colorMode === 'light' ? 'gray.100' : '#2D3748'} align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{ boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s' }}>
            <CardBody>

                {imagem ? (
                    <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                ) : (
                    <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                )}




                <Stack mt='6' spacing='3'>
                    <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                    <HStack>
                        <Heading size='xs' textTransform='uppercase' color='gray'>status: {estadoAcompanhamento ? estadoAcompanhamento : 'Não assumida'}</Heading>
                        {estadoAcompanhamento === 'concluida' && (
                    <Badge
                        bg="green.500"
                        borderRadius="full"
                        w="10px"
                        h="10px"
                        ml={3}
                    />
                )}
                {estadoAcompanhamento === 'em andamento' && (
                    <Badge
                        bg="blue.500"
                        borderRadius="full"
                        w="10px"
                        h="10px"
                        ml={3}
                    />
                )}
                {(estadoAcompanhamento === 'pendente' || !estadoAcompanhamento) && (
                    <Badge
                        bg="red.500"
                        borderRadius="full"
                        w="10px"
                        h="10px"
                        ml={3}
                    />
                )}
                    </HStack>
                   
                </Stack>

            </CardBody>
            <CardFooter alignItems='flex-start'>

                <Button boxShadow='lg' bgColor='#338bb0' onClick={onOpen} _hover={{ background: '#fff', color: '#338BB0' }} mr={3} color='white'> 
                    Mais detalhes
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader color='#338bb0'>Acompanhar denúncia</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                            <HStack>
                                <Avatar w='80px' h='80px'/>
                                <Text>Vai termt texto aq da instutica</Text>
                            </HStack>
                            <Text mt={6}>Nome instituiçao</Text>
                            </Box>
                            <Box>
                                <HStack w='100vw' mt={10}>
                                    <Box w='50vw'>
                                        <Text>SUBTAREFAS a fazer</Text>
                                    </Box>
                                    <Box w='50vw'>
                                        <Text>SUBTAREFAS concluídas</Text>
                                    </Box>
                                </HStack>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
          
            </CardFooter>
            <Divider />







        </Card>



    );

}