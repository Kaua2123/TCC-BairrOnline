import { Card, CardHeader, Heading, CardBody, Divider, FormControl, CardFooter, Image, Text, Box, Button, Flex, Avatar, Icon, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, useToast, HStack, Tag, TagLabel, TagLeftIcon, ChakraProvider, FormLabel, Input, VStack } from "@chakra-ui/react";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineReportProblem } from "react-icons/md";
import CardCom from "./CardCom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Reportar } from "./Reportar";

//imgs
import aguaParada from "../img/aguaParada.jpg";

//icones
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import { CiLocationOn } from 'react-icons/ci';
import { SiOpenstreetmap } from 'react-icons/si';
import { BiCommentDetail, BiSolidLike } from 'react-icons/bi';
import { BiSolidCommentDetail } from 'react-icons/bi';
//react
import {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AddIcon } from "@chakra-ui/icons";
import { FaHandshake } from "react-icons/fa";




const CardGrande = ({denuncia}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [comments, setComments] = useState([]);
  const [denCod, setDenCod] = useState('');
  const [acoData, setAcoData] = useState('');
  const [acoEstado, setAcoEstado] = useState('pendente');
  const [acoMensagem, setAcoMensagem] = useState('');
  const [usuCod, setUsuCod] = useState('');
  const [usuTipo, setUsuTipo] = useState('');
  const [notMensagem, setNotMensagem] = useState('');
  const [notTitulo, setNotTitulo] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodificaToken: any = jwt_decode(token);
      setUsuTipo(decodificaToken.usu_tipo); // Defina o estado com o tipo de usuário
      console.log(decodificaToken.usu_tipo);
    }

  }, []);

  const criarAcompanhamento = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    const decodificaToken: any = await jwt_decode(token);

    axios.post('http://localhost:3344/criarAcompanhamento', {
      denuncias_den_cod: denuncia.den_cod,
      aco_data: new Date(),
      aco_estado: acoEstado,
      aco_mensagem: acoMensagem,
      usuario_usu_cod: decodificaToken.usu_cod,
    })
      .then((response) => {
        
        if (response.status === 201) {
          // denuncia assumida, acompanhamento criado
          toast({
            title: 'Denúncia assumida',
            description: 'A denúncia foi assumida com sucesso.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        } 
      })
      .catch((error) => {

        if (error.response) {
          console.log(error.response.data);
          const status = error.response.status;
          let errorMessage = 'Erro desconhecido'

          switch (status) {
            case 400:
              errorMessage = error.response.data.error || 'Você já assumiu essa denúncia.';
              break;
            case 401:
              errorMessage = 'Denúncia já assumida por outra instituição.';
              break;
            case 500:
              errorMessage = 'Erro no servidor.';
              break;
            // Outros casos de erro e mensagens personalizadas podem ser adicionados aqui.
          }
          toast({
            title: errorMessage,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
        else {
          toast({
              title: 'Erro desconhecido',
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
        }
      });
  };

    const enviaMsgNotificacao = async () => {


      const token = localStorage.getItem('token'); //primeiro pegar o token, pois é uma rota protegida
      if (token) {
          axios.defaults.headers.common['Authorization'] = `${token}`;
        }


      const decodificaToken: any = await jwt_decode(token);

      axios.post('http://localhost:3344/msgNotificacao', {
        not_titulo: notTitulo,
        not_mensagem: notMensagem,
        not_data: new Date(),
        usuario_usu_cod: decodificaToken.usu_cod,
        denuncias_den_cod: denuncia.den_cod
      })
      .then((response) => {
        console.log('msg enviada');
      })
      .catch((error) => {
        console.error(error);
      })
    }



  const handleCommentSubmit = (comment) => {setComments(
    [
      ...comments, comment
    ]
  )}

  const curtirDenuncia = () => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  }

  axios.put(`http://localhost:3344/curtirDenuncia/${denuncia.den_cod}`)
    .then((response) => {
      toast({
        title: 'Denúncia curtida',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;
        let errorMessage = 'Erro desconhecido';

        switch (status) {
          case 400:
            errorMessage = error.response.data.error || 'Você já curtiu esta denúncia.';
            break;
          case 404:
            errorMessage = 'Denúncia não encontrada.';
            break;
          case 500:
            errorMessage = 'Erro no servidor.';
            break;
        }

        toast({
          title: errorMessage,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Falha ao curtir a denúncia',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    });
};

  const getUsuarios = () => {
    axios.get('http://localhost:3344/getUsuarios')
    .then((response) => {
      setUsuarios(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getUsuarios();
  }, [])




    return(
        <ChakraProvider>
                                                                {/* w={{base: '535px', md: '653px', lg: '802px'}} */}
        <Card boxShadow='lg'  mt='50px' bgColor='white' border='1px solid #A9A9A9' h={{base: '', md: '53vh'}}  w={{base: '', md:'45vw'}}> {/* border='1px solid #A9A9A9' _hover={{boxShadow: 'dark-lg', transition: '0.1s', cursor: 'pointer'}}> */}
  <CardHeader>
    <Flex>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        {denuncia.usu_img ? (
          <Avatar src={`http://localhost:3344/retornaImgPerfil/${denuncia.usu_img}`}  ml={-1} mr={2}> </Avatar>
        ): (
          <Avatar name={usuarios.usu_nome} ml={-1} mr={2}> </Avatar>
        )}


        <Box>
          <Heading fontSize={{base: '12px', md: '14px', lg: '16px'}}>{denuncia.usu_nome}</Heading>

        </Box>
      </Flex>

    </Flex>
  </CardHeader>
  <CardBody>
    <Center>
    <Text fontWeight='normal' textAlign='center' borderRadius='7px' bgColor='#338BB0' color='white' w='100%' mt='-20px'  fontSize={{ base: '14px', md: '18px', lg: '25px' }} fontFamily='BreeSerif-Regular' >{denuncia.den_nome}</Text>
    </Center>
    <Flex flexDirection='column' mt='15px' ml='-18px' color='gray'>

    <Tag bg='white' color='gray' fontSize={{base: '12px', md: '14px', lg: '16px'}}>
      <TagLeftIcon as={CiLocationOn} />
      <Text fontFamily='BreeSerif-Regular'>{denuncia.den_bairro}</Text>
    </Tag>

    <Tag bg='white' color='gray' fontSize={{base: '12px', md: '14px', lg: '16px'}}>
    <TagLeftIcon as={SiOpenstreetmap} />
    <Text fontFamily='BreeSerif-Regular'>{denuncia.den_problema} </Text>
    </Tag>
    </Flex>
    <Text  mt='10px'>
    {denuncia.den_desc}
    </Text>
  </CardBody>

                  {denuncia.den_img ? ( // se o usuario tiver adicionado imagem
                    <Image src={`http://localhost:3344/retornaImagem/${denuncia.den_img}`} w='full' h='100px'  />
                ) : (
                    <HiOutlineClipboardDocumentList size='10vh'  color='gray' /> // se n tiver adicionado imagem, é o que será exibido
                )}


  <CardFooter
  gap={5}
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <VStack>
    <Button position={{base: 'relative', md: 'unset'}} boxShadow='lg' color='white' onClick={curtirDenuncia}  bgColor='#338bb0'  _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}} leftIcon={<BiSolidLike />}>
    {denuncia.den_like}
    </Button>

    </VStack>
    <Button position={{base: 'relative', md: 'unset'}} boxShadow='lg' color='white' bgColor='#338bb0'  _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}} leftIcon={<BiCommentDetail />}>
      Comentar
    </Button>

    {usuTipo === 'instituicao' && (
      <Button position={{base: 'relative', md: 'unset'}}   boxShadow='lg' onClick={onOpen} color='white' bgColor='#338bb0'    _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}}leftIcon={<FaHandshake />}>
      Assumir denuncia
    </Button>
    )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color='#338bb0' fontFamily='BreeSerif-Regular' fontWeight='normal'>Assumir denúncia</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <FormControl>
              <Heading fontSize='1xl'>Diga algo para o denunciante</Heading>

                <Input mt={3} type='text' onChange={(e) => {
                  setAcoMensagem(e.target.value);
                }}/>


              </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button boxShadow='lg' onClick={() => {
                  criarAcompanhamento();
                  enviaMsgNotificacao();
                }} bgColor='#338bb0' color='white' _hover={{color: '#338bb0', backgroundColor: 'white'}}>Concluir</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>


  </CardFooter>
</Card>
</ChakraProvider>
    )
}

export default CardGrande;
