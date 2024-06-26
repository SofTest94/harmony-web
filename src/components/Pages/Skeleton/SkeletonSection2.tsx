import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonSection2 = () => (
  <div>
    {/* <Skeleton variant="circular" width={40} height={40} sx={{ margin: 'auto' }} /> */}

    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: 'auto' }} />
{/* 
    <Skeleton variant="text" sx={{ margin: 'auto' }} />

    <Skeleton variant="text" animation="wave" sx={{ margin: 'auto' }} /> */}
  </div>
);

export default SkeletonSection2;
