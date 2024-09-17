import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CustomTabs from '@/components/common/CustomTabs';

const Loader = () => {
  return (
    <div className="preloader">
      <div className="preloader__enter">
        <div className="preloader__bounce">
          <div className="preloader__logo"></div>
        </div>
      </div>
    </div>
  );
};
interface IframComponentType {
  srcLight: string;
  srcDark: string;
  width?: string;
  height?: string;
  margin?: string;
}
const IframComponent: React.FC<IframComponentType> = ({
  srcLight,
  srcDark,
  width,
  height,
  margin,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <iframe
      src={`${isLight ? srcLight : srcDark}`}
      frameBorder="0"
      height={height || '290px'}
      width={width || '32%'}
      style={{
        borderRadius: '12px',
        margin: margin ? margin : '0.5%',
      }}
    ></iframe>
  );
};
interface PaginatedIframesProps {
  iframes: JSX.Element[];
  itemsPerPage: number;
}
const PaginatedIframes: React.FC<PaginatedIframesProps> = ({ iframes, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(iframes.length / itemsPerPage) - 1)
    );
  };

  const offset = currentPage * itemsPerPage;
  const currentPageItems = iframes.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}
      >
        {currentPageItems}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: 2 }}>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          sx={{ display: 'flex', border: '1px solid gray', width: '110px', cursor: 'pointer' }}
        >
          <IoIosArrowForward style={{ fontSize: '20px', marginLeft: '12px' }} />
          قبلی
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(iframes.length / itemsPerPage) - 1}
          sx={{ display: 'flex', border: '1px solid gray', width: '110px', cursor: 'pointer' }}
        >
          بعدی
          <IoIosArrowBack style={{ fontSize: '20px', marginRight: '12px' }} />
        </Button>
      </Box>
    </div>
  );
};

