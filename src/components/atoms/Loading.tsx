import React from 'react';
import LoadingAnim from '@/icon/loading-anim.svg';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="loading-spinner">
      <Image src={LoadingAnim} alt="" />
      <div className="loading-typing">
        <p>Cargando . . .</p>
      </div>
    </div>
  );
};

export default Loading;
