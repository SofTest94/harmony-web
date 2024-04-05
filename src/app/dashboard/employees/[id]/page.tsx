'use client';
import ButtonCreate from '@/components/atoms/ButtonLink';
import HeroLayout from '@/components/organisms/HeroLayout';
import LayoutHeader from '@/components/organisms/LayoutHeader';
import ModalMessage from '@/components/organisms/ModalMessage';
import EditEmployee from '@/components/pages/employees/EditEmployee';
import EmployeeCampaigns from '@/components/pages/employees/EmployeeCampaigns';
import { employeeServices } from '@/services/employees/employees';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [delete_modal_visible, setDeleteModalVisible] = React.useState(false);

  const handleDeleteEmployee = async () => {
    try {
      await employeeServices.deleteById(params.id, session?.accessToken!);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeroLayout>
      <LayoutHeader title="Perfil">
        <ButtonCreate
          btnName="Eliminar empleado"
          secondary
          onClick={() => setDeleteModalVisible(true)}
        />
      </LayoutHeader>

      <div className="layout-body">
        <div className="employees-details-main">
          <div className="employees-details-container">
            <div className="employees-details-profile">
              <EditEmployee employeeId={params.id} />
            </div>

            <div className="employees-details-campaign">
              <EmployeeCampaigns employeeId={params.id} />
            </div>
          </div>
        </div>
      </div>
      <ModalMessage
        visible={delete_modal_visible}
        title="Eliminar empleado"
        message={
          '¿Estás seguro que deseas eliminar los datos de tu empleado?\n\nEsta acción eliminará todos sus datos, pero el podrá acceder a sus análisis desde su perfil en la app Mediclar'
        }
        acceptBtnName="Eliminar empleado"
        cancelBtnName="Cancelar acción"
        onPressAccept={() => {
          setDeleteModalVisible(false);
          handleDeleteEmployee();
        }}
        onPressCancel={() => setDeleteModalVisible(false)}
      />
    </HeroLayout>
  );
};

export default Page;
