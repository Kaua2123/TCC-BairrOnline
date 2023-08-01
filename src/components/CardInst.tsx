import { Card, CardBody, Image, Text, CardFooter } from "@chakra-ui/react"


import logoInst from "../img/logoInst.png"


const CardInst = () => {
    return(
        <Card   maxW='sm' w='150px' h='150px' bgColor='gray.100' align='center' border='1px solid gray' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
        <CardBody>
          <Image src={logoInst}></Image>
        </CardBody>

        <CardFooter>
          <Text align='center' fontFamily='BreeSerif-Regular'> @xxxx</Text>
        </CardFooter>
     </Card>
    )
    
}




export default CardInst;