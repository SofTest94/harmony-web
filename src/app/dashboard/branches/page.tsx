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
import { branchesServices } from '@/services/branches/branches';
import LinkCreate from '@/components/atoms/LinkCreate';
import Image from 'next/image';

import Pagination from '@/components/organisms/Pagination';
import IconAdd from '@/icon/icon-add.svg';
import {
  getAllBranchesItemsType,
  getAllBranchesType,
} from '@/app/types/branches.types';
import { useSession } from 'next-auth/react';

const schema = yup.object().shape({
  search: yup.string().required('El campo de búsqueda es requerido'),
});

const Page = () => {
  const { data: session, status } = useSession();
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState<getAllBranchesType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<getAllBranchesItemsType[]>(
    [],
  );

  const fetchData = useCallback(
    async (pageNumber: number, idCompany: string, token: string) => {
      try {
        const response: getAllBranchesType =
          await branchesServices.getAllBranches(
            idCompany,
            token,
            pageNumber,
            itemsPerPage,
          );
        setFilteredData([]);
        await setData(response);
        if (response && response.items) {
          const modified_items_response = response.items.map((item) => {
            return { ...item, full_direction: '' };
          });
          setFilteredData(modified_items_response);
        }
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
  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [fetchData, currentPage]);

  const columns = [
    { Header: 'Sucursal', accessor: 'branchBTB_name' },
    { Header: 'Dirección', accessor: 'street' },
    { Header: 'Teléfono', accessor: 'telephone' },
  ];

  const handleSearchChange = (searchTerm: string): void => {
    if (data && data.items) {
      const filteredItems = data?.items.filter(
        (item: getAllBranchesItemsType) =>
          item.branchBTB_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (filteredItems) {
        setFilteredData(filteredItems);
      }
      setCurrentPage(currentPage);
    }
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <HeroLayout>
      <LayoutHeader title="Sucursales">
        <LinkCreate
          href="/dashboard/branches/create"
          btnName="Agregar sucursal"
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
