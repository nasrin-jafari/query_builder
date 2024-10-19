import PageBox from '@/components/common/PageBox';
import { ad_list } from '@/constants/tableHeaders';
import { Box, Grid } from '@mui/material';
import { CustomDataGrid, CustomForm } from '@/components';
import useApi from '@/hooks/UseApi';
import { FormData } from '@/components/form/CustomForm';
import { useRouter } from 'next/router';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface FormDataEdit {
  ip_address: string;
  password: string;
  username: string;
}
interface ConnectToADData {
  ip_address: string;
  domain_url: string;
  username: string;
  status: string | boolean;
  dns: null;
  last_failure: null;
  last_time: number;
  restricted: boolean;
  id: number;
}

interface ConnectToADResponse {
  Data: ConnectToADData[];
  total: number;
}

const fields = [
  {
    label: 'آدرس اتصال به سرور',
    name: 'ip_address',
    type: 'text',
    placeholder: ' ip یا dns : مثال ',
    col: 12,
  },

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

const ConnectToAD = () => {
  const { data, total, loading, handleApiRequest } =
    useApi<ConnectToADResponse>('/active_directory/');
  const formatedData =
    data?.Data?.map((agent) => ({
      ...agent,
      status: agent.status ? 'فعال' : 'غیرفعال',
    })) ?? [];
  const handleForm = async (data: FormData) => {
    const res = await handleApiRequest('/active_directory/', 'post', data);

    if (res) {
      await handleApiRequest('/active_directory/', 'get');
    }
  };
  const router = useRouter();
  const handleDelete = async (_: ConnectToADData, row: ConnectToADData) => {
    try {
      await handleApiRequest(`/active_directory/delete/${row.id}/`, 'delete');
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (data: FormDataEdit, row: ConnectToADData) => {
    try {
      const res = await handleApiRequest(`/active_directory/edit/${row.id}/`, 'patch', {
        ip_address: data.ip_address,
        username: data.username,
        password: data.password,
      });

      if (res) {
        handleApiRequest('/active_directory/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox title="اتصال به اکتیو دایرکتوری" searchQuery={ad_list}>
      <>
        <Grid
          container
          sx={{
            mb: 3,
          }}
        >
          <Grid item xs={12} lg={4}>
            <CustomForm fields={fields} onSubmit={handleForm} widthButton="20%" />
          </Grid>
        </Grid>
        <Box>
          <CustomDataGrid
            rows={formatedData}
            columns={ad_list}
            pageTotal={total}
            loading={loading}
            editForm={fields}
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
              {
                label: 'AD جزییات',
                type: 'allowAccess',
                icon: <IoDocumentTextOutline />,
                onClick: (_, row) => {
                  router.push({
                    pathname: '/settings/connectToAD/ADDetails',
                    query: {
                      domain_url: row.domain_url,
                    },
                  });
                },
              },
            ]}
          />
        </Box>
      </>
    </PageBox>
  );
};

export default ConnectToAD;
