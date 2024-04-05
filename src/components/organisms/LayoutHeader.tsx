'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const LayoutHeader = (props: any) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <div className="layout-header">
      <div>
        <div className="breadcrumbs-container">
          {pathNames.map((item, index) => {
            return (
              <div className="breadcrumb-item" key={index}>
                &nbsp;
                {item.charAt(0).toUpperCase() + item.slice(1)} /
              </div>
            );
          })}
        </div>
        <div className="header-title">{props.title}</div>
      </div>
      <div>{props?.children}</div>
    </div>
  );
};

export default LayoutHeader;
