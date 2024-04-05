'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonCreate from '@/components/atoms/ButtonLink';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import Table from '@/components/organisms/Table';
import SectionChart from '@/components/pages/campaigns/details/SectionChart';
import SectionListEmployees from '@/components/pages/campaigns/details/SectionListEmployees';
import SectionSummary from '@/components/pages/campaigns/details/SectionSummary';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  getAllBranchesItemsType,
  getAllBranchesType,
} from '@/app/types/branches.types';

import { branchesServices } from '@/services/branches/branches';
import { campaignServices } from '@/services/campaign/campaign';
import {
  getListEmployeeDetailsType,
  getListSummaryDetailsType,
  itemsListEmployeeDetails,
  itemsListUsers,
} from '@/app/types/campaign.types';

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<getListEmployeeDetailsType>();
  const [dataChart, setDataChart] = useState<any>(null); // Estado para almacenar los datos del gráfico
  const [itemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState<itemsListEmployeeDetails[]>(
    [],
  );

  const [filteredSummaryData, setFilteredSummaryData] =
    useState<getListSummaryDetailsType>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const data_chart = {
    p1: 75,
    p2: 20,
    p3: 5,
    width: '100%',
    height: 123,
    date_application: '13/01/2024',
  };
  const columns = [{ Header: 'Empleado', accessor: 'firstName' }];

  const getAllDataEmployee = async (pageNumber: number) => {
    const response: getListEmployeeDetailsType =
      await campaignServices.getEmployeeForIdCampaign(
        params.id,
        session?.accessToken!,
        pageNumber,
      );
    setFilteredData([]);
    await setData(response);
    if (response && response.items) {
      const modified_items_response: any = response.items.map((item) => {
        return { ...item, full_direction: '' };
      });
      setFilteredData(modified_items_response);
    }
  };

  const getAllDataSummary = async () => {
    const response: getListSummaryDetailsType =
      await campaignServices.getDetailsForId(params.id, session?.accessToken!);
    if (response) {
      setFilteredSummaryData(response);
    }
  };
  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        //
        getAllDataEmployee(pageNumber);
        getAllDataSummary();
        setDataChart(data_chart);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [setData, setFilteredData, itemsPerPage],
  );

  useEffect(() => {
    if (session && session.accessToken) {
      fetchData(currentPage);
    }
  }, [fetchData, currentPage, session]);
  return (
    <HeroLayout>
      <LayoutHeader title="Salud colaboradores">
        <ButtonCreate
          btnName="Regresar"
          secondary
          onClick={() => router.back()}
        />
      </LayoutHeader>

      <div className="layout-body">
        <div className="employees-details-main">
          <div className="employees-details-container">
            <div className="employees-details-profile">
              {dataChart && <SectionChart data={dataChart} />}
            </div>

            <div className="employees-details-campaign">
              {filteredSummaryData && (
                <SectionSummary data={filteredSummaryData} />
              )}
            </div>
          </div>
          <SectionListEmployees idCampaign={params.id} />
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
