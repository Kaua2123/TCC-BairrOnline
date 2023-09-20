import { ChakraProvider, Box, GridItem, Text, Wrap, WrapItem, Flex, ScaleFade, useDisclosure, Icon, HStack, Grid } from "@chakra-ui/react"

import { FaUserAlt } from "react-icons/fa"
import { BoxUsuarios } from "./BoxUsuarios"


export const UsuariosReportados = ({secaoAtiva, menuClicado}) => {
    return(
        <ChakraProvider>


        <ScaleFade initialScale={0.4} in={secaoAtiva === 'usuariosReportados'}>
       <Grid templateColumns='repeat(3, 1fr)' gap={1}> {/*pra alinhar em 3 colunas */}
        
        <GridItem>
        <BoxUsuarios/>
        </GridItem>
            
             
        <GridItem>
        <BoxUsuarios/>
        </GridItem>
         
        <GridItem>
        <BoxUsuarios/>
        </GridItem>
         
        <GridItem>
        <BoxUsuarios/>
        </GridItem>

        <GridItem>
        <BoxUsuarios/>
        </GridItem>

        <GridItem>
        <BoxUsuarios/>
        </GridItem>
           
         </Grid>
         </ScaleFade>
             </ChakraProvider>
    )
}