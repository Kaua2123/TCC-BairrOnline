//menu lateral pro adm (dashboard)

import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { PesquisarSidebar } from "./PesquisarSidebar";
import { Navigation } from "./Navigation";
import FooterSidebar from "./FooterSidebar";


export const Sidebar = ({menuClicado}) => {
    return(
    <React.Fragment>
        <Box w='full'>
        <PesquisarSidebar menuClicado={menuClicado}/>
        <Divider/>
        <Navigation menuClicado={menuClicado}/>
        </Box>
    </React.Fragment>
    )
}

