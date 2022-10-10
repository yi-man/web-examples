import { createMachine, assign } from "xstate";
import { Step, SetStep, PaymentType, SetState, RecipientSelection, InitialData } from './types';

interface StepContext {
  initialData?:InitialData,
  recipient?: any,
  recipientSelection?: RecipientSelection 
}

const stepMachine = createMachine<StepContext>({
  id: "step",
  initial: Step.INITIAL,
  context: {
  },
  states: {
    [Step.INITIAL]: {
      on: { TOGGLE: "active" }
    },
    // active: {
    //   entry: assign({ count: (ctx) => ctx.count + 1 }),
    //   on: { TOGGLE: "inactive" }
    // }
  }
});