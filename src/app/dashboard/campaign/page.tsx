'use client';
import SearchInput from '@/components/atoms/SearchInput';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import iconFilter from '@/icon/icon-filter.svg';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Table from '@/components/organisms/Table';
import { campaignServices } from '@/services/campaign/campaign';
import LinkCreate from '@/components/atoms/LinkCreate';
import Image from 'next/image';
import {
  getAllCampaignItemsType,
  getAllCampaignType,
} from '@/app/types/campaign.types';
import Pagination from '@/components/organisms/Pagination';
import IconAdd from '@/icon/icon-add.svg';
import { useSession } from 'next-auth/react';

const schema = yup.object().shape({
  search: yup.string().required('El campo de búsqueda es requerido'),
});

const Page = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: session, status } = useSession();
  const [data, setData] = useState<getAllCampaignType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<getAllCampaignItemsType[]>(
    [],
  );

  const fetchData = useCallback(
    async (pageNumber: number, idCompany: string, token: string) => {
      try {
        const response: getAllCampaignType =
          await campaignServices.getAllCampaign(
            idCompany,
            token,
            pageNumber,
            itemsPerPage,
          );
        setData(response);
        const modified_items_response = response.items.map((item) => {
          const uniqueBranchNames = [...new Set(item.branch_name)];
          const branchNamesString = uniqueBranchNames
            .join(', ')
            .replace(/, (?!.*, )/, ' y ');
          return { ...item, branch_name: branchNamesString };
        });
        setFilteredData(modified_items_response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [setData, setFilteredData, itemsPerPage],
  );

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session &&
      session.accessToken &&
      session.company?.id
    ) {
      fetchData(currentPage, session.company.id, session.accessToken);
    }
  }, [status, session, fetchData, currentPage]);

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Fecha de aplicación', accessor: 'application_date' },
    { Header: 'Sucursal', accessor: 'branch_name' },
  ];

  const handleSearchChange = (searchTerm: string): void => {
    const filteredItems = data?.items.filter((item: getAllCampaignItemsType) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (filteredItems) {
      setFilteredData(filteredItems);
    }
    setCurrentPage(currentPage);
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <HeroLayout>
      <LayoutHeader title="Campañas de salud">
        <LinkCreate
          href="campaign/create"
          btnName="Crear campaña"
          btnIcon={IconAdd}
        />
      </LayoutHeader>

      <div className="layout-body">
        <div className="table-container">
          <div className="table-header">
            <form>
              <SearchInput onChange={handleSearchChange} register={register} />
              {errors.search && <span>{errors.search.message}</span>}
            </form>
            <div className="table-filters">
              <button className="button-secondary">
                <Image src={iconFilter} alt="icon" />
                Filtros
              </button>
              <button className="button-secondary">Ordenar por</button>
            </div>
          </div>

          <Table
            columns={columns}
            data={filteredData}
            linkTr={'/dashboard/campaign/'}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
