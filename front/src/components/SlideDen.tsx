
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



const SlideDen = () => {
    return(
        
        <Box h='auto' mt='20px' p='20px' bg='#F2F2F2' boxShadow='lg'>

        <Swiper style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{clickable: true}}>

       <Wrap>
        <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>

       <WrapItem>
       <SwiperSlide><CardDen/></SwiperSlide>
       </WrapItem>
       
       </Wrap>
        </Swiper>
{/* as denuncias da home n tem mais comentarios diretamente nelas agora, tem um botao
ver denuncia q vai pra pagina de ver denuncias do gabriel, e lá vai ter a exibição da denuncia
que foi clicada e de outras se o cara quiser filtrar. lá vai ter os comentarioszin */}

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
             <CardDenUsu nome={denuncia.den_nome} descricao={denuncia.den_desc}/>
            </SwiperSlide>
            </WrapItem>
        ))}
       


       </Wrap>
        </Swiper>
{/* as denuncias da home n tem mais comentarios diretamente nelas agora, tem um botao
ver denuncia q vai pra pagina de ver denuncias do gabriel, e lá vai ter a exibição da denuncia
que foi clicada e de outras se o cara quiser filtrar. lá vai ter os comentarioszin */}

</Box>
    )
}