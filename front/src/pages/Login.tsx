import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement, useToast} from '@chakra-ui/react';

import imgFundo from '../img/imgfundo.png';

import { Button, ButtonGroup } from '@chakra-ui/react';
import {useState} from 'react';

//axios
import axios from 'axios';
import jwt_decode from 'jwt-decode'

//icones
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineMail} from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';
import {BsTelephone} from 'react-icons/bs';
import {RiLockPasswordLine} from 'react-icons/ri';
import {CiLocationOn} from 'react-icons/ci';


const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });



const Login = () => {

    const [show, setShow] = useState(false);
    const [usuEmail, setUsuEmail] = useState("");
    const [usuSenha, setUsuSenha] = useState("");
    const toast = useToast();
    const navigate = useNavigate();


    const logarUsuario = async () => {

      axios.post('http://localhost:3344/logarUsu', {// para logar o usuario
        usu_email: usuEmail, 
        usu_senha: usuSenha
      })
      .then((response) => {
        console.log('Usuário autenticado, login bem sucedido.')
        console.log(response.data);
        
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `${token}`;

        const decodificaToken: any = jwt_decode(token);

        if(response){
          toast({
            title: 'Login bem sucedido.',
            description: 'Você foi autenticado.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        }

      
          
        if(decodificaToken.usu_tipo === 'denunciante'){
          setTimeout(() => {
            navigate('/HomeUsuario')
          }, 1000)
          
        }
        else if(decodificaToken.usu_tipo === 'instituicao'){
          setTimeout(() => {
            navigate('/HomeInst')
          }, 1000)
        }
       
        
      })

      .catch((error) => {
        console.error(error);

        if(error){
          toast({
            title: 'Erro: Login não sucedido',
            description: 'Credenciais incorretas',
            status: 'error',
            duration: 4000,
            isClosable: true
          })
        }
      })
      
    }

    const handleClick = () => setShow(!show)
    return (
      <ChakraProvider theme={theme}>
        <Box bgColor='White' h='auto' >
            <Flex justifyContent='space-between'> 
              
              <Flex flexDirection='column'>
                <Box> 
                  <Text fontFamily='BreeSerif-Regular' fontSize='35px' color='#338BB0' m='20px' >Faça o login!</Text>
                </Box>
             
                <Image src={imgFundo} boxSize={{base: '25em', md: '34em', lg: '47em'}}></Image>
            </Flex>
            <Flex flexDirection='column' mt='-50px' p='200px' bgColor='gray.100'>
                <Box mt='100px'>

                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                        <AiOutlineMail/>
                        </InputLeftElement>
                    <Input placeholder='Digite seu email' required border='1px solid black' type='email' value={usuEmail} onChange={(e) =>{
                      setUsuEmail(e.target.value)
                    }}/>
                    </InputGroup>
<br></br>

                    <FormLabel>Senha:</FormLabel>
                    <InputGroup size='md' >
                    <InputLeftElement>
                        <RiLockPasswordLine/>
                        </InputLeftElement>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Digite sua senha' border='1px solid black' value={usuSenha} onChange={(e) =>{
                      setUsuSenha(e.target.value)
                    }}/>
                    <InputRightElement width='4.5rem'>
                    <Button h='2rem' size='md' onClick={handleClick}>
                    {show ? <AiFillEye size='20px'/> : <AiFillEyeInvisible size='20px'/>}
                    </Button>
<br></br>
                </InputRightElement>
                </InputGroup>
           
                </FormControl>
<br></br>

                    <Button colorScheme='blue' onClick={logarUsuario}>Entrar</Button>
    <br></br>
    <br></br>

                    <Link to='/Cadastro'><Text color='blue.400'>Ainda não tem uma conta? Cadastre-se</Text></Link>
<br></br>
          
                   
                </Box>
            </Flex>
            </Flex>
     </Box>
    </ChakraProvider>
    )
}

export default Login;