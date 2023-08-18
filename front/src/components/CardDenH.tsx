//chakra
import {Card, CardBody, CardFooter, Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react"; 

//imgs
import aguaEstanc from "../img/aguaEstancada.png";
import cameraIcon from "../img/camera.png";
import { useState } from "react";


const CardDenH = ({editando, setEditando, nome, descricao}) => { //card de denúncoa horizontal, pra home do usuário

    const [hover, setHover] = useState(false);


    return(
        <Card border='1px solid #A9A9A9'   borderRadius='4px' direction={{base: 'column', sm: 'row'}} _hover={{boxShadow: 'lg', transition: '0.2s'}}>
          {editando ? (
            <>
             <Image border='1px solid #A9A9A9' _hover={{opacity: 0.8, transition: '0.2s'}}  borderRadius='4px' objectFit='cover' src={aguaEstanc} maxW={{base: '100%', sm: '200px'}}></Image>
             <Image position='absolute' top='34px' left='-22px'  src={cameraIcon} transition='0.2s' borderRadius='4px' opacity='2.0' objectFit='cover' maxW={{base: '100%', sm: '200px'}}></Image>
            </>
          ): (
            <Image border='1px solid #A9A9A9' borderRadius='4px' objectFit='cover' src={aguaEstanc} maxW={{base: '100%', sm: '200px'}}></Image>
          )} 
          {hover}
        
            <Stack>
                <CardBody>
                    <Heading size='md'>{nome}</Heading>
                    <Heading mt={2} size='xs' color='gray' textTransform='uppercase'>Em Santo Agostinho</Heading>
                    <Heading mt={1} size='xs' color='gray' textTransform='uppercase'>Data de envio: 19/05/1945</Heading>
                    <Heading mt={2} size='xs' color='gray' textTransform='uppercase'>Descrição: </Heading>
                    <Text mt={2}>{descricao}</Text>
                </CardBody>

                <CardFooter/>
                   
          
            </Stack>
        </Card>
    )
}


export default CardDenH;