import { setStepOnRecipientChange } from '../utils';
import { Step, RecipientSelection } from '../../../types';

const setStep = jest.fn();
describe('useStep utils test', () => {
  it('new recipient, has no domestic permission ,go payout form', () => {
    const params = {
      step: Step.RecipientSelection,
      setStep,
      stepType: 'INTERNATIONAL',
      recipientSelection: RecipientSelection.New,
      hasDomesticPermission: false,
    };

    setStepOnRecipientChange(params as any);

    expect(setStep).toBeCalledWith(Step.PayoutForm);
  });

  it('new recipient, has domestic permission ,go NewRecipientSelection', () => {
    const params = {
      step: Step.RecipientSelection,
      setStep,
      stepType: 'INTERNATIONAL',
      recipientSelection: RecipientSelection.New,
      hasDomesticPermission: true,
    };

    setStepOnRecipientChange(params as any);

    expect(setStep).toBeCalledWith(Step.NewRecipientSelection);
  });

  it('existing recipient, stepType INTERNATIONAL ,go PayoutForm', () => {
    const params = {
      step: Step.RecipientSelection,
      setStep,
      stepType: 'INTERNATIONAL',
      recipientSelection: RecipientSelection.New,
      hasDomesticPermission: false,
    };

    setStepOnRecipientChange(params as any);

    expect(setStep).toBeCalledWith(Step.PayoutForm);
  });

  it('step BankTransferPayoutForm, hasDomesticPermission true, stepType INTERNATIONAL ,go PayoutForm ', () => {
    const params = {
      step: Step.BankTransferPayoutForm,
      setStep,
      stepType: 'INTERNATIONAL',
      recipientSelection: RecipientSelection.New,
      hasDomesticPermission: true,
    };

    setStepOnRecipientChange(params as any);

    expect(setStep).toBeCalledWith(Step.PayoutForm);
  });

  it('step PayoutForm, stepType BANK_TRANSFER , hasDomesticPermission true, go BankTransferPayoutForm ', () => {
    const params = {
      step: Step.PayoutForm,
      setStep,
      stepType: 'BANK_TRANSFER',
      recipientSelection: RecipientSelection.New,
      hasDomesticPermission: true,
    };

    setStepOnRecipientChange(params as any);

    expect(setStep).toBeCalledWith(Step.BankTransferPayoutForm);
  });
});
