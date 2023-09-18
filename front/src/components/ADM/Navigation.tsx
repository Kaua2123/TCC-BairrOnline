import { Flex, Link, List, ListItem } from '@chakra-ui/react';


export const Navigation = () => {

    const links = [
        {label: 'kk', href: '/'},
        {label: 'kk', href: '/'},
        {label: 'kk', href: '/'}
    
    ];

    return(
        <Flex>
            <List>
                {links.map((link, index) => (
                    <ListItem key={index}>
                        <Link href={link.href}>{link.label}</Link>
                    </ListItem>
                ))}
            </List>
            </Flex>
    )
}

