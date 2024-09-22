import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { roles } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';

interface AccessManagementData {
  id: number;
  name: string;
}
interface HandleApiRequestResponse {
  Data: AccessManagementData[];
}
const AccessManagement = () => {
  const router = useRouter();

  const { data, total, loading, handleApiRequest } =
    UseApi<HandleApiRequestResponse>('/access_control/roles/');
  const fields = [
    {
      label: 'نقش جدید',
      name: 'name',
      type: 'text',
    },
  ];

  const handleDelete = async (_: AccessManagementData, row: AccessManagementData) => {
    try {
      const res = await handleApiRequest(
        `/access_control/roles/permissions/delete/${row?.id}/`,
        'delete'
      );
      if (res) {
        handleApiRequest('/access_control/roles/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox
      title="مدیریت نقش و دسترسی"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={roles}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={roles}
        fields={fields}
        handleAdd={{ urlApi: '/access_control/roles/create/', fields: fields }}
        rows={data?.Data || []}
        notExtra
        buttons={[
          {
            label: 'مدیریت سطح دسترسی',
            type: 'allowAccess',
            onClick: (_, row) => {
              router.push({
                pathname: '/userManagement/accessManagement/accessLevelManagement',
                query: {
                  roleId: row.id,
                  name: row.name,
                },
              });
            },
          },
          {
            label: 'حذف نقش',
            type: 'delete',
            onClick: handleDelete,
          },
        ]}
      />
    </PageBox>
  );
};

export default AccessManagement;
