import axiosMethod from '@/api';
import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { yara } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import React, { useEffect, useState } from 'react';

interface YaraData {
  content: string;
  created: string;
  enabled: number;
  id: number;
  md5: string;
  name: string;
}

interface ApiResponse {
  Data: YaraData[];
}

const YaraRuleManagement: React.FC = () => {
  const { data, total, loading, handleApiRequest } = UseApi<ApiResponse>(
    '/background-engine/yara/get/'
  );
  const [dataInit, setDataInit] = useState(data?.Data);
  useEffect(()=>{
    setDataInit(data?.Data);
  },[data])

  const fields = [
    {
      label: 'فایل قانون',
      name: 'file',
      type: 'file',
      tab: 'آپلود فایل', // Grouped under "Personal Info" tab
      col: 12,
    },
    {
      label: 'نام فایل',
      name: 'name',
      type: 'text',
      tab: 'از طریق متن',
      col: 6,
    },
    {
      label: 'متن قانون',
      name: 'content',
      type: 'code',
      tab: 'از طریق متن',
      col: 12,
    },
  ];

  const handleForm = async (formData: any) => {
    try {
      let response;

      if (formData.file?.[0]) {
        const fileData = new FormData();
        fileData.append('file', formData.file[0]);

        response = await axiosMethod.post('/background-engine/yara/file/', fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        const content = {
          name: formData.name,
          content: formData.content,
        };
        response = await handleApiRequest('/background-engine/yara/content/', 'post', content);
      }
      if (response) {
        await handleApiRequest('/background-engine/yara/get/', 'get');
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleEdit = async (editData: any, row: any) => {
    try {
      const content = {
        name: editData.name,
        content: editData.content,
      };

      const response = await handleApiRequest(
        `/background-engine/yara/edit/${row.id}/`,
        'patch',
        content
      );

      if (response) {
        await handleApiRequest('/background-engine/yara/get/', 'get');
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleDelete = async (_: any, row: any) => {
    try {
      const response = await handleApiRequest(
        `/background-engine/yara/delete/${row.id}/`,
        'delete'
      );

      if (response) {
        await handleApiRequest('/background-engine/yara/get/', 'get');
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const handleSwitch = async(fieldValue : boolean , rowId : number)=>{
    const response = await axiosMethod.post(
      `/background-engine/yara/status/${fieldValue == true ? 'disable' : 'enable'}/${rowId}/`,
    );
    if (response) {
     const res =  await axiosMethod.get('/background-engine/yara/get/')
      setDataInit(res.data.data?.Data);
    }
  }


  return (
    <PageBox
      title="مدیریت قوانین یارا"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={yara}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={yara}
        rows={dataInit || []}
        fields={fields}
        editForm={fields}
        handleForm={handleForm}
        handleSwitch={handleSwitch}
        notExtra
        buttons={[
          {
            label: 'حذف',
            type: 'delete',
            onClick: handleDelete,
          },
          {
            label: 'ویرایش',
            type: 'edit',
            onClick: handleEdit,
          },
        ]}
      />
    </PageBox>
  );
};

export default YaraRuleManagement;
