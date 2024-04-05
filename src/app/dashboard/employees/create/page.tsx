'use client';

import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import MultipleRegister from '@/components/pages/employees/MultipleRegister';
import SingleRegister from '@/components/pages/employees/SingleRegister';
import React from 'react';
import ButtonCreate from '@/components/atoms/ButtonLink';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <HeroLayout>
      <LayoutHeader title="Empleados">
        <ButtonCreate
          btnName="Regresar"
          secondary
          onClick={() => router.back()}
        />
      </LayoutHeader>

      <div className="layout-body">
        <div className="employees-create-main">
          <div className="employees-create-container">
            <div className="employees-create-section">
              <SingleRegister />
            </div>
            <div className="employees-create-section">
              <MultipleRegister />
            </div>
          </div>
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
