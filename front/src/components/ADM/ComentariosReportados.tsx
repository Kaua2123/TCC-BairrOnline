import { ChakraProvider, Box, GridItem, Text, Wrap, WrapItem, Flex, ScaleFade, useDisclosure, Icon, HStack, Grid } from "@chakra-ui/react"
import { BoxComentarios } from "./BoxComentarios"



export const ComentariosReportados = ({secaoAtiva}) => {
    return(
        <ChakraProvider>
            <ScaleFade initialScale={0.4} in={secaoAtiva === 'comentariosReportados'}>
       <Grid templateColumns='repeat(3, 1fr)' gap={1}> {/*pra alinhar em 3 colunas */}
        
        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>
        
        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>

        <GridItem>
      <BoxComentarios/>
        </GridItem>
            
        
           
         </Grid>
         </ScaleFade>
        </ChakraProvider>
    )
}

