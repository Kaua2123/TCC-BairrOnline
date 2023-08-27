
import { ChakraProvider, Select, Box, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement, useToast} from '@chakra-ui/react';
 
import imgFundo from '../img/imgfundo.png';

import { Button, ButtonGroup } from '@chakra-ui/react';
import {useState} from 'react';

import axios from 'axios';

//icones
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineMail} from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';
import {BsTelephone} from 'react-icons/bs';
import {RiLockPasswordLine} from 'react-icons/ri';
import {CiLocationOn} from 'react-icons/ci';
import { MdDescription } from 'react-icons/md';


const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });


const Cadastro = () => {
    const [show, setShow] = useState(false);
    const [usuNome, setUsuNome] = useState("");
    const [usuEmail, setUsuEmail] = useState("");
    const [usuSenha, setUsuSenha] = useState("");
    const [usuTel, setUsuTel] = useState ("");
    const [usuCep, setUsuCep] = useState("");
    const [usuData, setUsuData] = useState("");
    const [usuTipo, setUsuTipo] = useState("denunciante") //denunciante valor padrao
    const toast = useToast();

    const handleClick = () => setShow(!show)

    
  const cadastraUsuario = async () => {
    
    if(usuNome === "" || usuEmail === "" || usuSenha === "" || usuTel === "" || usuCep === "" ){
      toast({
        title: "Erro",
        description:" Algum campo não esta preenchido corretamente, verifique-os.",
        status: "error",
        duration: 4000,
        isClosable: false,
      })
      console.log('Erro, algum campo vazio.')
      return;
    }

    axios.post('http://localhost:3344/criarUsu', {    //para cadastro do usuario
      usu_nome: usuNome,
      usu_email: usuEmail,
      usu_senha: usuSenha,
      usu_tel: usuTel,
      usu_cep: usuCep,
      usu_data: new Date(),     
      usu_tipo: usuTipo
    })
    .then(response => {
      console.log('Usuário cadastrado');
      console.log(response.data);
      if (response){
        toast({
          title:"Cadastro realizado.",
          description: "Você foi cadastrado com sucesso.",
          status: "success",
          duration: 4000,
          isClosable: true, 
        })
      }
    })
    .catch((error) => {
      console.error(error);
      if(error){
        toast({
          title:"Erro: Você nâo foi cadastrado",
          description: "Erro nas credenciais ou algum campo vazio. Tente novamente.",
          status:"error",
          duration: 4000,
          isClosable: false,
        })
      }
    })            
  }

    return (
      <ChakraProvider theme={theme}>

        <Box bgColor='White' h='1000px' >
            <Flex justifyContent='space-between'> 
              
              <Flex flexDirection='column'>
                <Box> 
                  <Text fontFamily='BreeSerif-Regular' fontSize='35px' color='#338BB0' m='20px' >Cadastre-se e comece a denunciar!</Text>
                </Box>
             
                <Image src={imgFundo} boxSize={{base: '25em', md: '34em', lg: '47em'}} mt='-40px'></Image>
            </Flex>
            <Flex flexDirection='column' mt='-70px' p='200px' bgColor='gray.100'>
                <Box h='640px'>

                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <InputGroup> 
                        <InputLeftElement>
                        <AiOutlineUser/>
                        </InputLeftElement>
                       <Input placeholder='Digite seu nome' required border='1px solid black' value={usuNome} onChange={(e) => {
                        setUsuNome(e.target.value);
  
                       }} />
                    </InputGroup>

<br></br>
                    <FormLabel>Telefone</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                        <BsTelephone/>
                        </InputLeftElement>
                    <Input placeholder='Digite seu telefone' required border='1px solid black' type='tel' value={usuTel} onChange={(e) => {
                        setUsuTel(e.target.value)
                      }} />
                    </InputGroup>   
<br></br>

                    <FormLabel>CEP</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                        <CiLocationOn/>
                        </InputLeftElement>
                    <Input placeholder='Digite seu CEP' required border='1px solid black' type='number' value={usuCep} onChange={(e) => {
                      setUsuCep(e.target.value)
                    }}/>
                    </InputGroup>
                 

                    <br></br>
             
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                        <AiOutlineMail/>
                        </InputLeftElement>
                    <Input placeholder='Digite seu email' required border='1px solid black' type='email'  value={usuEmail} onChange={(e) => {
                      setUsuEmail(e.target.value)
                      }}/>
                
                    </InputGroup>
<br></br>

                    <FormLabel>Senha</FormLabel>
                    <InputGroup size='md' >
                    <InputLeftElement>
                        <RiLockPasswordLine/>
                        </InputLeftElement>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Digite sua senha' border='1px solid black' value={usuSenha} onChange={(e) => {
                      setUsuSenha(e.target.value);
                    }

                    }/>
                    <InputRightElement width='4.5rem'>
                    <Button h='2rem' size='md' onClick={handleClick}>
                    {show ? <AiFillEye size='20px'/> : <AiFillEyeInvisible size='20px'/>}
                    </Button>

                    <br></br>

      </InputRightElement>
    </InputGroup>

                    <InputGroup mt='30px'>
                    <FormLabel mt='10px'>Eu sou um</FormLabel>
                    <Select
                      w='200px'
                      value={usuTipo}
                      onChange={(e) => setUsuTipo(e.target.value)}
                      required
                      borderColor='black'
                    >
                      <option value="denunciante">Denunciante</option>
                      <option value="instituicao">Instituição</option>
                    </Select>
                    </InputGroup>
           
                </FormControl>
<br></br>
                    <Button colorScheme='blue' onClick={cadastraUsuario}>Cadastrar</Button>

                    

                </Box>
            </Flex>
            </Flex>
     </Box>
    </ChakraProvider>
    )
}

export default Cadastro;