const ServerStatus = () => {
  const [showLoader, setShowLoader] = useState(true);
  const getUrl = () => {
    if (typeof window !== 'undefined') {
      const { protocol, hostname } = window.location;
      return `${protocol}//${hostname}:30330`;
    }
    return 'http://192.168.220.141:30330';
  };
  const baseUrlGrafana = getUrl();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const tabs = [
    {
      label: 'CoreDNS',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="coredns-1"
              height="300px"
              srcDark={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=dark&panelId=10`}
              srcLight={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=light&panelId=10`}
            />,
            <IframComponent
              key="coredns-2"
              height="300px"
              srcDark={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=dark&panelId=18`}
              srcLight={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=light&panelId=18`}
            />,
            <IframComponent
              key="coredns-3"
              height="300px"
              srcDark={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=dark&panelId=24`}
              srcLight={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=light&panelId=24`}
            />,
            <IframComponent
              key="coredns-4"
              width="100%"
              srcDark={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/vkQ0UHxik/coredns?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'API server',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="api-1"
              width="49%"
              height="500px"
              srcDark={`${baseUrlGrafana}/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=5s&theme=dark&panelId=15`}
              srcLight={`${baseUrlGrafana}/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=5s&theme=light&panelId=15`}
            />,
            <IframComponent
              key="api-2"
              width="49%"
              height="500px"
              srcDark={`${baseUrlGrafana}/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=5s&theme=dark&panelId=16`}
              srcLight={`${baseUrlGrafana}/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=5s&theme=light&panelId=16`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'Multi-Cluster',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="multi-1"
              width="49%"
              height="500px"
              srcDark={`${baseUrlGrafana}/d-solo/b59e6c9f2fcbe2e16d77fc492374cc4f/kubernetes-compute-resources-multi-cluster?orgId=1&refresh=5s&theme=dark&panelId=9`}
              srcLight={`${baseUrlGrafana}/d-solo/b59e6c9f2fcbe2e16d77fc492374cc4f/kubernetes-compute-resources-multi-cluster?orgId=1&refresh=5s&theme=light&panelId=9`}
            />,
            <IframComponent
              key="multi-2"
              width="49%"
              height="500px"
              srcDark={`${baseUrlGrafana}/d-solo/b59e6c9f2fcbe2e16d77fc492374cc4f/kubernetes-compute-resources-multi-cluster?orgId=1&refresh=5s&theme=dark&panelId=7`}
              srcLight={`${baseUrlGrafana}/d-solo/b59e6c9f2fcbe2e16d77fc492374cc4f/kubernetes-compute-resources-multi-cluster?orgId=1&refresh=5s&theme=light&panelId=7`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'Cluster',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="cluster-1"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=20`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=20`}
            />,
            <IframComponent
              key="cluster-2"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=9`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=9`}
            />,
            <IframComponent
              key="cluster-3"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=7`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=7`}
            />,
            <IframComponent
              key="cluster-4"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=16`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=16`}
            />,
            <IframComponent
              key="cluster-5"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=13`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=13`}
            />,
            <IframComponent
              key="cluster-6"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=12`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=12`}
            />,
            <IframComponent
              key="cluster-7"
              width="100%"
              srcDark={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=dark&panelId=17`}
              srcLight={`${baseUrlGrafana}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=5s&theme=light&panelId=17`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'Kubelet',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="kubelet-1"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=12`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=12`}
            />,
            <IframComponent
              key="kubelet-2"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=11`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=11`}
            />,
            <IframComponent
              key="kubelet-3"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=10`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=10`}
            />,
            <IframComponent
              key="kubelet-4"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=24`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=24`}
            />,
            <IframComponent
              key="kubelet-5"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=22`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=22`}
            />,
            <IframComponent
              key="kubelet-6"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=23`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=23`}
            />,
            <IframComponent
              key="kubelet-7"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=19`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=19`}
            />,
            <IframComponent
              key="kubelet-8"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=dark&panelId=20`}
              srcLight={`${baseUrlGrafana}/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=5s&theme=light&panelId=20`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'N/ Cluster',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-cluster-1"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="network-cluster-2"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=2`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=2`}
            />,
            <IframComponent
              key="network-cluster-3"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=1`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=1`}
            />,
            <IframComponent
              key="network-cluster-4"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=9`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=9`}
            />,
            <IframComponent
              key="network-cluster-5"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=8`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=8`}
            />,
            <IframComponent
              key="network-cluster-6"
              srcDark={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=dark&panelId=5`}
              srcLight={`${baseUrlGrafana}/d-solo/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&refresh=5s&theme=light&panelId=5`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'N/NPods',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-pods-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=dark&panelId=2`}
              srcLight={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=light&panelId=2`}
            />,
            <IframComponent
              key="network-pods-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=dark&panelId=1`}
              srcLight={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=light&panelId=1`}
            />,
            <IframComponent
              key="network-pods-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=dark&panelId=5`}
              srcLight={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=light&panelId=5`}
            />,
            <IframComponent
              key="network-pods-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/8b7a8b326d7a6f1f04244066368c67af/kubernetes-networking-namespace-pods?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'N/NWorkload',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-workload-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=dark&panelId=5`}
              srcLight={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=light&panelId=5`}
            />,
            <IframComponent
              key="network-workload-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="network-workload-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=dark&panelId=9`}
              srcLight={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=light&panelId=9`}
            />,
            <IframComponent
              key="network-workload-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=dark&panelId=8`}
              srcLight={`${baseUrlGrafana}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=5s&theme=light&panelId=8`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'N/Pod',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-pod-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=dark&panelId=2`}
              srcLight={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=light&panelId=2`}
            />,
            <IframComponent
              key="network-pod-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=dark&panelId=1`}
              srcLight={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=light&panelId=1`}
            />,
            <IframComponent
              key="network-pod-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="network-pod-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=dark&panelId=3`}
              srcLight={`${baseUrlGrafana}/d-solo/7a18067ce943a40ae25454675c19ff5c/kubernetes-networking-pod?orgId=1&refresh=5s&theme=light&panelId=3`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'N/Workload',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-workload-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=dark&panelId=3`}
              srcLight={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=light&panelId=3`}
            />,
            <IframComponent
              key="network-workload-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=dark&panelId=1`}
              srcLight={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=light&panelId=1`}
            />,
            <IframComponent
              key="network-workload-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=dark&panelId=7`}
              srcLight={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=light&panelId=7`}
            />,
            <IframComponent
              key="network-workload-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=dark&panelId=5`}
              srcLight={`${baseUrlGrafana}/d-solo/728bf77cc1166d2f3133bf25846876cc/kubernetes-networking-workload?orgId=1&refresh=5s&theme=light&panelId=5`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'No/Nodes',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="network-pods-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=dark&panelId=5`}
              srcLight={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=light&panelId=5`}
            />,
            <IframComponent
              key="network-pods-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="network-pods-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=dark&panelId=7`}
              srcLight={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=light&panelId=7`}
            />,
            <IframComponent
              key="network-pods-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=dark&panelId=6`}
              srcLight={`${baseUrlGrafana}/d-solo/dbf56629-0fe1-4828-a3a6-54603106af5c/node-exporter-nodes?orgId=1&refresh=5s&theme=light&panelId=6`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'USE/Cluster',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="use-cluster-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="use-cluster-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=dark&panelId=2`}
              srcLight={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=light&panelId=2`}
            />,
            <IframComponent
              key="use-cluster-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=dark&panelId=8`}
              srcLight={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=light&panelId=8`}
            />,
            <IframComponent
              key="use-cluster-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=dark&panelId=6`}
              srcLight={`${baseUrlGrafana}/d-solo/accc924c-92c7-472d-aa7e-0e665667f079/node-exporter-use-method-cluster?orgId=1&refresh=5s&theme=light&panelId=6`}
            />,
          ]}
        />
      ),
    },
    {
      label: 'USE/Node',
      content: (
        <PaginatedIframes
          itemsPerPage={6}
          iframes={[
            <IframComponent
              key="use-node-1"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=dark&panelId=4`}
              srcLight={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=light&panelId=4`}
            />,
            <IframComponent
              key="use-node-2"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=dark&panelId=2`}
              srcLight={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=light&panelId=2`}
            />,
            <IframComponent
              key="use-node-3"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=dark&panelId=8`}
              srcLight={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=light&panelId=8`}
            />,
            <IframComponent
              key="use-node-4"
              width="49%"
              srcDark={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=dark&panelId=6`}
              srcLight={`${baseUrlGrafana}/d-solo/ab7dd8e1-bc2d-4b81-969d-0bf5d1d5474c/node-exporter-use-method-node?orgId=1&refresh=5s&theme=light&panelId=6`}
            />,
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CustomTabs tabs={tabs} showLoader={showLoader} />
      </Box>
      {showLoader && <Loader />}
    </>
  );
};

export default ServerStatus;
