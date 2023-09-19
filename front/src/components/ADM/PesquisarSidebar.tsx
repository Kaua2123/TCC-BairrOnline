import {Box, Flex, Icon, IconButton, Text, Image, Input} from '@chakra-ui/react';
import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../../img/logo.svg'
import { useState } from 'react';



export const PesquisarSidebar = () => {
    const [pesquisando, setPesquisando] = useState(false);
    
    return(
    <Flex w='full' alignItems='center' justifyContent='space-between' flexDirection='row' gap={4}>
        <Box display='flex' alignItems='center' gap={2}>
            <Image src={Logo} boxSize={20}></Image>
            <Text color='#338bb0' fontFamily='BreeSerif-Regular' fontSize={16}>
                BairrOnline
            </Text>
        </Box>

        {!pesquisando && (
            <IconButton aria-label='pesquisa' variant='ghost' 
        icon={<AiOutlineSearch/>} fontSize={26} color='gray.400' borderRadius='50%' onClick={() => {
            setPesquisando(true);
        }}>

        </IconButton>
        )}

        
        {pesquisando && (
            <Input type='text' transition='2s' w={40}></Input>
        )}
    </Flex>
    )
}