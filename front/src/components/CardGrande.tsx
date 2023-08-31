import { Card, CardHeader, Heading, CardBody, Divider, CardFooter, Image, Text, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, useToast } from "@chakra-ui/react";
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
import axios from 'axios';




const CardGrande = ({denuncia}) => {

    // const {isOpen, onOpen, onClose} = useDisclosure();
    const [comments, setComments] = useState([]);
    const [denCod, setDenCod] = useState('');
    const [acoProgresso, setAcoProgresso] = useState('');
    const [acoData, setAcoData] = useState('');
    const [instCod, setInstCod] = useState('');
    
    const toast = useToast();

    const [rep, setrep] = useState();
    
    const criarAcompanhamento = () => {
      axios.post('http://localhost:3344/criarAcompanhamento', {
        denuncias_den_cod: denCod,
        aco_data: new Date(),
        aco_progresso: acoProgresso,
        instituicao_usuario_usu_cod: instCod
      })
      .then((response) => {
        console.log('Denúncia assumida');
        console.log(response.data);

        if(response){ // se for criada, executa o codigo abaixo, responsavel pelo feedback ao usuario
          toast({
            title: 'Denúncia assumida',
            description: "A denúncia foi assumida com sucesso.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })     
      }
    })
    .catch((error) => {
      if (error){
        toast({
          title: 'Denúncia não pôde ser assumida',
          description: 'houve um erro ao assumir',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
      console.log('denuncia não pôde ser assumida.')
      console.error(error);
    })
    }

    
  const handleCommentSubmit = (comment) => {setComments(
    [
      ...comments, comment
    ]
  )}

    return(
        <Center>
        <Card m='20px' fontFamily='BreeSerif-Regular' bgColor='white' mt='10px' boxShadow='lg' h={{base: '550px', md: 'auto', lg:'450px'}} w={{base: '220px', md: '380px', lg: '800px'}} border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> 
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
                    
                    <Button variant='ghost' ml='600px' w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                        <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                    </Button>
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }}  ml="-650px" fontSize="15px" onClick={criarAcompanhamento}>Assumir denúncia</Button>
                </CardFooter>
                <Box>
                  
                </Box>
        </Card>
        </Center>
    )
}

export default CardGrande;