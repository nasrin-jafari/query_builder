import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { agents } from '@/constants/tableHeaders';
import useApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface FormattedAgent {
  computer_name: string;
  local_endpoint_ip_address: string;
  agent_core_version: string;
  last_time: string;
  status: string | boolean;
  license_status: string | boolean;
}

interface AgentsResponse {
  Data: FormattedAgent[];
  total: number;
}

const HostManagement = () => {
  const { data, total, loading } = useApi<AgentsResponse>('/agents/');
  const [newData, setNewData] = useState<FormattedAgent[]>([]);
  const router = useRouter();

  const formatedData = (): void => {
    try {
      const formated =
        data?.Data?.map((agent: FormattedAgent) => ({
          ...agent,
          status: agent.status ? 'فعال' : 'غیرفعال',
          license_status: agent.license_status ? 'فعال' : 'غیرفعال',
        })) ?? []; // Ensure formated is always an array

      setNewData(formated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    formatedData();
  }, [data]);

  return (
    <PageBox
      title="مدیریت میزبان"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={agents}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={agents}
        rows={newData}
        buttons={[
          {
            label: ' رخداد ها',
            type: 'extra',
            onClick: (_, data) => {
              router.push({
                pathname: '/hosts/hostManagement/logs',
                query: {
                  name: data?.computer_name,
                  logId: data?.extra_information?.agent_id,
                },
              });
            },
          },
          {
            label: 'شناسایی ها',
            type: 'extra',
            onClick: (_, data) => {
              router.push({
                pathname: `/hosts/hostManagement/logs/detailsLog/`,
                query: {
                  logId: data?.extra_information?.agent_id,
                  key: 'quarantined_files',
                  logs: 'alerts',
                },
              });
            },
          },
        ]}
      />
    </PageBox>
  );
};

export default HostManagement;
