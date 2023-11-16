
import { ChakraProvider, Spacer,Select, Box, Heading, extendTheme, Flex, Image, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text, InputRightElement, useToast, HStack, Stack, Checkbox, IconButton } from '@chakra-ui/react';
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
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineIdcard, AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';
import { MdDescription } from 'react-icons/md';

//validacpf

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
  const [emailValido, setEmailValido] = useState(false);
  const [usuSenha, setUsuSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(false);
  const [usuTel, setUsuTel] = useState("");
  const [telefoneValido, setTelefoneValido] = useState(false);
  const [usuCep, setUsuCep] = useState("");
  const [usuCPF, setUsuCPF] = useState("");
  const [usuCNPJ, setUsuCNPJ] = useState("");
  const [usuData, setUsuData] = useState(""); ''
  const [usuTipo, setUsuTipo] = useState("denunciante") //denunciante valor padrao
  const [secaoAtual, setSecaoAtual] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show)

  
  const validarCPF = (cpf) => {

  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(usuCPF.charAt(i)) * (10 - i);
    }
  
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(usuCPF.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(usuCPF.charAt(i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(usuCPF.charAt(10))) return false;
  
    return true;
  };


  const validaEmail = () => {
    // regex pra validar cm a estrutura normal de email blabla@gmail.com...
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValido(emailRegex.test(usuEmail));
  }

  const validarTelefone = () => {
    // regex pra validar com 10 digitos
    const regexTelefone = /^\d{11}$/;
  
    setTelefoneValido(regexTelefone.test(usuTel));
  }

  const cadastraUsuario = async () => {

    if (usuNome === "" || usuEmail === "" || usuSenha === "" || usuTel === "" || usuCPF === "") { //validaçao
      toast({
        title: "Algum campo parece estar vazio.",
        status: "error",
        duration: 4000,
        isClosable: false,
      })
      console.log('Erro, algum campo vazio.')
      return;
    }

    if (usuSenha.length < 6) { //validaçao 
      toast({
        title: "Sua senha deve ter no mínimo 6 caracteres, por segurança.",
        status: "error",
        duration: 4000,
        isClosable: false,
      })
      return;
    }

    if (!emailValido) {
      toast({
        title: "Digite seu email corretamente.",
        status: "error",
        duration: 4000,
        isClosable: false,
      })
      return;
    }

    if (!telefoneValido) {
      toast({
        title: "Digite seu telefone corretamente. Verifique se incluiu o DDD",
        status: "error",
        duration: 4000,
        isClosable: false,
      })
      return;
    }

    if (!validarCPF(usuCPF)) {
    toast({
      title: "CPF inválido, verifique e tente novamente.",
      status: "error",
      duration: 4000,
      isClosable: false,
    });
    console.log('CPF inválido');
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


    


        <HStack w='full' h='100vh' >


          <Flex w='full' h='full' display={{base: 'none', md: 'flex',}}>
            
          <Image src={cadastro_login} objectFit='cover'  w='full' h='full' position='absolute' top='0' left='0' zIndex='-1'></Image>

          </Flex>

          <Flex w='full' h='full' alignItems='center' justifyContent='center'>
            <Stack w='full' maxW='md' spacing={4} p={6} mt={12} ml={14}>
              {usuTipo === 'denunciante' ? (
                <Heading fontSize='2xl' color='#338bb0'>
                  Seja bem vindo, denunciante!
               </Heading>
              ) : (
                <Heading fontSize='2xl' color='#338bb0'>
                  Seja bem vinda, instituição!
              </Heading>
              )}
              
              <FormControl>

         {secaoAtual === 1 && (
          <>
          <FormLabel>Nome de Usuário</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineUser />
            </InputLeftElement>
            <Input placeholder='Digite seu nome' borderColor='black' required value={usuNome} onChange={(e) => {
              setUsuNome(e.target.value);

            }} />
          </InputGroup>


          <FormLabel>Telefone</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <BsTelephone />
            </InputLeftElement>
            <Input placeholder='Digite seu telefone' borderColor={telefoneValido ? 'green' : 'red'} required type='tel' value={usuTel} onChange={(e) => {
              setUsuTel(e.target.value)
              setTelefoneValido(true);
            }}
              onBlur={validarTelefone} />
          </InputGroup>
        

          {/* <FormLabel>CEP</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <CiLocationOn />
            </InputLeftElement>
            <Input placeholder='Digite seu CEP' borderColor='black' required type='number' value={usuCep} onChange={(e) => {
              setUsuCep(e.target.value)
            }} />
          </InputGroup> */}

       

          <FormLabel>CPF</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineIdcard />
            </InputLeftElement>
            <Input placeholder='Digite seu CPF' borderColor='black' required type='number' value={usuCPF} onChange={(e) => {
              setUsuCPF(e.target.value)
            }} />
          </InputGroup>
          <Spacer/>
          

          <IconButton aria-label='anterior' mt={3}  icon={<AiOutlineArrowRight/>} onClick={() => setSecaoAtual(secaoAtual + 1)} bgColor='#338bb0' color='white' _hover={{color: '#338bb0', backgroundColor: 'white'}} boxShadow='lg'>Próximo</IconButton>
          </>
         )}

          {secaoAtual === 2 && (
            <>
            <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineMail />
                  </InputLeftElement>
                  <Input placeholder='Digite seu email' borderColor={emailValido ? 'green' : 'red'}  required type='email' value={usuEmail} onChange={(e) => {
                    setUsuEmail(e.target.value);
                    setEmailValido(true);
                  }}
                  onBlur={validaEmail} />

                </InputGroup>
               

                <FormLabel>Senha</FormLabel>
                <InputGroup >
                  <InputLeftElement>
                    <RiLockPasswordLine />
                  </InputLeftElement>
                  <Input pr='4.5rem' borderColor='black' type={show ? 'text' : 'password'} placeholder='*********' value={usuSenha} onChange={(e) => {
                    setUsuSenha(e.target.value);
                  }

                  } />
                  <InputRightElement width='4.5rem'>
                    <Button h='2rem' variant='ghost' size='md' onClick={handleClick}>
                      {show ? <AiFillEye size='20px' color='#338bb0' /> : <AiFillEyeInvisible size='20px' />}
                    </Button>

                 

                  </InputRightElement>
                </InputGroup>

                <FormLabel>Sou: </FormLabel>
                <InputGroup >
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
                <IconButton boxShadow='lg' aria-label='anterior' mt={3} icon={<AiOutlineArrowLeft/>} onClick={() => setSecaoAtual(secaoAtual - 1)}  color='white' bgColor='#338bb0' _hover={{color: '#338bb0', backgroundColor: 'white'}}  >Anterior</IconButton>
                </>
          )}

                
                  
              </FormControl>
                
                <Stack spacing={4} direction='row' align='start' justify='space-between'> 

                  <Checkbox colorScheme='blue' display={secaoAtual === 1 ? 'none' : 'block'}>Lembrar de mim</Checkbox>
                  <Link to='/' ><Text color='#338bb0' display={secaoAtual === 1 ? 'none' : 'block'}>Esqueci minha senha</Text></Link>

                  
                </Stack>
                <Button bgColor="#338bb0"                   _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}} color='white' onClick={cadastraUsuario} display={secaoAtual === 1 ? 'none' : 'block'} boxShadow='lg'>Cadastrar</Button>


              <Link to='/Login'><Text color='blue.400'>Já possui uma conta? Clique para entrar</Text></Link>


            </Stack>
          </Flex>
        </HStack>

     


    </ChakraProvider>
  )
}

export default Cadastro;