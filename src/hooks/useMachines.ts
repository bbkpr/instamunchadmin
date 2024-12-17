// hooks/useMachines.ts
import { useQuery, useMutation } from '@apollo/client';
import { GET_MACHINES } from '@/graphql/queries';
import { CREATE_MACHINE, DELETE_MACHINE, UPDATE_MACHINE, UPDATE_MACHINE_ITEMS } from '@/graphql/mutations';
import { Machine } from '@/models';

export interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export interface UpdateMachineData extends MachineFormData {
  id: string;
}

export function useMachines() {
  // Query hook
  const { data, loading, error } = useQuery(GET_MACHINES, {
    fetchPolicy: 'cache-and-network'
  });

  // Mutation hooks
  const [createMachineMutation] = useMutation(CREATE_MACHINE);
  const [updateMachineMutation] = useMutation(UPDATE_MACHINE);
  const [deleteMachineMutation] = useMutation(DELETE_MACHINE);

  // Create operation
  const createMachine = async (input: MachineFormData) => {
    try {
      const result = await createMachineMutation({
        variables: { input },
        refetchQueries: [{ query: GET_MACHINES }]
      });

      if (!result.data?.createMachine.success) {
        throw new Error(result.data?.createMachine.message);
      }

      return result.data.createMachine.machine;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to create machine');
    }
  };

  // Update operation
  const updateMachine = async (input: UpdateMachineData) => {
    try {
      const result = await updateMachineMutation({
        variables: { input },
        refetchQueries: [{ query: GET_MACHINES }]
      });

      if (!result.data?.updateMachine.success) {
        throw new Error(result.data?.updateMachine.message);
      }

      return result.data.updateMachine.machine;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update machine');
    }
  };

  // Delete operation
  const deleteMachine = async (id: string) => {
    try {
      const result = await deleteMachineMutation({
        variables: { id },
        refetchQueries: [{ query: GET_MACHINES }]
      });

      if (!result.data?.deleteMachine.success) {
        throw new Error(result.data?.deleteMachine.message);
      }

      return true;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete machine');
    }
  };

  return {
    machines: data?.getMachines as Machine[] || [],
    loading,
    error,
    createMachine,
    updateMachine,
    deleteMachine
  };
}