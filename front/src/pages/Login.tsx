import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement, useToast, HStack, Stack, Heading} from '@chakra-ui/react';

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
        else if(decodificaToken.usu_tipo === 'administrador'){
          setTimeout(() => {
            navigate('/HomeADM')
          })
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


        <HStack w='full' h='100vh'>

              <Flex w='full' h='full' borderRightWidth={1} display={{base: 'none', md: 'flex'}}>
           
                <Image src={imgFundo} objectFit='cover'></Image>
            </Flex>

            <Flex w='full' h='full' alignItems='center' justifyContent='center'> 
            <Stack w='full' maxW='md' spacing={4} p={6}>
              <Heading fontSize='2xl' color='#338bb0'>Entre e comece a denunciar</Heading>
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

                </InputRightElement>
                </InputGroup>
           
                </FormControl>

                <Stack spacing={4} direction='row' align='start' justify='space-between'> 

                  
                  <Link to='/Cadastro' ><Text color='#338bb0'>Ainda não tem uma conta? Cadastre-se!</Text></Link>

                  
                </Stack>

        <Button colorScheme='blue' onClick={logarUsuario}>Entrar</Button>

            </Stack>
             

                

                 


                   

          
                   
                
            </Flex>
           
            </HStack>
    </ChakraProvider>
    )
}

export default Login;