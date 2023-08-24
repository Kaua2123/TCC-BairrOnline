import { Link } from 'react-router-dom';
import { ChakraProvider, Box, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement} from '@chakra-ui/react';

import imgFundo from '../img/imgfundo.png';

import { Button, ButtonGroup } from '@chakra-ui/react';
import {useState} from 'react';

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
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
      <ChakraProvider theme={theme}>
        <Box bgColor='White' h='auto' >
            <Flex justifyContent='space-between'> 
              
              <Flex flexDirection='column'>
                <Box> 
                  <Text fontFamily='BreeSerif-Regular' fontSize='35px' color='#338BB0' m='20px' >Faça o login!</Text>
                </Box>
             
                <Image src={imgFundo} mt='-40px'></Image>
            </Flex>
            <Flex flexDirection='column' mt='-50px' p='200px' bgColor='gray.100'>
                <Box h='330px'>

                <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                        <AiOutlineMail/>
                        </InputLeftElement>
                    <Input placeholder='Digite seu email' required border='1px solid black' type='email' />
                    </InputGroup>
<br></br>

                    <FormLabel>Senha:</FormLabel>
                    <InputGroup size='md' >
                    <InputLeftElement>
                        <RiLockPasswordLine/>
                        </InputLeftElement>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Digite sua senha' border='1px solid black'/>
                    <InputRightElement width='4.5rem'>
                    <Button h='2rem' size='md' onClick={handleClick}>
                    {show ? <AiFillEye size='20px'/> : <AiFillEyeInvisible size='20px'/>}
                    </Button>
<br></br>
                </InputRightElement>
                </InputGroup>
           
                </FormControl>
<br></br>

                    <Button colorScheme='blue'>Entrar</Button>
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