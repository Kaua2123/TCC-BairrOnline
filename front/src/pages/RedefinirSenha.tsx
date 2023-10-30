import { Box, ChakraProvider, Image, Text, Stack, VStack, Input, Flex, HStack, Button, Grid, useToast, Modal, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalHeader, ModalBody, IconButton, FormControl, FormLabel, Center, InputGroup, InputLeftElement, } from "@chakra-ui/react"
import Header, { HeaderADM, HeaderInst, HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';

import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";



const RedefinirSenha = () => {

    const [usuSenha, setUsuSenha] = useState();

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
                            <Input placeholder='Digite seu email' borderColor='black' required value={usuSenha} onChange={(e) => {
                            setUsuSenha(e.target.value);

                            }} />
                        </InputGroup>

                    </FormControl>

                    <Button bgColor='#338bb0' color='white' boxShadow='lg' _hover={{background: 'white', color: '#338bb0'}}>Enviar código</Button>
                    <Text>Digite sua nova senha aqui</Text>
                </Stack>
               
            </Flex>
            </Center>
            </Box>
        </ChakraProvider>
    )
}

export default RedefinirSenha;
