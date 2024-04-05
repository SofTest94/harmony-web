'use client';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import ButtonCreate from '../atoms/ButtonLink';

interface Props {
  visible: boolean;
  onPressAccept?: () => void;
  onPressCancel?: () => void;
  acceptBtnName?: string;
  cancelBtnName?: string;
  title: string;
  message: string;
  children?: ReactNode;
}
const ModalMessage = ({
  visible,
  acceptBtnName,
  cancelBtnName,
  onPressAccept,
  onPressCancel,
  title,
  message,
  children,
}: Props) => {
  const showHideClassName = visible
    ? 'modal-overlay display-block'
    : 'modal-overlay display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        <div className="modal-message-content">
          <p className="modal-title">{title}</p>
          <p className="modal-message">{message}</p>
          {children}
          <div className="modal-actions">
            {onPressAccept && (
              <ButtonCreate
                btnName={acceptBtnName || 'Aceptar'}
                onClick={onPressAccept}
              />
            )}
            {onPressCancel && (
              <ButtonCreate
                btnName={cancelBtnName || 'Cancelar'}
                onClick={onPressCancel}
                secondary
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
