import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
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
      height={height || '350px'}
      width={width || '32%'}
      style={{
        borderRadius: '12px',
        margin: margin ? margin : '0.5%',
      }}
    ></iframe>
  );
};

const ServerStatus = () => {
  const [showLoader, setShowLoader] = useState(true);

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
      label: 'control plane',
      content: (
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}
        >
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=322"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=322"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=77"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=77"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=74"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=74"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=152"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=152"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=43"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage1-host&var-node=hexporter%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=43"
          />
        </Box>
      ),
    },
    {
      label: 'worker 1',
      content: (
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}
        >
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=322"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=322"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=77"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=77"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=74"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=74"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=152"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=152"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=43"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=43"
          />
        </Box>
      ),
    },
    {
      label: 'worker 2',
      content: (
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}
        >
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=322"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=322"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=77"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=77"
          />
          <IframComponent
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=74"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=74"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=152"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=152"
          />
          <IframComponent
            width="49%"
            height="300px"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=dark&panelId=43"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/rYdddlPWk/stage-hosts?orgId=1&refresh=5s&var-DS_PROMETHEUS=default&var-job=stage2-host&var-node=172.16.50.45%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&panelId=43"
          />
        </Box>
      ),
    },
    {
      label: 'apps',
      content: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <IframComponent
            srcDark="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=dark&panelId=15"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=light&panelId=15"
          />
          <IframComponent
            srcDark="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=dark&panelId=6"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=light&panelId=6"
          />
          <IframComponent
            srcDark="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=dark&panelId=4"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=light&panelId=4"
          />
          <IframComponent
            width="100%"
            srcDark="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=dark&panelId=17"
            srcLight="http://172.16.50.44:8080/grafana/d-solo/pMEd7m0Mz/microservices?orgId=1&refresh=5s&theme=light&panelId=17"
          />
        </Box>
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
