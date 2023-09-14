import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Button, Text, Input, Textarea, Flex, Stack, Step, StepDescription, StepIcon, StepIndicator, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps,
}
  from "@chakra-ui/react"
import { TfiPlus } from "react-icons/tfi";

import axios from "axios";
import { useEffect, useState } from "react";

const steps = [
  { title: '20%', description: 'Saneamento básico.' },
  { title: '50%', description: 'kkkkk' },
  { title: '100%', description: 'Solucionado' },
]



const CardTarefa = ({acompanhamento}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })


  const denCod = 3;

  
  

  return (

    <Box bg='#338BB0' fontSize='20px' borderRadius='10px' w='80%' p={3} color='white'>
      Acompanhamento número {acompanhamento.aco_num} 
      <Button onClick={onOpen} w='100px' h='30px' ml='130px' leftIcon={<TfiPlus />} _hover={{ backgroundColor: 'acqua', color: '#338bb0' }}
        color='black'>Abrir</Button>
      <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}

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
              <Flex justifyContent="space-between" mt="20px">
                <Flex flexDirection="row">
                  <Box>
                    <Box mt="100px">
                      <Text fontSize="20px">
                        <b>Adicionar subtarefa</b>
                      </Text>
                      <Input type="text" w='150px' borderColor="gray" mt='10px' />
                      <Stack></Stack>
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }}
                        mt='-67px' ml='160px'>
                        Adicionar
                      </Button>
                    </Box>
                    <Box ml="600px" mt="-110px">
                      <Text fontSize="20px">
                        <b>Enviar mensagem para o denunciante</b>
                      </Text>
                      <Textarea borderColor="gray" />
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }} mt='10px'
                        ml='300px'>
                        Enviar
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
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