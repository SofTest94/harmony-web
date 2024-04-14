import React from 'react';
import Button from '../atoms/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { data_carrusel, imagesTexts } from '../../utils/utils';
import Section1 from '../Pages/Body/Section1';
import Section2 from '../Pages/Body/Section2';
import Section3 from '../Pages/Body/Section3';
import Section4 from '../Pages/Body/Section4';
import Section5 from '../Pages/Body/Section5';
import '../styles/HeaderStyles.scss';

const Body: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Body;
