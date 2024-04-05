'use client';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import ButtonCreate from '../atoms/ButtonLink';
import Image from 'next/image';

interface Props {
  visible: boolean;
  onPressAccept: () => void;
  icon: any;
  acceptBtnName?: string;
  message: string;
}
const ModalIcon = ({
  visible,
  acceptBtnName,
  onPressAccept,
  icon,
  message,
}: Props) => {
  const showHideClassName = visible
    ? 'modal-overlay display-block'
    : 'modal-overlay display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        <div className="modal-icon-content">
          <Image src={icon} alt="icon" className="modal-icon" />
          <p className="modal-message">{message}</p>
          <ButtonCreate
            btnName={acceptBtnName || 'Aceptar'}
            onClick={onPressAccept}
            secondary
          />
        </div>
      </div>
    </div>
  );
};

export default ModalIcon;
