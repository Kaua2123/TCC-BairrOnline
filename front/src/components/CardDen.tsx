import {Card, CardBody, Stack, Heading, Divider, CardFooter, Button, Image, Text, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react";

import { Reportar } from "./reportar";
import img2 from '../img/aguaEstancada.png';
import {useState} from 'react';


import { TbReportSearch } from 'react-icons/tb'
import { MdOutlineReportProblem} from 'react-icons/md'
import { Link } from "react-router-dom";



const CardDen = () => {
    const [rep , setrep] = useState(false)


return(

        <Card  maxW='sm' w='250px' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>
             
                    <Image src={img2} borderRadius='lg' objectFit='cover' width='100%'/>
            
                    <Stack mt='6' spacing='3'>  
                    
                        <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>Muito lixo</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em Santo Agostinho</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            “muito lixo kkkkkk mdsssss so jogar na latinha mano tlgddddd”
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

export const CardDenUsu = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

return(

        <Card  maxW='sm' w='250px' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>
             
                    <Image src={img2} borderRadius='lg' objectFit='cover' width='100%'/>
            
                    <Stack mt='6' spacing='3'>  
                    
                        <Heading size='md' fontFamily='BreeSerif-Regular' fontWeight='normal'>Muito lixo</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em Santo Agostinho</Heading>
                            <Text fontFamily='BreeSerif-Regular' fontWeight='thin'>
                            “muito lixo kkkkkk mdsssss so jogar na latinha mano tlgddddd”
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
                <Modal isOpen={isOpen} onClose={onClose}> 
                 <ModalOverlay/>
                 <ModalContent>
                    <ModalHeader><Text>Gerenciar denúncia</Text></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>aqui onde será gerenciada a denuncia (editar, excluir, blabla) </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose} mr={3}>Fechar</Button>
                        <Button variant='ghost'>Ação secundária</Button>
                    </ModalFooter>
                 </ModalContent>
                </Modal>
       
            
        </CardFooter>
    </Card>

   

);

}

