import { HStack, Button,Image, Box, Text} from "@chakra-ui/react"
import React from "react"
import imgden from './../img/buraco.jpg'

export const NotfiInst = () => {
     
    return(
        //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND
        <Box>
         <p>Uma instituição Assumiu a sua denuncia!!</p>
            <HStack>
            <Image src={imgden}  w={'150px'} height={'100px'}></Image>
                <Box w={'200px'}>
                    <Text>Data entra aqui</Text>
                    <Text> Titulo entra aqui </Text>
                    {/*<Text> Descrição vem aqui </Text> <----- deu erro, que teve como solucionar, 
                    mas vai ter descrições grandes demais pro tamanho do PopOver então melhor nao */ } 
                    <Button variant={'ghost'} fontSize={'10pt'}>Ver Denuncia</Button>
                </Box>
            </HStack>
        </Box>
          
        
 

    )
}

