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

const getHasDomesticPermission = (
  domesticPayoutPreferences: InitialData['domesticPayoutPreferences']
) => domesticPayoutPreferences.length > 0;

const getStepType = ({
  recipientDetails,
  domesticPayoutPreferences,
}: {
  recipientDetails: any;
  domesticPayoutPreferences: InitialData['domesticPayoutPreferences'];
}) => {
  const hasDomesticPermission = getHasDomesticPermission(domesticPayoutPreferences);
  const { recipientSelection, recipient } = recipientDetails;

  if (recipientSelection === RecipientSelection.Existing) {
    if (recipient && hasDomesticPermission) {
      const isDomestic =
        recipient.bankDetails.accountCurrency === 'AUD' && recipient.bankDetails.bankCountryCode === 'AU';

      const found = domesticPayoutPreferences.find(
        (preference: any) => preference.transferMethod === recipient.bankDetails.localClearingSystem
      );

      if (isDomestic && found) {
        return found.transferMethod;
      } else {
        return 'INTERNATIONAL';
      }
    }
  }

  return undefined;
};

export const StepsProvider: FC = ({ children }) => {
  const [step, setStep] = useState<Step>(DEFAULT_FIRST_STEP);
  // const [initialData, setInitialData] = useState<InitialData | undefined>(undefined);
  const [stepType, setStepType] = useState<StepType>('INTERNATIONAL');
  const [context, setContext] = useState<{
    initialData?:InitialData,
    recipient?: any,
    recipientSelection?: RecipientSelection 
  }>({})

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

  useEffect(() => {
    const newStepType = getStepType({
      recipientDetails: context.recipient,
      domesticPayoutPreferences: context.initialData.domesticPayoutPreferences
    })

    setStepType(newStepType)

    const newStep = setStepOnRecipientChangeUtils({
      step,
      stepType: newStepType,
      recipientSelection: context.recipientSelection,
      hasDomesticPermission: getHasDomesticPermission(context.initialData.domesticPayoutPreferences),
    })

    setStep(newStep)
  }, [context.recipient, context.recipientSelection])

  useEffect(() => {
    
  }, [step, context])

  const firsStep = useMemo(()=>{
    return getFirstStep(context.initialData)
  }, [context.initialData]) ;

  setStep(firsStep);

  const value = {
    firsStep,
    step,
    stepWidth: getStepWidth(step),
    percent,
    stepType,

    setStep,
    // setStepType,
    setContext
  };

  const value2 = {
    step: {
      first: firsStep,
      current: step,
      type: stepType,
      percent: percent,
      width: getStepWidth(step)
    },
    setStep,
    setStepType,
  };

  return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>;
};

export const useSteps = () => useContext(StepsContext) as Required<StepsContextProps>;

// export const useFirstStep = (initialData?: InitialData) => {
//   const { step, setStep } = useContext(StepsContext);

//   useEffect(() => {
//     if (initialData) {
//       const firsStep = getFirstStep(initialData);

//       setStep(firsStep);
//     }
//   }, [initialData]);

//   return step;
// };
