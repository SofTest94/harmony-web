'use client';

import LinkCreate from '@/components/atoms/LinkCreate';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SearchInput from '@/components/atoms/SearchInput';
import Table from '@/components/organisms/Table';
import Pagination from '@/components/organisms/Pagination';
import { employeeServices } from '@/services/employees/employees';
import { useSession } from 'next-auth/react';
import IconAdd from '@/icon/icon-add.svg';

const schema = yup.object().shape({
  search: yup.string().required('El campo de búsqueda es requerido'),
});

const columns = [
  { Header: 'Empleado', accessor: 'firstName' },
  { Header: 'Ingreso', accessor: 'created' },
  { Header: 'Rol', accessor: 'rol' },
  { Header: 'Sucursal', accessor: 'branchOfficeName' },
];

const Page = () => {
  const { data: session } = useSession();

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPage] = useState(1);

  const handleSearchChange = (searchTerm: string) => {
    if (data !== undefined) {
      const filtered_Items = data.filter((item: any) =>
        item.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filtered_Items);
      setCurrentPage(1);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    getCompanyUsers(page);
  };

  const getCompanyUsers = async (page: number) => {
    try {
      const data = await employeeServices.getByCompany(
        session?.company.id!,
        perPage,
        page,
        session?.accessToken!,
      );

      setData(data.employees);
      setFilteredData(data.employees);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session && session.accessToken) {
      getCompanyUsers(1);
    }
  }, [session]);

  return (
    <HeroLayout>
      <LayoutHeader title="Empleados">
        <LinkCreate
          href="/dashboard/employees/create"
          btnName="Crear empleado"
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
          </div>

          <Table
            columns={columns}
            data={filteredData}
            linkTr="/dashboard/employees/"
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </HeroLayout>
  );
};

export default Page;
