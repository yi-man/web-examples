import { Button, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import {FormGroup} from './FormGroup'
import type {SchemaState} from './useSchema'

interface ConfigMenuProps {
  activeKey: string;
  onTabClick: (k: string) => void;
  schema: SchemaState
}
export const ConfigMenu: React.FC<ConfigMenuProps> = ({schema, activeKey,onTabClick}) => {



  return (
   <div
    style={{ width:372, marginLeft:24,  height: '100%'}}
   >
    <Tabs style={{height: '100%', overflow: 'scroll'}} activeKey={activeKey} onTabClick={onTabClick}>
      {
        Object.keys(schema).map(s => (
          <Tabs.TabPane tab={s} key={s}>
            <FormGroup schema={schema[s]} name={s}/>
          </Tabs.TabPane>
        ))
      }
    </Tabs>
 </div>
  );
};
