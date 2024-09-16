import { ConfirmationDialog, CustomDataGrid, CustomForm } from '@/components';
import PageBox from '@/components/common/PageBox';
import { FormData } from '@/components/form/CustomForm';
import { update_history } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import LastUpdate from '@/sections/settings/systemUpdate/LastUpdate';
import { Grid } from '@mui/material';
import { useState } from 'react';

interface SystemUpdateData {
  host: string;
  port: string;
  fileserver_type: string;
  username: string;
  status: string;
}

interface HandleApiRequestResponse {
  Data: SystemUpdateData[];
}

const SystemUpdate = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SystemUpdateData | null>(null);

  const { data = [], handleApiRequest } = UseApi<SystemUpdateData[]>('/updater/');
  const {
    data: historyData,
    total,
    loading,
  } = UseApi<HandleApiRequestResponse>('/updater/history/');

  const fields = [
    { label: 'آدرس سرور بروزرسان', name: 'host', type: 'text', col: 12 },
    {
      label: 'انتخاب پروتکل',
      name: 'fileserver_type',
      type: 'select',
      options: [
        { label: 'FTP', value: 'FTP' },
        { label: 'SFTP', value: 'SFTP' },
      ],
      col: 6,
    },
    { label: 'وارد کردن پورت', name: 'port', type: 'text', col: 6 },
    {
      label: 'نام کاربری',
      name: 'username',
      type: 'text',
      placeholder: 'نام کاربری سرور را وارد کنید',
      col: 6,
    },
    {
      label: 'رمز عبور',
      name: 'password',
      type: 'password',
      placeholder: 'رمز عبور سرور را وارد کنید',
      col: 6,
    },
  ];

  const handleForm = async (formData: FormData) => {
    try {
      let res;

      if (selectedItem) {
        res = await handleApiRequest(`/updater/edit/${formData.host}/`, 'patch', formData);
        setSelectedItem(null);
      } else {
        res = await handleApiRequest('/updater/', 'post', formData);
      }

      if (res) {
        await handleApiRequest('/updater/');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  const openConfirmationDialog = (item: SystemUpdateData) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const closeConfirmationDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        await handleApiRequest(`/updater/delete/${selectedItem.host}/`, 'delete');
        await handleApiRequest('/updater/'); // Refresh data after deletion
        closeConfirmationDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PageBox title="بروزرسانی سامانه" searchQuery={update_history}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <CustomForm
            fields={fields}
            data={selectedItem}
            onSubmit={handleForm}
            widthButton="20%"
            txtButton={selectedItem ? 'ویرایش' : 'افزودن'}
          />
        </Grid>
      </Grid>
      <LastUpdate
        data={data || []}
        setSelectedItem={setSelectedItem}
        openConfirmationDialog={openConfirmationDialog}
      />
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={update_history}
        rows={historyData?.Data || []}
        notExtra
      />
      <ConfirmationDialog
        open={openDialog}
        title="تأیید حذف"
        content="آیا از حذف این مورد اطمینان دارید؟"
        onConfirm={handleDelete}
        onClose={closeConfirmationDialog}
        type="delete"
      />
    </PageBox>
  );
};

export default SystemUpdate;
