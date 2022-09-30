import { FC, memo } from 'react';
import {useMachine} from '@xstate/react';
import {lightMachine} from './light';
import {Tabs} from 'antd'
import {wordMachine} from './parallel'

interface StateMachineProps {
  placeholder?:string
}
export const StateMachine: FC<StateMachineProps> = memo(() => {
  const [state, send] = useMachine(lightMachine);
  const [wordState, wordSend] = useMachine(wordMachine);


  const onClick = () => {
    send('TRANS');
  };

  const onWordClick = () => {
    // wordSend()
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  console.log(11111111, wordState)

  return (
    <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `light`,
        key: '1',
        children: (
          <>
            <div
              style={{
                width: '50px',
                height: '50px',
                background: state.value as any,
                borderRadius: '100%',
              }}
            />
            <button onClick={onClick}>click</button>
          </>
        ),
      },
      {
        label: `parallel`,
        key: '2',
        children: (
          <div>
            <div></div>            
            <button onClick={onWordClick}>click</button>
          </div>
        ),
      },
      
    ]}
  />
  )
});

StateMachine.displayName = 'StateMachine';

