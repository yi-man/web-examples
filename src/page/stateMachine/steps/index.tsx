import { FC, memo } from 'react';
import {useMachine} from '@xstate/react';
import multiStepFormMachine from './steps';
import { Button} from 'antd'

interface StateMachineProps {
  placeholder?:string
}
export const StateMachine: FC<StateMachineProps> = memo(() => {
  const [state, send] = useMachine(multiStepFormMachine);

  const onClick = () => {
    send('CONFIRM_BENEFICIARY', {
      info:{
        name: 'xuxin',
        amount: 1000,
        currency: 'CNY'
      }
    });
  };

  return (
    <div>
      <div
        
      />
      <div>{state.value as string}</div>
      <Button onClick={onClick}>click</Button>
    </div>
  )
});

StateMachine.displayName = 'StateMachine';

