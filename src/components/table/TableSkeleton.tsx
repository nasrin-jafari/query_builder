import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton variant='text' animation='wave' />
    </TableCell>
    <TableCell>
      <Skeleton variant='text' animation='wave' />
    </TableCell>
    <TableCell>
      <Skeleton variant='text' animation='wave' />
    </TableCell>
  </TableRow>
);

export default TableRowSkeleton;
