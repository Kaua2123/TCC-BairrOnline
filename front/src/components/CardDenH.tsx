//chakra
import {Card, CardBody, CardFooter, Button, Heading, Image, Stack, Text, Modal, ModalOverlay,
ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"; 

//imgs
import aguaEstanc from "../img/aguaEstancada.png";

//hooks (react, chakra, blalblabla)
import { useDisclosure } from "@chakra-ui/react";



const CardDenH = () => { //card de denúncoa horizontal, pra home do usuário

    const {isOpen, onOpen, onClose} = useDisclosure();

    return(
        <Card border='1px solid #A9A9A9' w='650px'  borderRadius='4px' direction={{base: 'column', sm: 'row'}} _hover={{boxShadow: 'dark-lg', transition: '0.1s'}}>
            <Image border='1px solid #A9A9A9'  borderRadius='4px' objectFit='cover' src={aguaEstanc} maxW={{base: '100%', sm: '200px'}}></Image>
            <Stack>
                <CardBody>
                    <Heading size='md'>Agua estancada</Heading>

                    <Text>
                        Agua estancada en el jd cidade do aco i ninguen hacie nada
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button onClick={onOpen} variant='solid' color='white' bgColor="#338BB0" _hover={{backgroundColor: "gray.100", color: "#338BB0"}}>
                        Gerenciar denúncia
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Gerenciar denúncias</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <Text>Aqui será a seção de gerenciamento das denuncias do usuário</Text>
                                <Text>Vão ter as opções de editar, deletar, etc</Text>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={onClose}>
                                    Fechar
                                </Button>
                                <Button variant='ghost'>ação secundária</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </CardFooter>
            </Stack>
        </Card>
    )
}
 // usar modal pra abrir a denuncia e deixar o usuario editar ela ou apagar, crud da denuncia

export default CardDenH;