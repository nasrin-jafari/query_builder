import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import { logProfile } from '@/constants/tableHeaders';

interface UserData {
  profile_id: number;
  host: string;
  port: number;
  protocol: string;
}

interface HandleResponse {
  Data: UserData[];
}

const LogProfiles = () => {
  const { data, total, loading, handleApiRequest } = UseApi<HandleResponse>('/log_management/get/');

  const fields = [
    {
      label: 'هاست',
      name: 'host',
      type: 'text',
    },
    {
      label: 'پورت',
      name: 'port',
      type: 'text',
      col: 6,
    },

    {
      label: 'انتخاب پروتوکل',
      name: 'protocol',
      type: 'select',
      options: [
        {
          value: 'tcp',
          label: 'tcp',
        },
        {
          value: 'udp',
          label: 'udp',
        },
      ],
      col: 6,
    },
  ];

  const handleDelete = async (_: UserData, row: UserData) => {
    try {
      const res = await handleApiRequest(`/log_management/delete/${row?.profile_id}/`, 'delete');
      if (res) {
        await handleApiRequest('/log_management/get/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (editeData: UserData, row: UserData) => {
    try {
      const res = await handleApiRequest(`/log_management/update/${row.profile_id}/`, 'put', {
        host: editeData?.host,
        port: editeData?.port,
        protocol: editeData?.protocol,
      });
      if (res) {
        await handleApiRequest('/log_management/get/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox
      title="پروفایل رخدادها"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={logProfile}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={logProfile}
        rows={data?.Data || []}
        editForm={fields}
        fields={fields}
        // editState={setIsEdit}
        handleAdd={{ urlApi: '/log_management/create/', fields: fields }}
        notExtra
        buttons={[
          {
            label: 'حذف ',
            type: 'delete',
            onClick: handleDelete,
          },
          {
            label: 'ویرایش ',
            type: 'edit',
            onClick: handleEdit,
          },
        ]}
      />
    </PageBox>
  );
};

export default LogProfiles;
