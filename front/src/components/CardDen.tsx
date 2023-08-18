import {Card, CardBody, Stack, Heading, Divider, CardFooter, Button, Image, Text, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, AlertDialog,
AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, } from "@chakra-ui/react";

import { Reportar } from "./reportar";
import img2 from '../img/aguaEstancada.png';
import {useEffect, useState} from 'react';

//icons
import { TbReportSearch } from 'react-icons/tb'
import { MdOutlineReportProblem} from 'react-icons/md'

//react
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

//componente
import CardDenH from "./CardDenH";

//sla
import {format} from ''

const CardDen = ({nome, descricao}) => {
    const [rep , setrep] = useState(false)


return(

        <Card  maxW='sm' w='250px' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>
             
                    <Image src={img2} borderRadius='lg' objectFit='cover' width='100%'/>
            
                    <Stack mt='6' spacing='3'>  
                    
                        <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>{nome}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em Santo Agostinho</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            {descricao}
                            </Text>
                    </Stack>
                    {/* esses cards tao com conteúdo só de exemplo, mas na real eles tem q ser vazios, pois é 
                    o usuario que define o titulo, texto, imagem da denuncia */}
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

export const CardDenUsu = ({ nome, descricao, data }) => {

    const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
    

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editando, setEditando] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const cancelRef = React.useRef();

    
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
                        <Heading size='xs' textTransform='uppercase' color='gray'>em Santo Agostinho</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            {descricao}
                            </Text>
                    </Stack>
                    {/* esses cards tao com conteúdo só de exemplo, mas na real eles tem q ser vazios, pois é 
                    o usuario que define o titulo, texto, imagem da denuncia */}
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
                <Modal  size='6xl' isOpen={isOpen} onClose={onClose}> 
                 <ModalOverlay/>
                 <ModalContent >
                    <ModalHeader textAlign='center'>
                        <Text fontFamily='BreeSerif-Regular' color='#338BB0' fontWeight='normal' fontSize='35px'>Gerenciar denúncia</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <CardDenUsu nome={nome} descricao={descricao} data={data} />
                    </ModalBody>
                    <ModalFooter>
        
                        <Button bgColor='#E75760' mr={3} color='white' onClick={openAlertDialog}  _hover={{backgroundColor: '#D71D28'}}>Apagar</Button>
                        
                        {editando ? (
                            <Button colorScheme="green" mr={3} onClick={() => setEditando(false)}>Salvar alterações</Button>
                        ) : (
                            <Button colorScheme="blue" mr={3} onClick={() => setEditando(true)}>Editar</Button>
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
                                        <Button  bgColor='#E75760' color='white' _hover={{backgroundColor: '#D71D28'}} onClick={closeAlertDialog} ml={3}>
                                            Apagar
                                        </Button>
                                        
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                     
                    </ModalFooter>
                 </ModalContent>
                </Modal>
       
            
        </CardFooter>
    </Card>

   

);

}

