import { Card, CardHeader, Heading, CardBody, Divider, CardFooter, Image, Text, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, useToast } from "@chakra-ui/react";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineReportProblem } from "react-icons/md";
import CardCom from "./CardCom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Reportar } from "./reportar";

//imgs
import aguaParada from "../img/aguaParada.jpg";

//icones
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'

//react
import {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';




const CardGrande = ({denuncia}) => {

  const [comments, setComments] = useState([]);
  const [denCod, setDenCod] = useState('');
  const [acoProgresso, setAcoProgresso] = useState('');
  const [acoData, setAcoData] = useState('');
  const [usuCod, setUsuCod] = useState('');
  const [usuTipo, setUsuTipo] = useState('');

  const toast = useToast();

  const [rep, setrep] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodificaToken: any = jwt_decode(token);
      setUsuTipo(decodificaToken.usu_tipo); // Defina o estado com o tipo de usuário
      console.log(decodificaToken.usu_tipo);
    }

  }, []);

    const criarAcompanhamento = async () => {

      const token = localStorage.getItem('token');          //pegar o token e decodificar
      if(!token){
        toast({
          title: 'Instituicao não autenticado',
          description: 'Logue para assumir a denúncia.',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
        return;
      }
      const decodificaToken: any = await jwt_decode(token);

    console.log(decodificaToken);
      axios.post('http://localhost:3344/criarAcompanhamento', {
        denuncias_den_cod: denuncia.den_cod,
        aco_data: new Date(),
        aco_progresso: acoProgresso,
        usuario_usu_cod: decodificaToken.usu_cod,
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
        <Card m='20px' mb='250px' fontFamily='BreeSerif-Regular' bgColor='white' mt='10px' boxShadow='lg' h={{base: '470px', md: '490px', lg:'490px'}} w={{base: '535px', md: '653px', lg: '802px'}} border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}>
        {/* Card componente do chakra que cria um card  */}
          <CardHeader> {/* header do card, usado pra por titulo  */}
          <Heading w={{base: '100%', md: '100%', lg: '100%'}}
              borderRadius='7px'
              textAlign='center'
              bgColor='#338BB0'
              color='white'
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>{denuncia.den_nome}</Heading>
          </CardHeader>
          <Text fontSize={{base: '12px', md: '14px', lg: '18px'}} fontFamily='BreeSerif-Regular' ml={{base: '20px', md: '20px', lg:'20px'}}>Bairro: {denuncia.den_bairro}</Text>
              <Text fontSize={{base: '12px', md: '14px', lg: '18px'}} fontFamily='BreeSerif-Regular'  ml={{base: '20px', md: '20px', lg:'20px'}}>Problema: {denuncia.den_problema} </Text>
              <CardBody> {/* corpo do card */}
                  <Box>
                  {denuncia.den_img ? ( // se o usuario tiver adicionado imagem
                    <Image src={`http://localhost:3344/retornaImagem/${denuncia.den_img}`} borderRadius='lg' w='100%' h='250px' />
                ) : (
                    <HiOutlineClipboardDocumentList size='10vh'  color='gray' /> // se n tiver adicionado imagem, é o que será exibido
                )}
                  </Box>


              </CardBody>

              <Divider/> {/* divisor, geralmente é uma linha */}

                <CardFooter w={{base: '640px', md: '3000px', lg: '700px'}} h={{base: '200px', md: '90px', lg: '80px'}}> {/* rodapé do card  */}

                <Button variant='ghost' mt={{base: '-7px', md: '', lg: '-5px'}} ml={{base:'450px', md:'550px', lg:'700px'}} w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                        <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                    </Button>
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }}
                      ml={{base:'-196px', md:'-341px', lg:"-755px"}} mt={{base:'-14px', md:'-5px', lg:'-6px'}} fontSize="15px" onClick={criarAcompanhamento} display={usuTipo === 'instituicao' ? 'block' : 'none'}>Assumir denúncia</Button>
                </CardFooter>
                <Box p='70px' mt={{base: '-60px', md:'-50px', lg:'-40px',}} ml='-70'>
                    <Text  fontFamily='BreeSerif-Regular' fontWeight='bold' fontSize={{base: '12px', md: '14px', lg: '18px'}}>@{denuncia.usu_nome}</Text>
                    <Text mt='10px' fontSize={{base: '12px', md: '14px', lg: '16px'}}>{denuncia.den_desc}</Text>
                    </Box>
                    <Box>
                <Text whiteSpace='nowrap' mt={{base:'-218px', md:'-227px' , lg:'-245px'}} ml={{base: '335px', md: '430px', lg: '495px'}} p='100px' color='#338BB0'   fontSize={{ base:'16px', md:'20px', lg: '35px'}} fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Comentários</Text>
                </Box>
        </Card>
        </Center>
    )
}

export default CardGrande;
