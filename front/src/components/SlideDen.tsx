
import CardDen, { CardDenUsu } from "./CardDen";



//react-swiper pros slides de denuncia
import { Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


//chakra
import { Box, Wrap, WrapItem } from '@chakra-ui/react'



const SlideDen = ({denuncias}) => {
    return(
        
        <Box h='auto' mt='20px' p='20px' bg='#F2F2F2' boxShadow='lg'>

        <Swiper style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{clickable: true}}>

       <Wrap>
       {denuncias.map((denuncia, index) => (
            <WrapItem key={index}>
            <SwiperSlide key={denuncia.den_cod}>
             <CardDen nome={denuncia.den_nome} descricao={denuncia.den_desc} bairro={denuncia.den_bairro}/>
            </SwiperSlide>
            </WrapItem>
        ))}
       
       </Wrap>
        </Swiper>

</Box>
    )
}

export default SlideDen;


export const SlideDenUsu = ({denuncias}) => {
    return(
        
        <Box h='auto' mt='20px' p='20px' boxShadow='lg'>

        <Swiper style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{clickable: true}}>

       <Wrap>
        {denuncias.map((denuncia, index) => (
            <WrapItem key={index}>
            <SwiperSlide key={denuncia.den_cod}>
             <CardDenUsu 
             nome={denuncia.den_nome} 
             descricao={denuncia.den_desc} 
             data={denuncia.den_data} 
             imagem={denuncia.den_img} 
             bairro={denuncia.den_bairro}
             denCod={denuncia.den_cod}/>
            </SwiperSlide>
            </WrapItem>
        ))}
       


       </Wrap>
        </Swiper>


</Box>
    )
}