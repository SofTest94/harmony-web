'use client';

import SearchInput from '@/components/atoms/SearchInput';
import Pagination from '@/components/organisms/Pagination';
import Table from '@/components/organisms/Table';
import { employeeServices } from '@/services/employees/employees';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  search: yup.string().required('El campo de búsqueda es requerido'),
});

const columns = [
  { Header: 'Campaña', accessor: 'campaignName' },
  { Header: 'Sucursal', accessor: 'branchName' },
  { Header: 'Fecha aplicación', accessor: 'campaignDate' },
];

interface Props {
  employeeId: string;
}

const EmployeeCampaigns = ({ employeeId }: Props) => {
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
    getEmployeeCampaigns(page);
  };

  const getEmployeeCampaigns = async (page: number) => {
    try {
      const data = await employeeServices.getCampaigns(
        employeeId,
        perPage,
        page,
        session?.accessToken!,
      );

      setData(data.campaigns);
      setFilteredData(data.campaigns);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session && session.accessToken) {
      getEmployeeCampaigns(1);
    }
  }, [session]);

  return (
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
        linkTr="/dashboard/campaign/"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default EmployeeCampaigns;
