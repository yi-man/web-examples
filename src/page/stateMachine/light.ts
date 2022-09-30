import {createMachine, interpret} from 'xstate';

export const lightMachine = createMachine({
  id: 'light',
  initial: 'red',
  predictableActionArguments: true,
  states: {
    red: {
      on: {
        TRANS: 'green',
      },
    },
    green: {
      on: {
        TRANS: 'yellow',
      },
    },
    yellow: {
      on: {
        TRANS: 'red',
      },
    },
  },
});



// const lightService = interpret(lightMachine).onTransition((state) => {
//   console.log(state.value);
// });

// // 启动状态机 初始化
// lightService.start();

// // 发送事件
// lightService.send('TRANS'); // 'green'
// lightService.send('TRANS'); // 'yellow'
// lightService.send('TRANS'); // 'red'

// // 批量发送事件
// lightService.send(['TRANS', 'TRANS']);

// // 终止状态机
// lightService.stop();