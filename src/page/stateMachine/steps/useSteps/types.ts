import { Dispatch, SetStateAction } from 'react';

export enum Step {
  INITIAL = 'INITIAL',
  RecipientSelection = 'RecipientSelection',
  PayoutForm = 'PayoutForm',
  RecipientForm = 'RecipientForm',
  PayerForm = 'PayerForm',
  Payer = 'Payer',
  Review = 'Review',
  Booked = 'Booked',

  NewRecipientSelection = 'NewRecipientSelection',

  BankTransferPayoutForm = 'BankTransferPayoutForm',
  BankTransferRecipientForm = 'BankTransferRecipientForm',
  BankTransferReview = 'BankTransferReview',

  BPayPayoutForm = 'BPayPayoutForm',
  BPayReview = 'BPayReview',
}

export const STEPS = [
  Step.RecipientSelection,
  Step.NewRecipientSelection,
  Step.PayoutForm,
  Step.RecipientForm,
  Step.Payer,
  Step.PayerForm,
  Step.Review,
  Step.Booked,
];

export const BANK_TRANSFER_STEPS = [
  Step.RecipientSelection,
  Step.NewRecipientSelection,
  Step.BankTransferPayoutForm,
  Step.BankTransferRecipientForm,
  Step.BankTransferReview,
];

export const BPAY_STEPS = [Step.RecipientSelection, Step.NewRecipientSelection, Step.BPayPayoutForm, Step.BPayReview];

export type SetStep = Dispatch<SetStateAction<Step>>;

export enum RecipientSelection {
  New = 'New',
  Existing = 'Existing',
}

export type RecipientDetails = {
  recipientSelection?: RecipientSelection; // if undefined means have not selected
  recipient?: any;
  recipientFormValues?: any;
  saveNewRecipientEnabled?: boolean;
};

export type InitialData = any;

export enum CustomOrDefault {
  Custom = 'Custom',
  Default = 'Default',
}

export type SetState<S> = Dispatch<SetStateAction<S>>;


export type SetRecipientDetails = SetState<RecipientDetails>;

export type PaymentType = 'INTERNATIONAL' | 'BANK_TRANSFER' | 'BPAY';

export type SetPaymentType = SetState<PaymentType>;

