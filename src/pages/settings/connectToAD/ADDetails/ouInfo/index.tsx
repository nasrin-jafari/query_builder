import React from 'react';
import PageBox from '@/components/common/PageBox';
import { ad_detail } from '@/constants/tableHeaders';
import { useRouter } from 'next/router';
import useApi from '@/hooks/UseApi';
import { CustomDataGrid } from '@/components';
import { MdFolderShared } from 'react-icons/md';

interface RowData {
  id: number;
  name: string;
  domain_url: string;
  computer_name: string;
  component_type: string;
}

interface DataOuInfo {
  Data: RowData[];
  Total: number;
}

const OuInfo = () => {
  const router = useRouter();
  const { ouInfo, domain_url } = router.query;
  const { data, total, loading, handleApiRequest } = useApi<DataOuInfo>(
    `/active_directory/manage/${domain_url}/?OU=${ouInfo}`
  );
  const handleClickSelectedItem = async (actionType: string, selectedRows: RowData[]) => {
    const organizationsList = selectedRows.map((entry) => entry.name);
    const payload = {
      computers_list: organizationsList,
      organizations_list: [],
      action: actionType === 'restrict' ? 'restrict' : 'unrestrict',
    };

    try {
      const res = await handleApiRequest(
        `/active_directory/restrict/${domain_url}/`,
        'post',
        payload
      );
      if (res) {
        handleApiRequest(`/active_directory/manage/${domain_url}/?OU=${ouInfo}`, 'get');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageBox title={`لیست کاربران ${ouInfo}`} searchQuery={ad_detail}>
      <CustomDataGrid
        rows={data?.Data ?? []}
        columns={ad_detail}
        pageTotal={total}
        loading={loading}
        notExtra
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

export default OuInfo;
