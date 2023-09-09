import {
    Card, CardBody, Stack, Heading, Divider, CardFooter, Button, Image, Text, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, AlertDialog,
    AlertDialogOverlay, Tag, TagLabel, Avatar, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast, Box, Input, Textarea, InputGroup, InputLeftElement, FormLabel, Center, Flex, useDisclosure
} from "@chakra-ui/react";

import { Reportar } from "./reportar";
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

//Componentes comentários
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

//imgs
import semImgDen from '../img/semImgDen.png';


const CardDen = ({ nome, descricao, bairro, imagem }) => {
    const [rep, setrep] = useState(false)

   
    const { isOpen, onOpen, onClose } = useDisclosure()
     //Manipular Comentários
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (comment) => {
        setComments(
            [
                ...comments, comment
            ]
        )
    }

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

        <Card maxW='sm' w={{base: '280px', md: '265px', lg: '250px'}} maxH='lg' h={{base: '20em', md: '23em', lg: '29em'}} bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{ boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s' }}>
            <CardBody>
         
            {imagem ? (
                    <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px'  />
                ) : (
                    <Image src={semImgDen} boxSize={{base: '90px', md: '140px', lg: '200px'}} align='center'></Image>
                )}

                <Stack mt='6' spacing='3'>
                    <Tag size='sm' colorScheme='blue' borderRadius='full' >
                        <Avatar
                            src='https://bit.ly/sage-adebayo'
                            size='xs'
                            name='Segun Adebayo'
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel>@usuario</TagLabel>
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
                    _hover={{ background: '#fff', color: '#338BB0' }}
                    fontWeight='normal'
                    w={{ base: '5px', md: '5px', lg: '150px' }}
                    fontSize={{ base: '11px', md: '12px', lg: '16px' }}
                    onClick={onOpen}
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
                            <ModalBody>
                                <CommentList comments={comments} />
                                <CommentForm onCommentSubmit={handleCommentSubmit} />

                            </ModalBody>

                            <ModalFooter>


                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Button>

                <Button color='red' _hover={{ color: '#8B0000' }} leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={() => { setrep(true) }}>
                    <Reportar taAberto={rep} tafechado={() => { setrep(!rep) }} />
                </Button>

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


    async function deleteDenuncia(denCod) {
        await axios.delete(`http://localhost:3344/deleteDenuncia/${denCod}`)
            .then(response => {
                closeAlertDialog();

                if (response) {
                    toast({
                        title: 'Denúncia deletada',
                        description: "Sua denúncia foi deletada com sucesso. Recarregue para ver as alterações",
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




        <Card maxW='sm' w={{base: '280px', md: '265px', lg: '250px'}} maxH='lg' h={{base: '23em', md: '23em', lg: '29em'}} bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{ boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s' }}>
            <CardBody>

                {imagem ? (
                    <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                ) : (
                    <Image src={semImgDen} boxSize={{base: '90px', md: '140px', lg: '200px'}} align='center'></Image>
                )}




                <Stack mt='6' spacing='3'>
                    <Heading size={{base: 'xs', md: 'xs', lg: 'md'}} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                    <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                    <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                    <Text fontFamily='BreeSerif-Regular' fontSize={{base: 'xs', md: 'xs', lg: 'md'}} fontWeight='thin'>
                        {cortaTextoDescricao(descricao)}
                    </Text>
                </Stack>

            </CardBody>
            <Divider />

            <CardFooter>
                <Button
                    w={{base: '100%', md: '180px', lg: 'auto'}}
                    mb={{ base: '1rem', md: '0', lg: '0' }}
                    leftIcon={<TbReportSearch size='3vh' />}
                    bgColor='#338BB0'
                    color='white'
                    _hover={{ background: '#fff', color: '#338BB0' }}
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
                                    <Card boxShadow='lg' bgColor='gray.100'>
                                        <CardBody>
                                        {imagem ? (
                                            <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                                        ) : (
                                            <Image src={semImgDen} boxSize={{base: '90px', md: '140px', lg: '200px'}} align='center'></Image>
                                        )}
                                    <Stack mt='6' spacing='3'>
                                        <Heading size={{base: 'xs', md: 'xs', lg: 'md'}} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                                        <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                                        <Text fontFamily='BreeSerif-Regular' fontSize={{base: 'xs', md: 'xs', lg: 'md'}} fontWeight='thin'>
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
                                <Flex flexDirection='column'  p={10} ml='30px'>
                                <Card boxShadow='lg' bgColor='gray.100'>
                                        <CardBody>
                                        {imagem ? (
                                            <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                                        ) : (
                                            <Image src={semImgDen} boxSize={{base: '90px', md: '140px', lg: '200px'}} align='center'></Image>
                                        )}
                                    <Stack mt='6' spacing='3'>
                                        <Heading size={{base: 'xs', md: 'xs', lg: 'md'}} fontFamily='BreeSerif-Regular' fontWeight='normal'>{cortaTextoTitulo(nome)}</Heading>
                                        <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                                        <Text fontFamily='BreeSerif-Regular' fontSize={{base: 'xs', md: 'xs', lg: 'md'}} fontWeight='thin'>
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
                                <Button mr={3} colorScheme="blue" onClick={() => setEditando(false)}>Cancelar</Button>
                                <Button colorScheme="green" mr={3} onClick={() => updateDenuncia(denCod)}>Salvar alterações</Button>
                            </>
                        ) : (
                            <>
                                <Button bgColor='#E75760' mr={3} color='white' onClick={openAlertDialog} _hover={{ backgroundColor: '#D71D28' }}>Apagar</Button>
                                <Button colorScheme="blue" mr={3} color='white' onClick={openImageUploadModal}>Adicionar imagem</Button>
                                <Button colorScheme="blue" mr={3} onClick={() => setEditando(true)}>Editar</Button>

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
                                        <Button ref={cancelRef} onClick={closeAlertDialog}>
                                            Cancelar
                                        </Button>
                                        <Button bgColor='#E75760' color='white' _hover={{ backgroundColor: '#D71D28' }} onClick={() => {
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
                            <Button colorScheme="blue" mr={3} onClick={uploadImage}>
                                Enviar Imagem
                            </Button>
                            <Button variant="ghost" onClick={closeImageUploadModal}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Modal>





        </Card>



    );

}

