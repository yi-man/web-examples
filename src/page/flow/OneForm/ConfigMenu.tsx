import { Button, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import {FormGroup} from './FormGroup'
import { ISchema } from '@formily/react'

interface ConfigMenuProps {
  schema: ISchema
}
export const ConfigMenu: React.FC<ConfigMenuProps> = ({schema}) => {

  return (
   
   <div
    style={{ width:372, marginLeft:24,  height: '100%'}}
   >
    <Tabs style={{height: '100%', overflow: 'scroll'}}>
      <Tabs.TabPane tab="trainer1 (fenode)" key="1">
        <FormGroup schema={schema}/>
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
