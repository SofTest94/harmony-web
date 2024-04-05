'use client';

import SearchInput from '@/components/atoms/SearchInput';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import Pagination from '@/components/organisms/Pagination';
import LinkCreate from '@/components/atoms/LinkCreate';
import Table from '@/components/organisms/Table';
import IconAdd from '@/icon/icon-add.svg';
import Image from 'next/image';
import iconFilter from '@/icon/icon-filter.svg';
import React, { useState, useEffect, useCallback, use } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { challengeService } from '@/services/challenge/challenge';
import {
  getAllChallengesType,
  getAllChallengesItemsType,
} from '@/app/types/challenge.types';
import { useSession } from 'next-auth/react';
import { stat } from 'fs';

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
  const [data, setData] = useState<getAllChallengesType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState<getAllChallengesItemsType[]>(
    [],
  );

  const fetchData = useCallback(
    async (pageNumber: number, idCompany: string, token: string) => {
      try {
        const response: getAllChallengesType =
          await challengeService.getAllChallenges(
            idCompany,
            token,
            pageNumber,
            itemsPerPage,
          );
        setData(response);
        setFilteredData(response.data);
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
    { Header: 'Fecha de Inicio', accessor: 'startDate' },
    { Header: 'Estatus', accessor: 'status' },
  ];

  const handleSearchChange = (searchTerm: string): void => {
    const filteredItems = data?.data.filter((item: getAllChallengesItemsType) =>
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
      <LayoutHeader title="Retos de salud">
        <LinkCreate
          href="/dashboard/challenge/create"
          btnName="Crear Reto"
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

          <Table columns={columns} data={filteredData} />
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
