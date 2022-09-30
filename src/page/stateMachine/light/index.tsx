import { FC, memo } from 'react';
import {useMachine} from '@xstate/react';
import {lightMachine} from './light';
import { Button} from 'antd'

interface StateMachineProps {
  placeholder?:string
}
export const StateMachine: FC<StateMachineProps> = memo(() => {
  const [state, send] = useMachine(lightMachine);

  const onClick = () => {
    send('TRANS');
  };

  

 

  return (
    <div>
            <div
              style={{
                width: '50px',
                height: '50px',
                background: state.value as any,
                borderRadius: '100%',
              }}
            />
            <Button onClick={onClick}>click</Button>
          </div>
  )
});

StateMachine.displayName = 'StateMachine';

