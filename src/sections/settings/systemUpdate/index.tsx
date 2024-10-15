import { ConfirmationDialog, CustomDataGrid, CustomForm } from '@/components';
import PageBox from '@/components/common/PageBox';
import { FormData } from '@/components/form/CustomForm';
import { update_history } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosMethod from '@/api';
import CardBox from '@/layout/CardBox';
import CustomStepper from '@/sections/settings/systemUpdate/CustomStepper';
import LastUpdate from '@/sections/settings/systemUpdate/LastUpdate';
import { MdVisibility } from 'react-icons/md';

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
interface StepData {
  step: string;
  status: 'completed' | 'pending' | 'failed';
  message: string;
}

const SystemUpdate = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SystemUpdateData | null>(null);
  const [stepper, setSteppr] = useState<StepData[]>([]);
  const [fetchSteperEnabled, setFetchSteperEnabled] = useState(false);

  const [open, setOpen] = useState(false);
  const [dataStepper, setDataStepper] = useState<StepData[]>([]);

  const theme = useTheme();
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
  //stepper
  const fetchUpdateSteper = async () => {
    try {
      const response = await axiosMethod({
        method: 'GET',
        url: `/updater/stepper/`,
        params: {},
        data: {},
        headers: {},
      });
      const dataOfStepper = response?.data?.data;
      setSteppr(dataOfStepper);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchUpdateSteper = () => {
    fetchUpdateSteper();
    setFetchSteperEnabled(true);
  };

  useEffect(() => {
    let interval: any;

    if (fetchSteperEnabled && stepper?.length > 1) {
      interval = setInterval(() => {
        fetchUpdateSteper();
      }, 5000);

      const status = stepper?.findLast((item: StepData) => item.status);
      if (status && status?.status !== 'pending') {
        clearInterval(interval);
        setFetchSteperEnabled(false);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [fetchSteperEnabled, stepper]);
  const fieldsUpdate = [
    {
      label: 'وارد کردن مسیر',
      name: 'file_path',
      type: 'text',
      col: 12,
    },
  ];

  const handleUpdateSubmit = async (data: FormData) => {
    setOpen(false);
    try {
      await axiosMethod({ method: 'POST', url: '/updater/upgrade/', data });
    } catch (error) {
      console.log(error);
    }
  };
  const formatedData =
    historyData?.Data?.map((item) => ({
      ...item,
      status: item.status ? 'فعال' : 'غیرفعال',
    })) ?? [];
  return (
    <>
      <ConfirmationDialog
        open={open}
        title="به روزرسانی"
        content={
          <CustomForm
            allowAccess={true}
            fields={fieldsUpdate}
            onSubmit={handleUpdateSubmit}
            txtButton={' اعمال تغییرات'}
          />
        }
        onClose={() => setOpen(false)}
      />

      <ConfirmationDialog
        open={!!dataStepper.length}
        title="مراحل به روز رسانی"
        maxWidth={'md'}
        content={
          <Box sx={{ padding: 6 }}>
            <CustomStepper stepperData={dataStepper} />
          </Box>
        }
        onClose={() => setDataStepper([])}
      />
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
        <CardBox
          sx={{
            display: 'flex',
            background: theme.palette.grey[100],
            padding: '28px 10px',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" size={'small'} onClick={() => setOpen(true)}>
              به روزرسانی
            </Button>
            <Button variant="contained" size={'small'} onClick={handleFetchUpdateSteper}>
              جزییات مراحل
            </Button>
          </Box>
          <CustomStepper stepperData={stepper} />
        </CardBox>

        <CustomDataGrid
          pageTotal={total}
          loading={loading}
          columns={update_history}
          rows={formatedData}
          notExtra
          buttons={[
            {
              label: 'جزییات مراحل',
              type: 'allowAccess',
              icon: <MdVisibility />,
              onClick: (_, row) => {
                setDataStepper(row?.extra_information);
              },
            },
          ]}
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
    </>
  );
};

export default SystemUpdate;
