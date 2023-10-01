import { Card, CardBody, Image, Text, CardFooter } from "@chakra-ui/react"


import logoInst from "../img/logoInst.png"


const CardInst = ({instituicao}) => {
    return(
        <Card   maxW='sm' w='150px' h='150px' bgColor='gray.100' align='center' border='1px solid #A9A9A9' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
        <CardBody>
          <Image src={`http://localhost:3344/retornaImgPerfil/${instituicao.usu_img}`} fallbackSrc={logoInst}></Image>
        </CardBody>

        <CardFooter>
          <Text align='center' fontFamily='BreeSerif-Regular'> {instituicao.usu_nome} </Text>
        </CardFooter>
     </Card>
    )
    
}




export default CardInst;