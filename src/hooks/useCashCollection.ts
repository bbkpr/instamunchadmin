import { useMutation } from '@apollo/client';
import { RECORD_CASH_COLLECTION } from '@/graphql/templates/transaction.template';

export function useCashCollection(machineId: string, onCollectionComplete?: () => void) {
  const [recordCollection, { loading }] = useMutation(RECORD_CASH_COLLECTION);

  const collectCash = async (amount: number, notes: string) => {
    try {
      await recordCollection({
        variables: {
          input: {
            machineId,
            amount,
            notes
          }
        }
      });
      onCollectionComplete?.();
    } catch (error) {
      console.error('Failed to record collection:', error);
      throw error;
    }
  };

  return {
    collectCash,
    loading
  };
}
