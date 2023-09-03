//chakra
import { Flex, Image, Text, ChakraProvider, extendTheme  } from '@chakra-ui/react'

//imgs
import sectionInst from '../img/sectionInst.png';


const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });


const AcompanharDen = () => {
    return(

        <ChakraProvider theme={theme}>
            <Flex justify='center' id='sexo'>
                <Image src={sectionInst} boxSize='40em'></Image>
            </Flex>
            <Flex justify='center'>
                <Text mt='-100px' fontSize='35px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Acompanhar denúncias</Text>
            </Flex>
      </ChakraProvider>

    )
}


export default AcompanharDen;