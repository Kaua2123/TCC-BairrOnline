import { Box, Flex, Text, Button, Icon, HStack } from "@chakra-ui/react"

import { FaUserAlt, FaRegComment } from "react-icons/fa"

export const BoxComentarios = () => {
    return(
        <>
        <HStack  h='27vh'>    
       
                <Flex m={20}>
                    <Flex gap={4} borderRadius='3xl' direction='row' alignItems='center' justify='center'> 
                        <Icon as={FaRegComment} fontSize='7vw'></Icon>
                        <Box bg='gray.200' borderRadius='2xl' alignItems='center' boxShadow='lg' w='auto' h='15vh'>
                        <Text  fontSize='1vw' p={2} pl={4} pr={4} fontFamily='sans-serif' mt={6}>
                            complicado
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



