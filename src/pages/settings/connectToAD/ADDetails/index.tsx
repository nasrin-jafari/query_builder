import React from 'react';
import PageBox from '@/components/common/PageBox';
import { ad_detail } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import { CustomDataGrid } from '@/components';
import { MdFolderShared } from 'react-icons/md';

interface RowData {
  id: number;
  name: string;
  domain_url: string;
  computer_name: string;
  component_type: 'OU' | 'Computer' | 'User';
}

interface DataADDetails {
  Data: RowData[];
  Total: number;
}

const ADDetails = () => {
  const router = useRouter();
  const { domain_url } = router.query;

  const { data, total, loading, handleApiRequest } = useApi<DataADDetails>(
    `/active_directory/manage/${domain_url}/`
  );
  const handleClickSelectedItem = async (actionType: string, selectedRows: RowData[]) => {
    const activeDirectory_ou = selectedRows
      .filter((i) => i.component_type === 'OU')
      ?.map((i) => i.name);
    const activeDirectory_user = selectedRows
      .filter((i) => i.component_type == 'User' || i.component_type == 'Computer')
      ?.map((i) => i.name);

    const payload = {
      computers_list: activeDirectory_user,
      organizations_list: activeDirectory_ou,
      action: actionType === 'restrict' ? 'restrict' : 'unrestrict',
    };
    try {
      const res = await handleApiRequest(
        `/active_directory/restrict/${domain_url}/`,
        'post',
        payload
      );
      if (res) {
        handleApiRequest(`/active_directory/manage/${domain_url}/`, 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox title=" اکتیو دایرکتوری" searchQuery={ad_detail}>
      <CustomDataGrid
        rows={data?.Data ?? []}
        columns={ad_detail}
        pageTotal={total}
        loading={loading}
        selectableRows
        itemSelectRowParam="name"
        selectedRowsButtons={[
          {
            label: 'محدود سازی',
            actionType: 'restrict',
          },
          {
            label: 'لغو محدودیت',
            actionType: 'unrestrict',
          },
        ]}
        onAction={(actionType, selectedRows) => handleClickSelectedItem(actionType, selectedRows)}
        notExtra
        buttons={[
          {
            label: 'لیست کاربر ها',
            type: 'content_type',
            icon: <MdFolderShared style={{ color: 'red' }} />,
            onClick: (_, row) => {
              router.push({
                pathname: '/settings/connectToAD/ADDetails/ouInfo/',
                query: {
                  ouInfo: row.name,
                  domain_url: row.domain_url,
                },
              });
            },
          },
        ]}
      />
    </PageBox>
  );
};

export default ADDetails;
