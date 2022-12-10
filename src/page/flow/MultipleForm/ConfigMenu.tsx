import { Button, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import {FormGroup} from './FormGroup'
import { ISchema } from '@formily/react'
import type {SchemaState} from './useSchema'

interface ConfigMenuProps {
  schema: SchemaState
}
export const ConfigMenu: React.FC<ConfigMenuProps> = ({schema}) => {

  return (
   <div
    style={{ width:372, marginLeft:24,  height: '100%'}}
   >
    <Tabs style={{height: '100%', overflow: 'scroll'}}>
      {
        Object.keys(schema).map(s => (
          <Tabs.TabPane tab={s} key={s}>
            <FormGroup schema={schema[s]}/>
          </Tabs.TabPane>
        ))
      }
    </Tabs>
 </div>
  );
};
