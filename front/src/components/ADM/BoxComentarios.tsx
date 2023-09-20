import { Box, Flex, Text, Button, Icon, HStack } from "@chakra-ui/react"

import { FaUserAlt, FaRegComment } from "react-icons/fa"

export const BoxComentarios = () => {
    return(
        <>
        <HStack  h='27vh'>    
       
                <Flex m={20}>
                    <Flex gap={4} borderRadius='3xl' direction='row' alignItems='center' justify='center'> 
                        <Icon as={FaRegComment} fontSize='10vw'></Icon>
                        <Box bg='gray.200' borderRadius='2xl' alignItems='center' boxShadow='lg' w='20vw' h='15vh'>
                        <Text  fontSize='15px' mt={6}>
                            EL AGUA ESTAS ESTANCADA MDSSSS @120910291@!@!!!!PPQQP!!@!@!@@!@!@!@!@
                            !@2091212189218219821998201
                        </Text>
                        </Box>
                    </Flex>
              
                </Flex>
                
       
        </HStack>
        <Box>

            <Icon ml={20} mt={2} fontSize='2vw' as={FaUserAlt}> </Icon>
            <Text ml={20}>@usuario</Text>
        </Box>
         </>
    )
}



