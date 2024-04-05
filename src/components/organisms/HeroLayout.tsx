'use client';
import React from 'react';
import SideBar from '@/components/organisms/SideBar';
import NavBar from '@/components/organisms/NavBar';
import AuthProvider from '../providers/AuthProvider';

const HeroLayout = (props: any) => {
  return (
    <AuthProvider>
      <div className="hero-layout">
        <SideBar />
        <div className="main-body">
          <NavBar />
          <div className="layout-content">{props.children}</div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default HeroLayout;
