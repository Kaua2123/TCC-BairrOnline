import { Box,  Modal,    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, 
  Button, Text, Input, Textarea, Flex, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps } 
from "@chakra-ui/react"
import { TfiPlus } from "react-icons/tfi";

const steps = [
  { title: '20%', description: "Saneamento Básico" },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
]



const CardTarefa = () => {  
    const  { isOpen,  onOpen, onClose } = useDisclosure()
    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
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
        <Stepper size='lg' index={activeStep}>
        {steps.map((step, index) => (
           <Step key={index}>
             <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
               />
             </StepIndicator>
             <Box flexShrink='0'>
             <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
        ))}
       </Stepper> 
    
            <Flex flexDirection="column">
          
      
              <Box mt='200px' display="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="20px">
                    <b>Adicionar subtarefa</b>
                  </Text>
                  <Input type="text" w='150px' borderColor="gray" mt='10px' />
                  <Stack></Stack>
                  <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }} mt='-67px' ml='160px'>
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
        </ModalFooter>
     </ModalContent>

     </Modal>
    </Box>

    )
    }




export default CardTarefa;