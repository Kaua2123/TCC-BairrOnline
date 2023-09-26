import { Box, ChakraProvider, Image, Text, VStack, Input, Flex, HStack, Button, Grid, } from "@chakra-ui/react"
import { HeaderUsu } from "../components/Header"
import imgAvatar from '../img/avatar.png';


export const MeuPerfil = () => {
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
                        <Input/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>CEP</Text>
                        <Input/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Email</Text>
                        <Input/>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>Senha</Text>
                        <Input/>
                    </VStack>


                    </Grid> 
                </HStack>
                <Button mt={14} w='60%' bgColor='#338bb0' color='white'> Salvar suas informações </Button>
            </VStack>
        </Box>
        </ChakraProvider>
    )
}


