import React from 'react';
import { Box, Modal, Backdrop, Fade, Skeleton } from '@mui/material';

interface SkeletonModalProps {
  open: boolean;
  onClose: () => void;
}

const SkeletonModal: React.FC<SkeletonModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Fade in={open}>
        <Box sx={{ bgcolor: 'background.paper', p: 3, minWidth: '50vw', minHeight: '50vh' }}>
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SkeletonModal;
