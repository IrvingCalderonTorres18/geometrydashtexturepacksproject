import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const GradientCircularProgress = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#7DFF00" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress size="6rem" sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
};

const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <GradientCircularProgress />
    </Backdrop>
  );
};

export default LoadingBackdrop;
