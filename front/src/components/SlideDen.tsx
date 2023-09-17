
import CardDen, { CardDenUsu } from "./CardDen";
import CardDenExcluida from "./CardDenExcluida";


//react-swiper pros slides de denuncia
import { Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {useState, useEffect} from 'react';
import axios from 'axios';

//chakra
import { Box, Wrap, WrapItem } from '@chakra-ui/react'




const SlideDen = ({denuncias}) => {

    const [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 768 ? 1 : 5);
    useEffect(() => {
        const resize = () => {
            setSlidesPerView(window.innerWidth < 768 ? 1 : 5);
        };

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return(

        <Box h='auto' mt='20px' p='20px' bg='#F2F2F2' boxShadow='lg' >

        <Swiper className="swiper-container" style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        navigation
        pagination={{clickable: true}}>

       <Wrap>
       {denuncias.map((denuncia, index) => (
            <Box key={index}>
            <SwiperSlide className='swiper-slide' key={denuncia.den_cod}>
             <CardDen
             nome={denuncia.den_nome}
             descricao={denuncia.den_desc}
             bairro={denuncia.den_bairro}
             imagem={denuncia.den_img}
             usuNome={denuncia.usu_nome}
             />
            </SwiperSlide>
            </Box>
        ))}

       </Wrap>
        </Swiper>

</Box>
    )
}

export default SlideDen;


export const SlideDenUsu = ({denuncias}) => {

    const [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 768 ? 1 : 5);
    useEffect(() => {
        const resize = () => {
            setSlidesPerView(window.innerWidth < 768 ? 2 : 5);
        };

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);


    return(

        <Box h='auto' mt='20px' p='20px' boxShadow='lg'>

        <Swiper className="swiper-container" style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        navigation
        pagination={{clickable: true}}>


        {denuncias.map((denuncia, index) => (
            <Box key={index}>
            <SwiperSlide className='swiper-slide'  key={denuncia.den_cod}>
             <CardDenUsu
             nome={denuncia.den_nome}
             descricao={denuncia.den_desc}
             data={denuncia.den_data}
             imagem={denuncia.den_img}
             bairro={denuncia.den_bairro}
             denCod={denuncia.den_cod}/>
            </SwiperSlide>
            </Box>
        ))}



        </Swiper>


</Box>
    )
}

export const SlideDenExcluida = ({ denunciasExcluidas }) => {
    const [slidesPerView, setSlidesPerView] = useState(
        window.innerWidth < 768 ? 1 : 5
      );

      useEffect(() => {
        const resize = () => {
          setSlidesPerView(window.innerWidth < 768 ? 1 : 5);
        };

        window.addEventListener("resize", resize);

        return () => {
          window.removeEventListener("resize", resize);
        };
      }, []);

      return (
        <Box h="auto" bg='white'  boxShadow="lg">
          <Swiper
            className="swiper-container"
            style={{ padding: "20px" }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true }}
          >
            <Wrap>
              {denunciasExcluidas.map((denunciaExcluida, index) => (
                <Box key={index}>
                  <SwiperSlide className="swiper-slide" key={denunciaExcluida.den_cod}>
                    <CardDenExcluida
                      nome={denunciaExcluida.den_nome}
                      descricao={denunciaExcluida.den_desc}
                      bairro={denunciaExcluida.den_bairro}
                      imagem={denunciaExcluida.den_img}
                      dataExclusao={denunciaExcluida.den_data_exclusao}
                    />
                  </SwiperSlide>
                </Box>
              ))}
            </Wrap>
          </Swiper>
        </Box>
      );

}
