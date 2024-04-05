'use client';

import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import React from 'react';
import ButtonCreate from '@/components/atoms/ButtonLink';
import { useRouter } from 'next/navigation';
import SingleRegister from '@/components/pages/branches/SingleRegister';
import MultipleRegister from '@/components/pages/branches/MultipleRegister';

const Page = () => {
  const router = useRouter();
  return (
    <HeroLayout>
      <LayoutHeader title="Agregar sucursal">
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
