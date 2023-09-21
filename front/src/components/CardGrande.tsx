import { Card, CardHeader, Heading, CardBody, Divider, CardFooter, Image, Text, Box, Button, Flex, Avatar, Icon, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, useToast, HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
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
import { CiLocationOn } from 'react-icons/ci';


//react
import {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AddIcon } from "@chakra-ui/icons";




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
      
        <Card bgColor='white' border='1px solid #A9A9A9' w={{base: '535px', md: '653px', lg: '802px'}}> {/* border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> */}
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

        <Box>
          <Heading fontSize={{base: '12px', md: '14px', lg: '16px'}}>{denuncia.usu_nome}</Heading>
           
        </Box>
      </Flex>
    
    </Flex>
  </CardHeader>
  <CardBody>
    <Center>
    <Text fontWeight='normal' textAlign='center' borderRadius='7px' bgColor='#338BB0' color='white' w='100%' mt='-20px'  fontSize={{ base: '12px', md: '18px', lg: '25px' }} fontFamily='BreeSerif-Regular'>{denuncia.den_nome}</Text>
    </Center>
    <Flex flexDirection='column' mt='15px' ml='-18px' color='gray'>
    
    <Tag bg='white' color='gray' fontSize={{base: '12px', md: '14px', lg: '16px'}}>
      <TagLeftIcon as={CiLocationOn} />
      <Text>{denuncia.den_bairro}</Text>
    </Tag>
 

    <Text fontSize={{base: '12px', md: '14px', lg: '16px'}} fontFamily='BreeSerif-Regular'  ml={{base: '20px', md: '20px', lg:'20px'}}>Problema: {denuncia.den_problema} </Text>
    </Flex>
    <Text  mt='10px'>
    {denuncia.den_desc}
    </Text>
  </CardBody>
  <Box>
                  {denuncia.den_img ? ( // se o usuario tiver adicionado imagem
                    <Image src={`http://localhost:3344/retornaImagem/${denuncia.den_img}`}  w='100%' h='250px' />
                ) : (
                    <HiOutlineClipboardDocumentList size='10vh'  color='gray' /> // se n tiver adicionado imagem, é o que será exibido
                )}
                  </Box>

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' leftIcon={''}>  
      Curtir
    </Button>
    <Button flex='1' variant='ghost' leftIcon={''}>
      Comentar
    </Button>
     <Button variant='ghost' mt={{base: '-7px', md: '', lg: '-5px'}} ml={{base:'450px', md:'550px', lg:'700px'}} w={{base: '4px', md: '30px', lg: '55px'}}  color='red' _hover={{color: '#8B0000'}}  leftIcon={<MdOutlineReportProblem size='3vh' />} onClick={()=>{setrep(true)}}>
                        <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
                    </Button>
  </CardFooter>
</Card>
        </Center>
    )
}

export default CardGrande;
