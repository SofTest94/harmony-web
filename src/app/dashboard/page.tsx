'use client';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import Image from 'next/image';
import React from 'react';
import NotStats from '@/icon/stats.svg';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <HeroLayout>
      <LayoutHeader title="Bienvenido a Mediclar empresas" />
      <div className="layout-body">
        <div className="table-container">
          <h2 className="subtitle-primary-blue">Resumen</h2>

          <div className="cards-container">
            <div className="cards-dashboard">
              <div className="cards-title">Campañas activas</div>
              <div className="cards-stats">0</div>
              <button
                onClick={() => router.push('/dashboard/campaign/create')}
                className="button-secondary"
                style={{ margin: 'auto' }}
              >
                Crear campaña
              </button>
            </div>

            <div className="cards-dashboard">
              <div className="cards-title">Retos activos</div>
              <div className="cards-stats">0</div>
              <button
                onClick={() => router.push('/dashboard/challenge/create')}
                className="button-secondary"
                style={{ margin: 'auto' }}
              >
                Crear reto
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="table-container">
          <h2 className="subtitle-primary-blue">Estadística</h2>

          <Image src={NotStats} alt="" style={{ margin: '2rem auto' }} />
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
