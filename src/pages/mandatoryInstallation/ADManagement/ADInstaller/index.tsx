import { ConfirmationDialog, CustomDataGrid, CustomForm } from '@/components';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import { ad_computers } from '@/constants/tableHeaders';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface MandatoryInstallationData {
  id: string;
  name: string;
  domain_url: string;
  date_timestamp: number;
  status: string;
}

interface ListData {
  computers_list: string[];
  organizations_list: never[];
  action: string;
}

interface HandleApiRequestResponse {
  Data: MandatoryInstallationData[];
}

const ADInstaller = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { ADInstaller } = router.query;
  const [selectedRows, setSelectedRows] = useState<ListData | null>(null);

  const { data, total, loading, handleApiRequest } = UseApi<HandleApiRequestResponse>(
    `/active_directory/silent_installer/${ADInstaller}/`
  );

  const fields = [
    {
      id: 1,
      name: 'port',
      type: 'text',
      label: 'پورت',
      col: 4,
    },
    {
      id: 2,
      name: 'loghost_ip',
      type: 'text',
      label: 'آدرس Ip',
      col: 8,
    },
  ];

  // const formatedData = data?.Data?.map((agent: MandatoryInstallationData) => ({
  //     id: agent.name, // Ensure the id is included
  //     name: agent.name,
  //     status: agent.status,
  //     domain_url: agent.domain_url,
  //     date_timestamp: agent.date_timestamp,
  //   })) ?? [];

  const handleClickSelectedItem = async (actionType: string, selectedRows: string[]) => {
    setOpen(true);
    const newListData: ListData = {
      computers_list: selectedRows,
      organizations_list: [],
      action: actionType === 'uninstall' ? 'uninstall' : 'install',
    };
    setSelectedRows(newListData);
  };

  return (
    <PageBox
      title="مدیریت اکتیو دایرکتوری"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={ad_computers}
    >
      <CustomDataGrid
        selectableRows
        itemSelectRowParam="name"
        pageTotal={total}
        loading={loading}
        columns={ad_computers}
        rows={data?.Data || []}
        notExtra
        selectedRowsButtons={[
          {
            label: 'حذف نصب',
            actionType: 'uninstall',
          },
          {
            label: 'نصب',
            actionType: 'install',
          },
        ]}
        onAction={(actionType, selectedRows) => handleClickSelectedItem(actionType, selectedRows)}
      />
      <ConfirmationDialog
        open={open}
        title={'افزودن آیتم جدید'}
        content={
          <CustomForm
            allowAccess
            data={[]}
            fields={fields}
            onSubmit={async (formData) => {
              if (selectedRows) {
                const params = { ...selectedRows, ...formData };
                const res = await handleApiRequest(
                  `/active_directory/silent_installer/${ADInstaller}/`,
                  'post',
                  params
                );

                if (res) {
                  handleApiRequest(`/active_directory/silent_installer/${ADInstaller}/`, 'get');
                }
                setOpen(false);
              }
            }}
          />
        }
        onClose={() => setOpen(false)}
      />
    </PageBox>
  );
};

export default ADInstaller;
