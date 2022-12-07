import { Button, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import {FormGroup} from './FormGroup'

interface ConfigMenuProps {}
export const ConfigMenu: React.FC<ConfigMenuProps> = () => {

  return (
   
   <div
    style={{ width:372, marginLeft:24,  height: '100%'}}
   >
    <Tabs style={{height: '100%', overflow: 'scroll'}}>
      <Tabs.TabPane tab="trainer1 (fenode)" key="1">
        <FormGroup />
      </Tabs.TabPane>
      <Tabs.TabPane tab="trainer2 (fenode)" key="2">
        trainer2
      </Tabs.TabPane>
      <Tabs.TabPane tab="trainer3 (fenode)" key="3">
        trainer3
      </Tabs.TabPane>
      <Tabs.TabPane tab="trainer4 (fenode)" key="4">
        trainer4
      </Tabs.TabPane>
    </Tabs>
 </div>
  );
};
