import { Card, CardHeader, Heading, CardBody, Divider, CardFooter, Image, Text, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center } from "@chakra-ui/react";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineReportProblem } from "react-icons/md";
import CardCom from "./CardCom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Reportar } from "./reportar";

//imgs
import aguaParada from "../img/aguaParada.jpg";

//react
import {useState} from 'react';




const CardGrande = ({denuncia}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [comments, setComments] = useState([]);

    const [rep, setrep] = useState();

    
  const handleCommentSubmit = (comment) => {setComments(
    [
      ...comments, comment
    ]
  )}

    return(
        <Center>
        <Card m='20px' mb='250px' fontFamily='BreeSerif-Regular' bgColor='white' mt='10px' boxShadow='lg' h={{base: '550px', md: 'auto', lg:'450px'}} w={{base: '220px', md: '380px', lg: '800px'}} border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> 
        {/* Card componente do chakra que cria um card  */}
          <CardHeader> {/* header do card, usado pra por titulo  */}
              <Heading w={{base: '220px', md: '380px', lg: '100%'}} 
              borderRadius='7px' 
              textAlign='center' 
              bgColor='#338BB0' 
              color='white' 
              fontFamily='BreeSerif-Regular' 
              fontWeight='normal'>{denuncia.den_nome}</Heading>
          </CardHeader>
              <CardBody> {/* corpo do card */}
                  <Box>
                    <Image src={aguaParada}  w='100%' h='250px'  boxShadow='lg'></Image>
                  </Box>
                    
            
              </CardBody>
                  
              <Divider/> {/* divisor, geralmente é uma linha */}
              
                <CardFooter w={{base: '640px', md: '3000px', lg: '700px'}} h={{base: '200px', md: '90px', lg: '80px'}}> {/* rodapé do card  */}
                   
                    <Button variant='ghost' ml='700px' w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                        <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                    </Button>
                </CardFooter>
                
                <Box p='70px' mt='-40px' ml='-70'>
                    <Text  fontFamily='BreeSerif-Regular' fontWeight='bold' fontSize={{base: '12px', md: '14px', lg: '18px'}}>@{denuncia.denunciante_usuario_usu_cod}</Text>
                    <Text mt='10px' fontSize={{base: '12px', md: '14px', lg: '16px'}}>{denuncia.den_desc}</Text>
                    </Box>
                
        </Card>
        </Center>
    )
}

export default CardGrande;