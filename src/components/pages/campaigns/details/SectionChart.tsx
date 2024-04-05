'use client';

import React, { useEffect, useState } from 'react';

import * as yup from 'yup';
import { useSession } from 'next-auth/react';

import DoughnutChart from '@/components/organisms/DoughnutChart';

interface Props {
  data: any;
}

const SectionChart = ({ data }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
    }
  }, [session]);

  return (
    <>
      <p className="employees-details-title">Salud colaboradores</p>

      <div className="employees-create-form-container">
        <div className="center-section-chart">
          <div className="chart">
            <DoughnutChart
              p1={data.p1}
              p2={data.p2}
              p3={data.p3}
              width={data.width}
              height={data.height}
            />
          </div>

          <p>{'Aplicación: ' + data.date_application}</p>
          <br />
          <div className="employees-aplication">
            <div className="employees-applied" />
            Aplicados:{data.p1} %
          </div>
          <div className="employees-aplication">
            <div className="employees-missing" />
            Ausentes: {data.p2} %
          </div>
          <div className="employees-aplication">
            <div className="employees-failed" />
            Falló: {data.p3} %
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionChart;
