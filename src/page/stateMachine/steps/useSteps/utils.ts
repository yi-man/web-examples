// import { logEvent, drop2Events } from '@/utils/analytics';
import { BPAY_STEPS, STEPS, BANK_TRANSFER_STEPS, Step, SetStep, RecipientSelection, PaymentType, InitialData } from './types';

export const getSteps = (paymentType: PaymentType) => {
  if (paymentType === 'BPAY') {
    return BPAY_STEPS;
  }
  if (paymentType === 'BANK_TRANSFER') {
    return BANK_TRANSFER_STEPS;
  }

  return STEPS;
};

const getPayoutForm = (stepType: PaymentType) => {
  const payoutForm: { [s in PaymentType]: Step } = {
    BPAY: Step.BPayPayoutForm,
    BANK_TRANSFER: Step.BankTransferPayoutForm,
    INTERNATIONAL: Step.PayoutForm,
  };

  return payoutForm[stepType] || payoutForm['INTERNATIONAL'];
};

interface SetStepOnRecipientChange {
  step: Step;
  setStep: SetStep;
  recipientSelection?: RecipientSelection;
  hasDomesticPermission?: boolean;
  stepType: PaymentType;
}
export const setStepOnRecipientChange = ({
  step,
  setStep,
  stepType,
  recipientSelection,
  hasDomesticPermission,
}: SetStepOnRecipientChange) => {
  if (!recipientSelection) {
    return;
  }

  if (step === Step.RecipientSelection) {
    if (recipientSelection === RecipientSelection.New) {
      setStep(hasDomesticPermission ? Step.NewRecipientSelection : Step.PayoutForm);
      // logEvent(drop2Events.transferFlowNewRecipient);
    } else {
      setStep(getPayoutForm(stepType));
      // logEvent(drop2Events.transferFlowNewRecipient);
    }
  } else if (hasDomesticPermission) {
    if (step.includes('PayoutForm')) {
      setStep(getPayoutForm(stepType));
    }
  }
};

export const getFirstStep = (initialData?: InitialData) => {
  if (!initialData) {
    return Step.INITIAL;
  }

  const hasRecipients = initialData.recipientsData?.length > 0;
  const isEditFlow = !!initialData.params.fromDraftId;
  const recipientSelected = initialData.params.existingRecipient || isEditFlow;
  const paymentCurrencySelected = initialData.params.toCcy;
  const hasDomesticPermission = initialData.payoutReferences?.domesticPayoutPreferences.length > 0;

  if (hasDomesticPermission && !hasRecipients) {
    return Step.NewRecipientSelection;
  }

  if (!hasRecipients || recipientSelected || paymentCurrencySelected) {
    return Step.PayoutForm;
  }

  return Step.RecipientSelection;
};

export const getStepWidth = (step?: Step) =>
  step === Step.BPayReview || step === Step.BankTransferReview ? 1080 : 736;
