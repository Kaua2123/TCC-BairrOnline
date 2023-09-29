import { Box, ChakraProvider, Image, Text, VStack, Input, Flex, HStack, Button, Grid, useToast, } from "@chakra-ui/react"
import { HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';

import axios from "axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";



export const MeuPerfil = () => {

    const [nomeUsu, setNomeUsu] = useState("");
    const [cepUsu, setCepUsu] = useState("");
    const [emailUsu, setEmailUsu] = useState("");
    const [senhaUsu, setSenhaUsu] = useState("");
    const toast = useToast();

    const updateUsuarios = async () => {

        const token = localStorage.getItem('token'); //token para proteção das rotas
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        const decodificaToken: any = jwtDecode(token);

        await axios.put(`http://localhost:3344/updateUsuarios/${decodificaToken.usu_cod}`, {
            usu_nome: nomeUsu,
            usu_cep: cepUsu,
            usu_email: emailUsu,
            usu_senha: senhaUsu
        })
        .then((response) => {
            console.log('sucesso', response);
            toast({
                title: 'Dados atualizados.',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        })
        .catch((error) => {
            console.log('erro', error)
            toast({
                title: 'Erro ao atualizar os dados.',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        })
    }

    return (
        <ChakraProvider>
            <HeaderUsu/>    
        <Box boxShadow='lg'  mt={8} borderRadius='12px' >
            <HStack  justify='center' w='full' h='60vh' alignItems='center'>
                <Image src={imgAvatar} boxSize='150px' mr={24}></Image>

                <Text fontSize='35px'>Altere sua foto de perfil</Text>

                <Button ml={24} w='10vw' boxShadow='lg' bgColor='#338bb0' color='white'>Alterar</Button>
            </HStack>
        </Box>

        <Box boxShadow='lg' pb={10} mt={16} borderRadius='12px'>
            <VStack w='full' h='70vh' mt={10}>
                <Text fontSize='35px'>Altere seus dados aqui</Text>
                <HStack>
                    <Grid gap={20} templateColumns='1fr 1fr'>

                    <VStack alignItems='flex-start'>
                        <Text>Nome completo</Text>
                        <Input value={nomeUsu} onChange={(e) => {
                            setNomeUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>CEP</Text>
                        <Input value={cepUsu} onChange={(e) => {
                            setCepUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Email</Text>
                        <Input value={emailUsu} onChange={(e) => {
                            setEmailUsu(e.target.value)
                        }}/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Senha</Text>
                        <Input value={senhaUsu} onChange={(e) => {
                            setSenhaUsu(e.target.value);
                        }}/>
                    </VStack>


                    </Grid> 
                </HStack>
                <Button mt={14} w='60%' bgColor='#338bb0' color='white' onClick={updateUsuarios}> Salvar suas informações </Button>
            </VStack>
        </Box>
        </ChakraProvider>
    )
}


