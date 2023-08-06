import { HStack,Image, Box, Text, Checkbox,Hide} from "@chakra-ui/react"
import imden from './../img/buraco.jpg'
import '../App.css';
import React from "react"

export const NotfiInst = () => {
     
    return(
        //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND

        
        <Box w='450px'border={'#F5F5F5 solid '}height={'200px'}  _hover={{bgColor:'#f5f5f5', cursor:'pointer'}} padding={'10px'} >
            <Text fontSize={'12pt'} color={'blackAlpha.700'} fontFamily='BreeSerif-Regular'>*EXEMPLO!! Isso tem que Ficar Vazio!!* </Text>
         <Text fontSize={'12pt'} color={'blackAlpha.700'} fontFamily='BreeSerif-Regular'>Uma instituição Assumiu a sua denuncia!!</Text>
            <HStack>
           
                <label htmlFor="CheckNot">
                 <Box className="Boxnot" w="150px" h={'100px'} maxH={'120px'} maxW={'200px'}>                 
                  <Image src={imden} height={'inherit'} width={'inherit'}/>
                 </Box>
                </label> 
                
                 
                
                <Box display={"flex"} flexDirection={'column'} w={'55%'} h={'100px'} paddingLeft={'5px'} paddingRight={'5px'} >
                    {/*padding é melhor quando usado no elemento que ele precisa, tipo o box que vai conter os valores, usando no container principal ficou fei*/}
                    
                    <Text>Data entra aqui</Text>     {/*Data entra aqui*/}
                    <Text> Titulo entra aqui </Text> {/*Titulo entra aqui*/}

                </Box>
            </HStack>           
        </Box>  

    )
}

