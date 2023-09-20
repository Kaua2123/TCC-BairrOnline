import { ChakraProvider, Flex, Text, Wrap, WrapItem, ScaleFade, useDisclosure, Icon, HStack } from "@chakra-ui/react"

import { FaUserAlt } from "react-icons/fa"

export const BoxUsuarios = () => {
    return(
        <HStack>
        <Flex m={20} bg='gray.200' borderRadius='3xl' w='400px' h='140px'>
            <Flex>
                <Icon as={FaUserAlt}></Icon>
            </Flex>
            
        </Flex>
        </HStack>
    )
}



