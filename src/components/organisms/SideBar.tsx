'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import iconLogoMediclar from '@/image/logo.svg';
import iconIsoMediclar from '@/image/isotype.svg';
import iconArrowLeft from '@/icon/arrow-left.svg';
import iconArrowRight from '@/icon/arrow-right.svg';
import iconHome from '@/icon/home.svg';
import iconHomeActive from '@/icon/home-active.svg';
import iconHealth from '@/icon/icon-health.svg';
import iconHealthActive from '@/icon/icon-health-active.svg';
import iconEmployee from '@/icon/icon-employee.svg';
import iconEmployeeActive from '@/icon/icon-employee-active.svg';
import iconEmployees from '@/icon/icon-employees.svg';
import iconEmployeesActive from '@/icon/icon-employees-active.svg';

import iconChallenge from '@/icon/icon-challenge.svg';
import iconChallengeActive from '@/icon/icon-challenge-active.svg';

import MenuItem from '@/components/molecules/MenuItem';

const SideBar = () => {
  const [expand, setExpand] = useState('');
  useEffect(() => {
    if (window) {
      const storage = localStorage.getItem('expand') || 'true';
      setExpand(storage);
    }
  }, []);

  const isExpand = () => {
    if (expand == 'true') {
      setExpand('false');
      window.localStorage.setItem('expand', 'false');
    } else if (expand == 'false') {
      setExpand('true');
      window.localStorage.setItem('expand', 'true');
    }
  };

  return (
    <div className={`sidebar${expand == 'false' ? '-collapsed' : ''}`}>
      <div className="sidebar-header">
        {expand == 'true' ? (
          <Image
            src={iconLogoMediclar}
            className="img-logo"
            alt="logo Mediclar"
            priority
          />
        ) : (
          <Image
            src={iconIsoMediclar}
            className="img-iso"
            alt="iso Mediclar"
            priority
          />
        )}

        <button onClick={isExpand}>
          <Image
            src={expand == 'true' ? iconArrowLeft : iconArrowRight}
            className="img-arrow"
            alt="arrow"
          />
        </button>
      </div>

      <div className="menu-container">
        <MenuItem
          path="/dashboard"
          img={iconHome}
          imgActive={iconHomeActive}
          title="Inicio"
        />

        <MenuItem
          path="/dashboard/profile"
          img={iconEmployee}
          imgActive={iconEmployeeActive}
          title="Perfil organización"
        />
        <MenuItem
          path="/dashboard/employees"
          img={iconEmployees}
          imgActive={iconEmployeesActive}
          title="Empleados"
        />

        <MenuItem
          path="/dashboard/campaign"
          img={iconHealth}
          imgActive={iconHealthActive}
          title="Campañas"
        />
        <MenuItem
          path="/dashboard/branches"
          img={iconHealth}
          imgActive={iconHealthActive}
          title="Sucursales"
        />
        <MenuItem
          path="/dashboard/challenge"
          img={iconChallenge}
          imgActive={iconChallengeActive}
          title="Retos de salud"
        />
      </div>
    </div>
  );
};

export default SideBar;
