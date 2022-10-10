import { renderHook } from '@testing-library/react-hooks';
import { initialData } from '@/service/createPayment/getCreatePaymentInitialData/mockData';
import { useFirstStep, StepsProvider } from '../index';
import { Step } from '../types';
import { InitialData } from '../../../types';

describe('use step test', () => {
  describe('useFirstStep test', () => {
    it('no recipients, defaultRecipient, first step is RecipientSelection', () => {
      const ret = renderHook(() => useFirstStep(initialData), {
        wrapper: StepsProvider,
      });

      expect(ret.result.current).toBe(Step.RecipientSelection);
    });

    it('recipients exist, first step is PayoutForm', () => {
      const initialDataWithRecipientSelected = {
        ...initialData,
        params: {
          existingRecipient: initialData['recipientsData'][0],
        },
      } as InitialData;

      const ret = renderHook(() => useFirstStep(initialDataWithRecipientSelected), {
        wrapper: StepsProvider,
      });

      expect(ret.result.current).toBe(Step.PayoutForm);
    });

    it('isEditDraft is true, first step is PayoutForm', () => {
      const initialDataWithRecipientSelected = {
        ...initialData,
        params: {
          fromDraftId: 'draftId',
        },
      } as InitialData;

      const ret = renderHook(() => useFirstStep(initialDataWithRecipientSelected), {
        wrapper: StepsProvider,
      });

      expect(ret.result.current).toBe(Step.PayoutForm);
    });
  });
});
