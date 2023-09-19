//menu lateral pro adm (dashboard)

import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { PesquisarSidebar } from "./PesquisarSidebar";
import { Navigation } from "./Navigation";



export const Sidebar = ({menuClicado, secaoAtiva, setSecaoAtiva}) => {
    return(
    <React.Fragment>
        <Box w='full'>
        <PesquisarSidebar menuClicado={menuClicado}/>
        <Divider/>
        <Navigation menuClicado={menuClicado} secaoAtiva={secaoAtiva} setSecaoAtiva={setSecaoAtiva}/>
        </Box>
    </React.Fragment>
    )
}

