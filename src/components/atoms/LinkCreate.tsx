import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface Props {
  href: string;
  btnName: string;
  btnIcon?: any;
  secondary?: boolean;
}

const LinkCreate = (props: Props) => {
  return (
    <Link
      href={props.href}
      className={props.secondary ? 'button-secondary' : 'button-primary'}
    >
      {props.btnIcon && (
        <Image src={props.btnIcon} alt="icon" className="icon-add" />
      )}
      <div>{props.btnName}</div>
    </Link>
  );
};

export default LinkCreate;
