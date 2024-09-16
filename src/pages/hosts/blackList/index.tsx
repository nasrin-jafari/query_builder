import { CustomDataGrid, CustomForm } from '@/components';
import PageBox from '@/components/common/PageBox';
import { FormData } from '@/components/form/CustomForm';
import { filters } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

interface BlackListData {
  type: string;
  priority: number;
  submit_time: number;
  extra_information: {
    id: number;
  };
}

interface handleApiRequestResponse {
  Data: BlackListData[];
  Total: number;
}

interface RowData {
  type: string;
  value: string;
  priority: number;
  note: string;
  pid: number;
}

const BlackList = () => {
  const [optionValue, setOptionValue] = useState<string | number>('');
  const [newData, setNewData] = useState<BlackListData[]>([]);

  const { data, total, loading, handleApiRequest } =
    useApi<handleApiRequestResponse>('/filters/black_list/');

  const validationSchema = yup.object().shape({
    comment: yup.string().required('*اجباری'),
    priority: yup
      .number()
      .typeError('مقدار باید عددی باشد')
      .required('*اجباری')
      .min(0, 'مقدار بین 0 الی 10 باید باشد')
      .max(10, 'مقدار بین 0 الی 10 باید باشد')
      .default(1),
  });
  const validationSchemaEdit = yup.object().shape({
    value: yup.string().required('*اجباری'),
    note: yup.string().required('*اجباری'),
    priority: yup
      .number()
      .typeError('مقدار باید عددی باشد')
      .required('*اجباری')
      .min(0, 'مقدار بین 0 الی 10 باید باشد')
      .max(10, 'مقدار بین 0 الی 10 باید باشد')
      .default(1),
  });

  const field = [
    {
      name: 'type',
      label: 'مقدار مربوطه را انتخاب کنید',
      type: 'select',
      options: [
        {
          label: 'فایل',
          value: 'files',
        },
        {
          label: 'پردازه',
          value: 'processes',
        },
      ],
      onChange: (value: string | number) => setOptionValue(value),
      col: 6,
    },
    ...(optionValue
      ? [
          {
            label: 'مقدار مربوطه را انتخاب کنید',
            name: 'file_option',
            type: 'select',
            dir: 'ltr',
            col: 6,
            options: [
              {
                label: optionValue == 'files' ? 'هش' : 'بر اساس مسیر پردازه',
                value: optionValue == 'files' ? 'hash' : 'path',
              },
              {
                label: optionValue == 'files' ? 'امضاء' : 'آرگومان های ورودی',
                value: optionValue == 'files' ? 'signature' : 'arguments',
              },
            ],
          },
          {
            label: 'مقدار را وارد کنید',
            name: 'value',
            type: 'text',
            col: 6,
          },
          {
            label: ' اولویت',
            name: 'priority',
            type: 'number',
            col: 6,
          },
        ]
      : []),
    {
      label: 'کامنت خود را بنویسید',
      name: 'comment',
      type: 'textarea',
    },
  ];

  const onSubmit = async (data: FormData) => {
    const typeMapping: {
      [key: string]: { [key: string]: string };
    } = {
      files: {
        signature: 'file_signature',
        hash: 'file_hash',
      },
      processes: {
        path: 'process_path',
        arguments: 'process_argument',
      },
    };

    const formDataToSave = {
      type: typeMapping[optionValue]?.[data.file_option],
      priority: data.priority,
      value: data.value,
      note: data.comment,
    };

    try {
      const res = await handleApiRequest(`/filters/black_list/create/`, 'post', formDataToSave);

      if (res) {
        await handleApiRequest('/filters/black_list/', 'get');
      }

      setOptionValue('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const formatedData = data?.Data?.map((log) => ({
      pid: log?.extra_information?.id,
      ...log,
    })) as BlackListData[];

    if (formatedData) {
      setNewData(formatedData);
    }
  }, [data]);

  const editField = [
    {
      label: 'مقدار را وارد کنید',
      name: 'value',
      type: 'text',
      col: 6,
    },
    {
      label: ' اولویت',
      name: 'priority',
      type: 'number',
      min: 1,
      max: 10,
      col: 6,
    },
    {
      label: 'کامنت خود را بنویسید',
      name: 'note',
      type: 'textarea',
    },
  ];

  const handleEdit = async (formData: RowData, _: RowData) => {
    const baseUrl = `/filters/black_list/update/${formData.pid}/`;

    try {
      const res = await handleApiRequest(baseUrl, 'patch', {
        type: formData.type,
        value: formData.value,
        priority: formData.priority,
        note: formData.note,
      });
      if (res) {
        handleApiRequest('/filters/black_list/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (_: RowData, row: RowData) => {
    const baseUrl = `/filters/black_list/delete/${row.pid}/`;

    try {
      const res = await handleApiRequest(baseUrl, 'delete');
      if (res) {
        handleApiRequest('/filters/black_list/', 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageBox
      title="لیست سیاه"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={filters}
    >
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid
          container
          xs={12}
          sx={{
            mb: 10,
          }}
        >
          <Grid item xs={6}>
            <CustomForm
              fields={field}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              widthButton="20%"
            />
          </Grid>
        </Grid>
      </Grid>
      <CustomDataGrid
        pageTotal={total}
        columns={filters}
        rows={newData || []}
        loading={loading}
        editForm={editField}
        buttons={[
          {
            label: 'ویرایش',
            type: 'edit',
            onClick: handleEdit,
            validation: validationSchemaEdit,
          },
          {
            label: 'حذف',
            type: 'delete',
            onClick: handleDelete,
          },
        ]}
      />
    </PageBox>
  );
};

export default BlackList;
