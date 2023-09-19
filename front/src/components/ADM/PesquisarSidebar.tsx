import {Box, Flex, Icon, IconButton, Text, Image, Input} from '@chakra-ui/react';
import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../../img/logo.svg'
import { useState } from 'react';



export const PesquisarSidebar = ({menuClicado}) => {
    const [pesquisando, setPesquisando] = useState(false)
    
    return(
    <Flex w='full' alignItems='center' justifyContent='space-between' flexDirection='row' gap={4}>
        <Box display='flex' alignItems='center' gap={2}>
            <Image src={Logo} align={menuClicado ? 'center' : 'block'} boxSize='60px'></Image>
            <Text display={menuClicado ? 'none' : 'block'} color='#338bb0' fontFamily='BreeSerif-Regular' fontSize={16}>
                BairrOnline
            </Text>
        </Box>

      
        <IconButton display={pesquisando ? 'none' : 'block' && menuClicado ? 'none' : 'block'} aria-label='pesquisa' variant='ghost' 
        icon={<AiOutlineSearch/>} fontSize={26} color='gray.400' borderRadius='50%' onClick={() => {
            setPesquisando(true);
        }}>

        </IconButton>
        
            <Input display={pesquisando ? 'block' : 'none'} type='text' 
            transition='width 2s ease-in-out'  
            w='36'
            transform={pesquisando ? 'scaleX(1)' : 'scaleX(0)'}
            onBlur={() => {
                setPesquisando(false);
            }}></Input>

    </Flex>
    )
}