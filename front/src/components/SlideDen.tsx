
import CardDen, { CardDenSimples, CardDenUsu } from "./CardDen";
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
import { useMediaQuery } from "@chakra-ui/react";
import CardTarefaGrande from "./CardTarefaGrande";



const SlideDen = ({denuncias}) => {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const slidesPerView = isSmallerThan768 ? 1 : 5;

    return(

        <Box h='auto' mt='20px' p='20px' bg='#F2F2F2' boxShadow='lg' w={{base: 'full', md: 'full'}}>

        <Swiper className="swiper-container" style={{padding: '20px'}} modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
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
             usuImg={denuncia.usu_img}
             denCod={denuncia.den_cod}
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

    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const slidesPerView = isSmallerThan768 ? 1 : 5;
    
    return(

        <Box h='auto' mt='20px' p='20px' boxShadow='lg' w={{base: 'full', md: 'full'}}>

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

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const slidesPerView = isSmallerThan768 ? 1 : 5;

      return (
        <Box h="auto" bg='white'  boxShadow="lg" w={{base: '80vw', md: 'full'}}>
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
                      denCod={denunciaExcluida.den_cod}
                    />
                  </SwiperSlide>
                </Box>
              ))}
            </Wrap>
          </Swiper>
        </Box>
      );

}

export const SlideDenAcompanhamento = ({ acompanhamentos }) => {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");


      return (
        <Box h='auto' mt='20px' p={1} bg='#F2F2F2' boxShadow='lg' w={{base: 'full', md: '90vw'}}>
          <Swiper
            
            className="swiper-container"
            style={{ padding: "20px" }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
          >
            <Wrap>
              {acompanhamentos.map((acompanhamento, index) => (
                <Box key={index}>
                  <SwiperSlide className="swiper-slide" key={acompanhamento.aco_num}>
                    <CardTarefaGrande
                      nome={acompanhamento.den_nome}
                      acoNum={acompanhamento.aco_num}
                    />
                  </SwiperSlide>
                </Box>
              ))}
            </Wrap>
          </Swiper>
        </Box>
      );

}

export const SlideDenAcompanhamentoConcluidos = ({ acompanhamentos }) => {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");


      return (
        <Box h='auto' mt='20px' p={1} bg='#F2F2F2' boxShadow='lg' w={{base: 'full', md: '90vw'}}>
          <Swiper
            
            className="swiper-container"
            style={{ padding: "20px" }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
          >
            <Wrap>
              {acompanhamentos.map((acompanhamento, index) => (
                <Box key={index}>
                  <SwiperSlide className="swiper-slide" key={acompanhamento.aco_num}>
                    <CardTarefaGrande
                      nome={acompanhamento.den_nome}
                      acoNum={acompanhamento.aco_num}
                    />
                  </SwiperSlide>
                </Box>
              ))}
            </Wrap>
          </Swiper>
        </Box>
      );

}

export const SlideDenSimples = ({ denuncias }) => {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const slidesPerView = isSmallerThan768 ? 1 : 5;

      return (
        <Box h="auto" bg='white'  boxShadow="lg" w={{base: '80vw', md: 'full'}}>
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
              {denuncias.map((denuncia, index) => (
                <Box key={index}>
                  <SwiperSlide className="swiper-slide" key={denuncia.den_cod}>
                    <CardDenSimples
                      nome={denuncia.den_nome}
                      descricao={denuncia.den_desc}
                      bairro={denuncia.den_bairro}
                      imagem={denuncia.den_img}
                      denCod={denuncia.den_cod}
                    />
                  </SwiperSlide>
                </Box>
              ))}
            </Wrap>
          </Swiper>
        </Box>
      );

}
