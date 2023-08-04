//chakra
import {Card, CardBody, CardFooter, Button, Heading, Image, Stack, Text } from "@chakra-ui/react"; 

//imgs
import aguaEstanc from "../img/aguaEstancada.png";

const CardDenH = () => { //card de denúncoa horizontal, pra home do usuário

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
                    <Button variant='solid' color='white' bgColor="#338BB0" _hover={{backgroundColor: "gray.100", color: "#338BB0"}}>
                        Ver denúncia
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}


export default CardDenH;