import { Box,  Modal,    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Text, Input, Textarea, Flex  } 
from "@chakra-ui/react"
import { TfiPlus } from "react-icons/tfi";



const CardTarefa = () => {  
    const  { isOpen, onOpen, onClose } = useDisclosure()
    return(     
        
 
     <Box bg='#338BB0' fontSize='20px' borderRadius='10px' w='80%' p={3} color='white'>
        El agua estas estancada
     <Button onClick={onOpen} w='100px' h='30px' ml='130px' leftIcon={<TfiPlus/>} color='black'>Abrir</Button>
     <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
     <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton/>
        <ModalBody>

        <Flex flexDirection="column">
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="20px">
                    <b>Adicionar subtarefa</b>
                  </Text>
                  <Input type="text" w="200px" borderColor="gray" />
                  <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }} mt="10px">
                    Adicionar
                  </Button>
                </Box>
                <Box>
                  <Text fontSize="20px">
                    <b>Enviar mensagem para o denunciante</b>
                  </Text>
                  <Textarea borderColor="gray" />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
      
              
                
         
     
        
     
        <ModalFooter>
        
        <Button colorScheme='blue' mr={3} onClick={onClose}>
            Fechar
        </Button>
        </ModalFooter>
     </ModalContent>

     </Modal>
    </Box>

    )
}




export default CardTarefa;