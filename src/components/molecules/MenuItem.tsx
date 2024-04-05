'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
type MenuLink = {
  path: string;
  title: string;
  img: string;
  imgActive: string;
};

const MenuItem = (props: MenuLink) => {
  const paths = usePathname();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (paths == props.path) {
      setIsActive(true);
    }
  }, [paths, props.path]);

  const checkPath = () => {
    if (isActive) return 'menu-item-active';
    else return 'menu-item';
  };

  return (
    <Link href={props.path}>
      <div className={checkPath()}>
        <Image
          src={isActive ? props.imgActive : props.img}
          className="menu-icon"
          alt="icon"
        />
        <span className="menu-title">{props.title}</span>
      </div>
    </Link>
  );
};

export default MenuItem;
