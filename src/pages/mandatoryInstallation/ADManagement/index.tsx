import { CustomDataGrid } from '@/components';
import PageBox from '@/components/common/PageBox';
import { ad_list } from '@/constants/tableHeaders';
import UseApi from '@/hooks/UseApi';
import { useRouter } from 'next/router';
import { MdOutlineInstallDesktop } from 'react-icons/md';

interface MandatoryInstallationData {
  id: number;
  ip_address: string;
  domain_url: string;
  username: string;
  status: string;
}
interface HandleApiRequestResponse {
  Data: MandatoryInstallationData[];
}

const MandatoryInstallation = () => {
  const { data, total, loading } = UseApi<HandleApiRequestResponse>('/active_directory/');
  const router = useRouter();

  const formatedData =
    data?.Data?.map((agent: MandatoryInstallationData) => ({
      id: agent.id,
      ip_address: agent.ip_address,
      domain_url: agent.domain_url,
      username: agent.username,
      status: agent.status ? 'فعال' : 'غیرفعال',
    })) ?? [];

  return (
    <PageBox
      title="نصاب اکتیو دایرکتوری"
      description="توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا"
      searchQuery={ad_list}
    >
      <CustomDataGrid
        pageTotal={total}
        loading={loading}
        columns={ad_list}
        rows={formatedData || []}
        notExtra
        buttons={[
          {
            label: 'نصب',
            type: 'allowAccess',
            icon: <MdOutlineInstallDesktop />,
            onClick: (_, row) => {
              router.push({
                pathname: '/mandatoryInstallation/ADManagement/ADInstaller/',
                query: {
                  ADInstaller: row.domain_url,
                },
              });
            },
          },
        ]}
      />
    </PageBox>
  );
};

export default MandatoryInstallation;
