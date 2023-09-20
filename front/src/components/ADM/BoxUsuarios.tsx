import { Box, Flex, Text, Button, Icon, HStack } from "@chakra-ui/react"

import { FaUserAlt } from "react-icons/fa"

export const BoxUsuarios = () => {
    return(
        <>
        <HStack  h='27vh'>    
        <Flex m={20} bg='gray.200' justify='center' boxShadow='lg' borderRadius='3xl' w='15vw' h='22vh'>
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
            <Button  bgColor='#338bb0' color='white' _hover={{color: '#338bb0', bg:'white'}} ml={20} mt={2}>
                Banir
            </Button>
        </Box>
         </>
    )
}



