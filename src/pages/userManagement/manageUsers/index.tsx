import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { users } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useState } from 'react';

interface Role {
  name: string;
}

interface UserData {
  id: number;
  email: string;
  role: string;
  username: string;
  password?: string;
  password_again?: string;
}
interface HandleApiRequestResponse {
  Data: UserData[];
  roles: Role[];
}

const UserManagement = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, total, loading, handleApiRequest } = UseApi<HandleApiRequestResponse>('/user/get/');
  const fields = [
    {
      label: 'نام کاربری',
      name: 'username',
      type: 'text',
    },
    {
      label: 'ایمیل کاربر',
      name: 'email',
      type: 'text',
    },

    {
      label: 'انتخاب نقش',
      name: 'role',
      type: 'select',
      options: data?.roles?.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    },
    {
      label: 'رمز عبور',
      name: 'password',
      type: 'password',
    },
    {
      label: 'تکرار رمز عبور',
      name: 'password_again',
      type: 'password',
    },
  ];
  const fieldsEdit = [
    {
      label: 'نام کاربری',
      name: 'username',
      type: 'text',
    },
    {
      label: 'ایمیل کاربر',
      name: 'email',
      type: 'text',
    },

    {
      label: 'انتخاب نقش',
      name: 'role',
      type: 'select',
      options: data?.roles?.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    },
    {
      name: 'switch',
      label: 'تغییر رمز عبور',
      type: 'switch',
      onClick: () => setIsEdit((prev) => !prev),
    },
    ...(isEdit
      ? [
          {
            label: 'رمز عبور',
            name: 'password',
            type: 'password',
          },
          {
            label: 'تکرار رمز عبور',
            name: 'password_again',
            type: 'password',
          },
        ]
      : []),
  ];
  const handleDelete = async (_: UserData, row: UserData) => {
    try {
      await handleApiRequest(`/user/delete/${row?.id}/`, 'delete');
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (editeData: UserData, row: UserData) => {
    try {
      const res = await handleApiRequest(`/user/update/${row.id}/`, 'patch', {
        username: editeData?.username,
        email: editeData?.email,
        ...(!isEdit ? { password: editeData?.password } : {}),
        ...(!isEdit ? { password_again: editeData?.password_again } : {}),
        role: editeData?.role,
      });

      if (res) {
        handleApiRequest('/user/get/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox
      title="مدیریت کاربران"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={users}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={users}
        rows={data?.Data || []}
        editForm={fieldsEdit}
        fields={fields}
        editState={setIsEdit}
        handleAdd={{ urlApi: '/user/create/', fields: fields }}
        notExtra
        buttons={[
          {
            label: 'حذف کاربر',
            type: 'delete',
            onClick: handleDelete,
          },
          {
            label: 'ویرایش کاربر',
            type: 'edit',
            onClick: handleEdit,
          },
        ]}
      />
    </PageBox>
  );
};

export default UserManagement;
