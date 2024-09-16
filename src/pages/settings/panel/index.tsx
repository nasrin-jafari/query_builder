import { CustomForm } from '@/components';
import PageBox from '@/components/common/PageBox';
import { Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import React from 'react';
import UseApi from '@/hooks/UseApi';
import { FormData } from '@/components/form/CustomForm';
import handleApiRequest from '@/hooks/UseApi';

interface SettingItem {
  fa: string;
  en: string;
  value: number;
}

interface PanelProps {
  initialSettings: SettingItem[];
}

const Panel: React.FC<PanelProps> = ({ initialSettings }) => {
  const { data, handleApiRequest } = UseApi<SettingItem[]>('/dashboard/settings/', initialSettings);

  const fields = data?.map((item) => ({
    label: item.fa,
    name: item.en,
    type: 'number',
    col: 7,
  }));

  const initialData = data?.reduce<Record<string, number>>((acc, item) => {
    acc[item.en] = item.value;
    return acc;
  }, {});

  const handleForm = async (formData: FormData) => {
    try {
      const res = await handleApiRequest(`/dashboard/settings/update/`, 'put', formData);
      if (res) {
        await handleApiRequest('/dashboard/settings/');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <PageBox title="تنظیمات سامانه">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <CustomForm data={initialData} fields={fields} onSubmit={handleForm} widthButton="20%" />
        </Grid>
      </Grid>
    </PageBox>
  );
};

// تابع getStaticProps برای گرفتن داده‌ها در زمان بیلد
export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialSettings = await handleApiRequest<SettingItem[]>('/dashboard/settings/');

    return {
      props: {
        initialSettings,
      },
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      props: {
        initialSettings: [],
      },
    };
  }
};

export default Panel;
