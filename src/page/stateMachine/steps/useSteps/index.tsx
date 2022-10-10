import React, { FC, useState, useMemo, createContext, useContext, useEffect, useCallback } from 'react';
import { Step, SetStep, PaymentType, SetState, RecipientSelection, InitialData } from './types';
import {
  getSteps,
  setStepOnRecipientChange as setStepOnRecipientChangeUtils,
  getStepWidth,
  getFirstStep,
} from './utils';

export type StepType = PaymentType;

const noop = () => {}

interface Condition {
  recipientSelection?: RecipientSelection;
  hasDomesticPermission?: boolean;
  stepType?: StepType;
}
interface StepsContextProps {
  step: Step;
  stepWidth: number;
  setStep: SetStep;
  percent: number;
  stepType: StepType;
  setStepType?: SetState<StepType>;
  setStepOnRecipientChange?: (params: Condition) => void;
}

const stepContextInitialData = {
  step: Step.RecipientSelection,
  setStep: noop,
  percent: 0,
  stepType: 'INTERNATIONAL' as StepType,
  stepWidth: getStepWidth(),
};

export const StepsContext = createContext<StepsContextProps>(stepContextInitialData);

const DEFAULT_FIRST_STEP = Step.INITIAL;

export const StepsProvider: FC = ({ children }) => {
  const [step, setStep] = useState<Step>(DEFAULT_FIRST_STEP);
  const [stepType, setStepType] = useState<StepType>('INTERNATIONAL');

  const percent = useMemo(() => {
    const steps = getSteps(stepType);

    if (step === Step.INITIAL) {
      return 0;
    }

    // in BANK_TRANSFER flow, PayerForm is belong to step Review, international will be same later
    if (stepType === 'BANK_TRANSFER' && step === Step.PayerForm) {
      return 100;
    }

    const index = steps.indexOf(step);
    return ((index + 1) / steps.length) * 100;
  }, [step, stepType]);

  const setStepOnRecipientChange = useCallback(
    ({ recipientSelection, hasDomesticPermission, stepType: latestStepType }: Condition) => {
      setStepOnRecipientChangeUtils({
        step,
        stepType: latestStepType || stepType,
        setStep,
        recipientSelection,
        hasDomesticPermission,
      });
    },
    [step, stepType]
  );

  const value = {
    step,
    setStep,
    percent,
    stepType,
    setStepType,
    setStepOnRecipientChange,
    stepWidth: getStepWidth(step),
  };

  return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>;
};

export const useSteps = () => useContext(StepsContext) as Required<StepsContextProps>;

export const useFirstStep = (initialData?: InitialData) => {
  const { step, setStep } = useContext(StepsContext);

  useEffect(() => {
    if (initialData) {
      const firsStep = getFirstStep(initialData);

      setStep(firsStep);
    }
  }, [initialData]);

  return step;
};
