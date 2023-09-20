import { ChakraProvider, Box, Flex, Text, Wrap, WrapItem, ScaleFade, useDisclosure, Icon, HStack } from "@chakra-ui/react"

import { FaUserAlt } from "react-icons/fa"

export const BoxUsuarios = () => {
    return(
        <>
        <HStack  h='27vh'>    
        <Flex m={20} bg='gray.200' justify='center' borderRadius='3xl' w='15vw' h='22vh'>
            <Flex alignItems='center' >
                <Icon fontSize={75} color='black' as={FaUserAlt} ></Icon> {/*aq seria afoto do usuario */}
            </Flex>
           
        </Flex>
       
        </HStack>
         <Box>
            <Text ml={20} mt={2}>
            0 denúncias {/*pegar do banco aqui */}
          
            </Text>
            <Text ml={20} mt={2}>
            Reportado por: 
            </Text>
        </Box>
         </>
    )
}



