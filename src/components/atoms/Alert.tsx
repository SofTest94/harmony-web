/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import IconClose from '@/icon/icon-close.svg';
import Image from 'next/image';

type AlertType = {
  type: 'error' | 'success' | 'warning';
  message: any;
  delay?: number;
  onHide?: () => void;
};

const Alert = (props: AlertType) => {
  const { type, message } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message !== undefined) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        props.onHide && props.onHide();
      }, props.delay || 7000);
    }
  }, [message]);

  if (visible) {
    return (
      <div className={'alert-container ' + type}>
        <div className="alert-message">
          <p>{message}</p>
        </div>
        <Image
          src={IconClose}
          alt="X"
          onClick={() => {
            setVisible(false);
            props.onHide && props.onHide();
          }}
        />
      </div>
    );
  }

  return null;
};

export default Alert;
