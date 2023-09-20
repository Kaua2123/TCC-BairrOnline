import { Flex, Box, Text, Link as ChakraLink, List, ListItem, Icon, Button, VStack} from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineReport } from 'react-icons/md';
import {TbMessageReport} from 'react-icons/tb';
import {MdOutlineCommentsDisabled} from 'react-icons/md';
import {FiUserX} from 'react-icons/fi';

export const Navigation = ({menuClicado, secaoAtiva, setSecaoAtiva}) => {

    const links = [
        {label: 'Home', name: 'home', href: '/', icon: <AiOutlineHome/>},
        {label: 'Gestão de denúncias', name: 'gestaoDenuncias', icon: <TbMessageReport/>},
        {label: 'Comentários reportados', name: 'comentariosReportados',  icon: <MdOutlineCommentsDisabled/>},
        {label: 'Usuários reportados', name: 'usuariosReportados', icon: <FiUserX/>}

    
    ];

    return(
        <Flex flexDirection='column' alignItems={menuClicado ? 'center' : 'flex-start'} transition='.8s'>
            <List>
                {links.map((link, index) => (
                    <ListItem key={index}>
                        <ChakraLink>
                            <Flex p={0} align='flex-start' justifyContent={menuClicado ? 'center' : 'normal'} >
                                <VStack spacing={2}>
                                    <Button position='relative' variant='ghost'  w='full' _hover={{color: '#338bb0'}} onClick={() => setSecaoAtiva(link.name)} >
                                    <Icon fontSize={24} transition='.4s ' mr={menuClicado ? '5px' : '10px'} color={menuClicado ? 'gray' : 'black'} _hover={{color: '#338bb0'}}> {link.icon}</Icon>
                                     <Text display={menuClicado ? 'none' : 'block'}>{link.label}</Text>        
                                    </Button>
                                </VStack>
                            </Flex>
                        </ChakraLink>
                    </ListItem>
                ))}
            </List>
            </Flex>
    )
}

