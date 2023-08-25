import {Card, CardBody, Stack, Heading, Divider, CardFooter, Button, Image, Text, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, AlertDialog,
AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast, Box, Input, Textarea, InputGroup, InputLeftElement, FormLabel, Center, Flex } from "@chakra-ui/react";

import { Reportar } from "./reportar";
import img2 from '../img/aguaEstancada.png';
import {useEffect, useState} from 'react';

//icons
import { TbReportSearch } from 'react-icons/tb'
import { MdOutlineReportProblem} from 'react-icons/md'
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {BsCardText} from 'react-icons/bs';

//react
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";



const CardDen = ({nome, descricao, bairro}) => {
    const [rep , setrep] = useState(false)


return(

        <Card  maxW='sm' w='250px' maxH='lg' h='29em' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>
             
            <Image src={img2}borderRadius='lg' w='20em' />
            
                    <Stack mt='6' spacing='3'>  
                    
                        <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>{nome}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            {descricao}
                            </Text>
                    </Stack>
                    
            </CardBody>
        <Divider/>
            <CardFooter>
                <Button
                w='168px'
                leftIcon={<TbReportSearch size='3vh'/>}
                 bgColor='#338BB0'
                color='white'
                _hover={{background: '#fff', color:'#338BB0'}}>
                <Link to='/VerDenuncia'>Ver denúncia</Link>
        
        </Button>
        <Button color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
            <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
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
    const [tituloEditado, setTituloEditado] = useState(nome);
    const [descricaoEditada, setDescricaoEditada] = useState(descricao);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const cancelRef = React.useRef();
    const toast = useToast();

    

    async function deleteDenuncia(denCod) {
     await axios.delete(`http://localhost:3344/deleteDenuncia/${denCod}`)
     .then(response => {
        closeAlertDialog();

        if(response){
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

    async function updateDenuncia(denCod){
       await axios.put(`http://localhost:3344/updateDenuncia/${denCod}`, {
        den_nome: tituloEditado,
        den_desc: descricaoEditada
        })
        .then(response => {
            if(response.status === 201){
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
            if(error){
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

return(
    

        <Card  maxW='sm' w='250px' maxH='lg' h='29em' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>

             
                    <Image src={img2} borderRadius='lg' w='20em' />
            
                    <Stack mt='6' spacing='3'>  
                    
                        <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>{nome}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            {descricao}
                            </Text>
                    </Stack>
             
            </CardBody>
        <Divider/>

              <CardFooter>
                 <Button
                w='auto'
                leftIcon={<TbReportSearch size='3vh'/>}
                 bgColor='#338BB0'
                color='white'
                _hover={{background: '#fff', color:'#338BB0'}}
                textAlign='center'
                onClick={onOpen}>
                Gerenciar denúncia
                </Button>
            </CardFooter>

                <Modal  size={editando ? '6xl' : '3xl'} isOpen={isOpen} onClose={onClose}> 
                 <ModalOverlay/>
                 <ModalContent >
                    <ModalHeader textAlign='center'>
                        <Text fontFamily='BreeSerif-Regular' color='#338BB0' fontWeight='normal' fontSize='35px'>Gerenciar denúncia</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction={editando ? 'column' : 'row'} justify={editando ? 'space-between' : 'center'} align={editando ? 'flex-start' : 'normal'} >
                           {!editando && (
                             <Center>
                             <CardDenUsu nome={nome} descricao={descricao} data={data} denCod={undefined} imagem={imagem} bairro={bairro} />
                         </Center>
                           )}

                        </Flex>
                        {editando ? (
                            <Flex justify='space-between' w='100%'>
                                <Flex flexDirection='column' w='45%' p={10} ml='30px'>
                                    <CardDenUsu nome={nome} descricao={descricao} data={data} denCod={undefined} imagem={imagem} bairro={bairro} />
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
                                        <HiOutlineClipboardDocumentList size='25px'/>
                                    </InputLeftElement>
                                        <Input 
                                        border='1px solid black' 
                                        _hover={{border: '1px solid #A9A9A9	'}} 
                                        type='text' 
                                        value={tituloEditado}
                                        onChange={(e) => setTituloEditado(e.target.value)}></Input>
                                    </InputGroup> 

                                    {/* DESCRIÇÃO */}
                                    <FormLabel>Descrição</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement>
                                        <BsCardText size='25px'/>
                                    </InputLeftElement>
                                    <Textarea 
                                    border='1px solid black' 
                                    resize='vertical' 
                                    maxLength={220}  
                                    pl='2.5rem' 
                                    _hover={{border: '1px solid #A9A9A9	'}}
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
                             <Button bgColor='#E75760' mr={3} color='white' onClick={openAlertDialog}  _hover={{backgroundColor: '#D71D28'}}>Apagar</Button>
                            <Button colorScheme="blue" mr={3} onClick={() => setEditando(true)}>Editar</Button>
                            </>
                        )}
                        
                        <AlertDialog isOpen={isAlertDialogOpen} leastDestructiveRef={cancelRef} onClose={closeAlertDialog}>
                            <AlertDialogOverlay>
                                <AlertDialogContent fontSize='lg' fontWeight='bold'>
                                    <AlertDialogHeader>
                                        <Text color='#338BB0'  fontFamily='BreeSerif-Regular' fontWeight='normal'>Apagar denúncia</Text>
                                    </AlertDialogHeader>        

                                    <AlertDialogBody>
                                        <Text fontWeight='normal'>Tem certeza? Você não poderá desfazer essa ação.</Text>
                                    </AlertDialogBody>   

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={closeAlertDialog}>
                                            Cancelar
                                        </Button>
                                        <Button  bgColor='#E75760' color='white' _hover={{backgroundColor: '#D71D28'}} onClick={() => {
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
                </Modal>
       
            

     
          
    </Card>

   

);

}

