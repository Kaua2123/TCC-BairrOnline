
import { ChakraProvider, Select, Box, Heading, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement, useToast, HStack, Stack, Checkbox } from '@chakra-ui/react';
//imgs
import imgFundo from '../img/imgfundo.png';
import cadastro_login from '../img/cadastro_login.png'
import cadastro_loginEsquerdo from '../img/cadastro_login esquerdo.png'

import { Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//icones
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';
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
  const [usuTel, setUsuTel] = useState("");
  const [usuCep, setUsuCep] = useState("");
  const [usuCPF, setUsuCPF] = useState("");
  const [usuCNPJ, setUsuCNPJ] = useState("");
  const [usuData, setUsuData] = useState(""); ''
  const [usuTipo, setUsuTipo] = useState("denunciante") //denunciante valor padrao
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show)


  const cadastraUsuario = async () => {

    if (usuNome === "" || usuEmail === "" || usuSenha === "" || usuTel === "" || usuCep === "") {
      toast({
        title: "Erro",
        description: " Algum campo não esta preenchido corretamente, verifique-os.",
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
        if (response) {
          toast({
            title: "Cadastro realizado.",
            description: "Você foi cadastrado com sucesso. Redirecionando para a página de login...",
            status: "success",
            duration: 4000,
            isClosable: true,
          })
          setTimeout(() => {
            navigate('/Login')
          }, 1700)
          
          
        }
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          toast({
            title: "Erro: Você não foi cadastrado",
            description: "Email já utilizado. Mude e tente novamente",
            status: "error",
            duration: 4000,
            isClosable: false,
          })
        }
      })
  }



  return (
    <ChakraProvider theme={theme}>


      {/* Coloque o formulário de cadastro aqui */}


      {usuTipo === 'denunciante' ? (


        <HStack w='full' h='100vh' >


          <Flex w='full' h='full' display={{base: 'none', md: 'flex'}}>
            
          <Image src={cadastro_login} objectFit='cover'  w='full' h='full' position='absolute' top='0' left='0' zIndex='-1'></Image>

          </Flex>

          <Flex w='full' h='full' alignItems='center' justifyContent='center'>
            <Stack w='full' maxW='md' spacing={4} p={6} mt={12} ml={14}>
              <Heading fontSize='2xl' color='#338bb0'>
                Seja bem vindo, denunciante!
              </Heading>

              <FormControl>
                <FormLabel>Nome</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineUser />
                  </InputLeftElement>
                  <Input placeholder='Digite seu nome' required value={usuNome} onChange={(e) => {
                    setUsuNome(e.target.value);

                  }} />
                </InputGroup>

    
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <BsTelephone />
                  </InputLeftElement>
                  <Input placeholder='Digite seu telefone' required type='tel' value={usuTel} onChange={(e) => {
                    setUsuTel(e.target.value)
                  }} />
                </InputGroup>
              

                <FormLabel>CEP</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiLocationOn />
                  </InputLeftElement>
                  <Input placeholder='Digite seu CEP' required type='number' value={usuCep} onChange={(e) => {
                    setUsuCep(e.target.value)
                  }} />
                </InputGroup>

             

                <FormLabel>CPF</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiLocationOn />
                  </InputLeftElement>
                  <Input placeholder='Digite seu CPF' required type='number' value={usuCPF} onChange={(e) => {
                    setUsuCPF(e.target.value)
                  }} />
                </InputGroup>


            

                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineMail />
                  </InputLeftElement>
                  <Input placeholder='Digite seu email' required type='email' value={usuEmail} onChange={(e) => {
                    setUsuEmail(e.target.value)
                  }} />

                </InputGroup>
               

                <FormLabel>Senha</FormLabel>
                <InputGroup >
                  <InputLeftElement>
                    <RiLockPasswordLine />
                  </InputLeftElement>
                  <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='*********' value={usuSenha} onChange={(e) => {
                    setUsuSenha(e.target.value);
                  }

                  } />
                  <InputRightElement width='4.5rem'>
                    <Button h='2rem' variant='ghost' size='md' onClick={handleClick}>
                      {show ? <AiFillEye size='20px' color='#338bb0' /> : <AiFillEyeInvisible size='20px' />}
                    </Button>

                 

                  </InputRightElement>
                </InputGroup>

                <InputGroup mt={4}>
                  <FormLabel>Eu sou um</FormLabel>
                  <Select
                   
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
                
                <Stack spacing={4} direction='row' align='start' justify='space-between'> 

                  <Checkbox colorScheme='blue'>Lembrar de mim</Checkbox>
                  <Link to='/' ><Text color='#338bb0'>Esqueci minha senha</Text></Link>

                  
                </Stack>
                <Button colorScheme='blue' onClick={cadastraUsuario}>Cadastrar</Button>


              <Link to='/Login'><Text color='blue.400'>Já possui uma conta? Clique para entrar</Text></Link>


            </Stack>
          </Flex>
        </HStack>

      ) : (
        <HStack w='full' h='100vh' >

          <Flex w='full' h='full' alignItems='center' justifyContent='center' display={{base: 'none', md: 'flex'}}>
            <Stack w='full' maxW='md' spacing={4} p={6}>
              <Heading fontSize='2xl' color='#338bb0'>
                Seja bem vinda, instituição!
              </Heading>

              <FormControl>
                <FormLabel>Nome</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineUser />
                  </InputLeftElement>
                  <Input placeholder='Digite seu nome' required value={usuNome} onChange={(e) => {
                    setUsuNome(e.target.value);

                  }} />
                </InputGroup>

    
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <BsTelephone />
                  </InputLeftElement>
                  <Input placeholder='Digite seu telefone' required type='tel' value={usuTel} onChange={(e) => {
                    setUsuTel(e.target.value)
                  }} />
                </InputGroup>
              

                <FormLabel>CEP</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiLocationOn />
                  </InputLeftElement>
                  <Input placeholder='Digite seu CEP' required type='number' value={usuCep} onChange={(e) => {
                    setUsuCep(e.target.value)
                  }} />
                </InputGroup>

             

                <FormLabel>CPF</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiLocationOn />
                  </InputLeftElement>
                  <Input placeholder='Digite seu CPF' required type='number' value={usuCPF} onChange={(e) => {
                    setUsuCPF(e.target.value)
                  }} />
                </InputGroup>


            

                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineMail />
                  </InputLeftElement>
                  <Input placeholder='Digite seu email' required type='email' value={usuEmail} onChange={(e) => {
                    setUsuEmail(e.target.value)
                  }} />

                </InputGroup>
               

                <FormLabel>Senha</FormLabel>
                <InputGroup >
                  <InputLeftElement>
                    <RiLockPasswordLine />
                  </InputLeftElement>
                  <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='*********' value={usuSenha} onChange={(e) => {
                    setUsuSenha(e.target.value);
                  }

                  } />
                  <InputRightElement width='4.5rem'>
                    <Button variant='ghost' h='2rem' size='md' onClick={handleClick}>
                      {show ? <AiFillEye size='20px' color='#338bb0' /> : <AiFillEyeInvisible size='20px' />}
                    </Button>

                 

                  </InputRightElement>
                </InputGroup>

                <InputGroup mt={4}>
                  <FormLabel>Eu sou um</FormLabel>
                  <Select
                   
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
                
                <Stack spacing={4} direction='row' align='start' justify='space-between'> 

                  <Checkbox colorScheme='blue'>Lembrar de mim</Checkbox>
                  <Link to='/' ><Text color='#338bb0'>Esqueci minha senha</Text></Link>

                  
                </Stack>
                <Button colorScheme='blue' onClick={cadastraUsuario}>Cadastrar</Button>


              <Link to='/Login'><Text color='blue.400'>Já possui uma conta? Clique para entrar</Text></Link>


            </Stack>
          </Flex>

          <Flex w='full' h='full' borderRightWidth={1}>
          <Image src={cadastro_loginEsquerdo} objectFit='cover'  w='full' h='full' position='absolute' top='0' left='0' zIndex='-1'></Image>
          </Flex>
        </HStack>

      )}


    </ChakraProvider>
  )
}

export default Cadastro;