import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Table from '@/components/organisms/Table';
import HeaderSteper from '@/components/molecules/HeaderSteper';
import SearchInput from '@/components/atoms/SearchInput';
import Image from 'next/image';
import iconFilter from '@/icon/icon-filter.svg';
import {
  getListUsersForCompanyAndBranchType,
  getListBranchesForCompanyType,
  itemsListUsers,
  getListEmployeeDetailsType,
  itemsListEmployeeDetails,
} from '@/app/types/campaign.types';
import { campaignServices } from '@/services/campaign/campaign';
import Pagination from '@/components/organisms/Pagination';
import { useSession } from 'next-auth/react';

type Props = {
  idCampaign: string;
};

const SectionListEmployees: React.FC<Props> = ({ idCampaign }) => {
  const { data: session } = useSession();
  const [showError, setShowError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [employees, setEmployees] = useState<itemsListEmployeeDetails>([]);
  const [selectedEmployees, setSelectedEmployees] =
    useState<itemsListEmployeeDetails>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [branchData, setBranchData] = useState<getListBranchesForCompanyType>(
    [],
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(
    '',
  );

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session && session.accessToken) {
      const fetchData = async () => {
        try {
          // Obtener los datos de las sucursales
          const branches_data: getListBranchesForCompanyType =
            await campaignServices.getListBranchesForCompany(
              session?.company.id!,
              session?.accessToken!,
            );
          setBranchData(branches_data);

          // Establecer el branch_id predeterminado como el primer elemento
          if (branches_data.length > 0) {
            const default_branch_id = branches_data[0]._id;
            setSelectedBranchId(default_branch_id);
            // Cargar los datos de los empleados para la sucursal predeterminada
            await fetchEmployeeData(idCampaign);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [session]);

  useEffect(() => {
    if (idCampaign) {
      // Cuando se selecciona una sucursal, cargar los datos de los empleados
      fetchEmployeeData(idCampaign);
    }
  }, [idCampaign, currentPage]);

  const fetchEmployeeData = async (branchId: string) => {
    try {
      const employee_data: getListEmployeeDetailsType =
        await campaignServices.getEmployeeForIdCampaign(
          idCampaign,
          session?.accessToken!,
          currentPage,
        );

      if (employee_data) {
        const updated_employees = employee_data.items.map((employee) => ({
          ...employee,
          fullName: `${employee.firstName} ${employee.middleName} ${employee.lastName}`,
        }));

        setEmployees(updated_employees);
        setTotalPages(employee_data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const onSubmit = () => {
    if (selectedEmployees.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSelectedEmployeesChange = (employeeId: string) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      const employee_index = prevSelectedEmployees.findIndex(
        (employee) => employee._id === employeeId,
      );
      if (employee_index !== -1) {
        // Si el empleado ya está seleccionado, lo eliminamos del array
        const updated_employees = [
          ...prevSelectedEmployees.slice(0, employee_index),
          ...prevSelectedEmployees.slice(employee_index + 1),
        ];
        return updated_employees;
      } else {
        // Si el empleado no está seleccionado, lo agregamos al array
        const selected_employee = employees.find(
          (employee) => employee._id === employeeId,
        );
        if (selected_employee) {
          return [...prevSelectedEmployees, selected_employee];
        } else {
          return prevSelectedEmployees;
        }
      }
    });
  };

  const toggleAllEmployeesSelection = () => {
    setSelectedEmployees((prevSelectedEmployees) =>
      prevSelectedEmployees.length === employees.length ? [] : employees,
    );
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const current_employees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Al cambiar de página, se debe volver a obtener los datos de los empleados
    fetchEmployeeData(idCampaign);
  };

  const handleFormSubmit = (data: any, e: any) => {
    if (e.nativeEvent.submitter.name === 'submit-button') {
      onSubmit();
    }
  };
  const handleDownloadButtonClick = () => {
    const selectedEmployeeIds = selectedEmployees.map(
      (employee) => employee._id,
    );
    console.log('IDs de empleados seleccionados:', selectedEmployeeIds);
  };

  return (
    <>
      <div className="form-control ">
        <form
          className="form-control"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div className="table-container">
            <div className="table-header">
              <SearchInput onChange={handleSearchChange} register={{}} />
              <div className="table-filters">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => {
                    console.log('Filtros!!');
                  }}
                >
                  <Image src={iconFilter} alt="icon" />
                  Filtros
                </button>
                <button
                  className="button-secondary"
                  type="button"
                  onClick={() => {
                    console.log('Ordenar por!!');
                  }}
                >
                  Ordenar por
                </button>
                <button
                  className="button-primary"
                  type="button"
                  onClick={handleDownloadButtonClick}
                >
                  Descargar reporte
                </button>
              </div>
            </div>
            <Table
              columns={[{ Header: 'Empleado', accessor: 'fullName' }]}
              data={current_employees}
              handleEmployeeSelectionChange={handleSelectedEmployeesChange}
              toggleAllEmployeesSelection={toggleAllEmployeesSelection}
              selectedEmployees={selectedEmployees.map(
                (employee) => employee._id,
              )}
            />

            {showError && <p>Seleccione al menos un empleado.</p>}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SectionListEmployees;
