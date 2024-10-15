import { Box, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import CardCharts from '@/components/common/CardCharts';

interface ComponentProps {
  component: React.ElementType;
  gridProps: any;
  props?: any;
  title?: string;
  withCard?: boolean;
  skeletonHeight?: number;
}

interface PanelComponentProps {
  loading: boolean;
  components: ComponentProps[];
}

const PanelComponent: FC<PanelComponentProps> = ({ loading, components }) => {
  return (
    <Box>
      {loading ? (
        <Grid container spacing={2}>
          {components.map((component, index) => (
            <Grid item {...component.gridProps} key={index}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={component.skeletonHeight || 400}
                animation="wave"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {components &&
            components.map((component, index) => (
              <Grid item {...component.gridProps} key={index}>
                {component.withCard ? (
                  <CardCharts sx={{ height: component.props.height, background: 'transparent' }}>
                    {component.title && (
                      <Typography variant="h6" sx={{ mb: 3 }}>
                        {component.title}
                      </Typography>
                    )}
                    <component.component {...component.props} />
                  </CardCharts>
                ) : (
                  <>
                    {component.title && <Typography variant="h6">{component.title}</Typography>}
                    <component.component {...component.props} />
                  </>
                )}
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default PanelComponent;
