
import { Box, ChakraProvider, Image, Text, Stack, VStack, Input, Flex, HStack, Button, Grid, useToast, Modal, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalHeader, ModalBody, IconButton, FormControl, FormLabel, Center, InputGroup, InputLeftElement, } from "@chakra-ui/react"
import Header, { HeaderADM, HeaderInst, HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';

import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";



const EsqueciSenha = () => {

    const [usuEmail, setUsuEmail] = useState();
    const toast = useToast();

    const enviarEmail = () => {
        
        axios.post('http://localhost:3344/emailRecuperarSenha', {
            usu_email: usuEmail,
        })
            .then(response => {

                const token = response.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `${token}`;
                
                console.log(response.data); 
                toast({
                    title: 'Email enviado.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            })
            .catch(error => {
                console.error('Erro ao enviar o email:', error);
                toast({
                    title: 'Falha ao enviar o email.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            });
    };


    return (
        <ChakraProvider>
            <Box w='100vw' h='100vh' bgColor='#338bb0'>
                <Center>
            <Flex w='50vw' h='50vh' borderRadius='20px' boxShadow='lg' mt={20} bgColor='white' justifyContent='center'>
                <Stack w='full' maxW='md' spacing={4} p={6} mt={8}>

                    <FormControl>
                    <FormLabel color='#338bb0' fontSize='25px' pb={3}>Recuperação de senha</FormLabel>
                        <InputGroup pb={3}>
                            <InputLeftElement>
                            <AiOutlineUser />
                            </InputLeftElement>
                            <Input placeholder='Digite seu email' borderColor='black' required value={usuEmail} onChange={(e) => {
                            setUsuEmail(e.target.value);

                            }} />
                        </InputGroup>

                    </FormControl>

                    <Button bgColor='#338bb0' onClick={enviarEmail} color='white' boxShadow='lg' _hover={{background: 'white', color: '#338bb0'}}>Enviar código</Button>
                    <Text>Enviaremos um código para seu email.</Text>
                </Stack>
               
            </Flex>
            </Center>
            </Box>
        </ChakraProvider>
    )
}

export default EsqueciSenha;