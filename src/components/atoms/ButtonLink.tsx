import React from 'react';
import Image from 'next/image';

interface Props {
  btnName: string;
  btnIcon?: string;
  secondary?: boolean;
  onClick?: () => void;
}

const ButtonCreate = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.secondary ? 'button-secondary' : 'button-primary'}
    >
      {props.btnIcon && (
        <Image src={props.btnIcon} alt="icon" className="icon-add" />
      )}
      <div>{props.btnName}</div>
    </button>
  );
};

export default ButtonCreate;
