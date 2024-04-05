import { getListSummaryDetailsType } from '@/app/types/campaign.types';
import Table from '@/components/organisms/Table';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const columns = [
  { Header: 'Empleado', accessor: 'firstName' },
  { Header: 'Ingreso', accessor: 'createdAt' },
  { Header: 'Rol', accessor: 'rol' },
  { Header: 'Sucursal', accessor: 'branchOffice' },
];
interface Props {
  data: getListSummaryDetailsType;
}

const SectionSummary = ({ data }: Props) => {
  return (
    <>
      <p className="text-primary-blue-bold">Resumen de campaña</p>
      <br />
      {data[0] !== undefined && (
        <>
          <p>{data[0]?.branch_name}</p>
          <p>{data[0]?.campaign_name}</p>
          <p>{data[0]?.date_application}</p>
          <br />
          {data[0].is_analisys ? (
            data[0]?.exams.map((exam) => (
              <p key={exam._id}>- {exam.name.name}</p>
            ))
          ) : (
            <li>{data[0].exams.toString()}</li>
          )}
          <br />
          <p>
            <b>Precio por px:</b> {data[0]?.price_per_px}
          </p>
          <p>
            <b>Total de px:</b> {data[0]?.total_px}
          </p>
          <br />
          <p>
            <b>Total:</b> {data[0]?.total_to_pay}
          </p>
        </>
      )}
    </>
  );
};

export default SectionSummary;
