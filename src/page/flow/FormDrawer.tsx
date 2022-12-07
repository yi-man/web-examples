import { Button, Drawer } from 'antd';
import React, { useState } from 'react';

interface FormDrawerProps {
  open: boolean;
  onClose: () => void
}
export const FormDrawer: React.FC<FormDrawerProps> = ({open, onClose}) => {
  

  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open} visible={open} maskClosable>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
