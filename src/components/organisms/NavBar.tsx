'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import iconNotification from '@/icon/icon-notification.svg';
import iconArrowBottom from '@/icon/icon-arrow-bottom.svg';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const NavBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  return (
    <div className="navbar">
      <div className={`navbar-items ${expand && 'shadow'}`}>
        <div className="navbar-notify">
          <Image src={iconNotification} alt="icon notifications" />
        </div>

        <div className="info-profile">
          <button
            className="item-profile"
            onClick={() => {
              !expand ? setExpand(true) : setExpand(false);
            }}
          >
            <div className="photo-profile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={session?.company?.logo} alt="" />
            </div>
            <span className="name-company">{session?.company?.name}</span>
            <Image
              src={iconArrowBottom}
              alt="icon arrow"
              className="icon-arrow"
            />
          </button>

          {expand && (
            <>
              <button
                className="link-navbar"
                onClick={() => router.push('/dashboard/profile')}
              >
                <div />
                Perfil compañía
              </button>
              <button className="link-navbar" onClick={() => signOut()}>
                <div />
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
