import { Flex, Box, Text, Link as ChakraLink, List, ListItem, Icon, Button, VStack} from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineReport } from 'react-icons/md';
import {TbMessageReport} from 'react-icons/tb';
import {MdOutlineCommentsDisabled} from 'react-icons/md';
import {FiUserX} from 'react-icons/fi';

export const Navigation = ({menuClicado}) => {

    const links = [
        {label: 'Home', href: '/', icon: <AiOutlineHome/>},
        {label: 'Gestão de denúncias', href: '/', icon: <TbMessageReport/>},
        {label: 'Conteúdo reportado', href: '/', icon: <MdOutlineReport/>},
        {label: 'Comentários reportados', href: '/', icon: <MdOutlineCommentsDisabled/>},
        {label: 'Usuários reportados', href: '/', icon: <FiUserX/>}

    
    ];

    return(
        <Flex>
            <List>
                {links.map((link, index) => (
                    <ListItem key={index}>
                        <ChakraLink href={link.href}>
                            <Flex p={0} align='flex-start' justifyContent={menuClicado ? 'center' : 'normal'} >
                                <VStack spacing={2}  justifyContent={menuClicado ? 'center' : 'normal'}>
                                    <Button position='relative' variant='ghost'  w='full' _hover={{color: '#338bb0'}}>
                                    <Icon fontSize={24} transition='.4s ' color={menuClicado ? 'gray' : 'black'} _hover={{color: '#338bb0'}}> {link.icon}</Icon>
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

