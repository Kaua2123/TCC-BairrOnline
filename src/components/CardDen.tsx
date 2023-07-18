import {Card, CardBody, Center, Stack, Heading, Divider, CardFooter, Button, Image, Text } from "@chakra-ui/react";
import Comentarios from "../pages/Comentarios";
import img2 from '../img/aguaEstancada.png';
import {useState} from 'react';

import { BsChatSquareText } from 'react-icons/bs'

const CardDen = () => {
    const [openCom, setOpenCom] = useState(false);

return(

        <Card  maxW='sm' w='250px' bgColor='gray.100' align='center' border='1px solid gray' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
            <CardBody>
                <Center>
                    <Image src={img2} borderRadius='lg' width='200px'/>
                </Center>
                    <Stack mt='6' spacing='3'>  
                        <Heading size='md'>Muinto lixo.</Heading>
                            <Text>
                            “muito lixo kkkkkk mdsssss so jogar na latinha mano tlgddddd”
                            </Text>
                    </Stack>
                    {/* esses cards tao com conteúdo só de exemplo, mas na real eles tem q ser vazios, pois é 
                    o usuario que define o titulo, texto, imagem da denuncia */}
            </CardBody>
        <Divider/>
            <CardFooter>
                <Button
                leftIcon={<BsChatSquareText/>}
                 bgColor='#338BB0'
                color='white'
                _hover={{background: '#fff', color:'#338BB0'}}
                onClick={() => {setOpenCom(true)}}>
            <Comentarios 
            isOpen={openCom} 
            setCloseCom = {() => {setOpenCom(!openCom)}}>
            </Comentarios>
            Abrir comentários
        </Button>
            
        </CardFooter>
    </Card>

   

);

}

export default CardDen;