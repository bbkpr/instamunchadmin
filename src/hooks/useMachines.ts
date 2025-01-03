// hooks/useMachines.ts
import { useQuery, useMutation } from '@apollo/client';
import { Machine } from '@/models';
import { CREATE_MACHINE, DELETE_MACHINE, GET_MACHINES, UPDATE_MACHINE } from '@/graphql/templates/machine.templates';
import { GET_MACHINE_TYPES } from '@/graphql/templates/machineType.template';
import { GET_MACHINE_MANUFACTURERS } from '@/graphql/templates/machineManufacturer.template';

export interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export interface UpdateMachineData extends MachineFormData {
  id: string;
}

export function useMachines() {
  // Query hooks
  const {
    data: machinesData,
    loading: machinesLoading,
    error: machinesError
  } = useQuery(GET_MACHINES, {
    fetchPolicy: 'cache-and-network'
  });

  const { data: typesData, loading: typesLoading } = useQuery(GET_MACHINE_TYPES);
  const { data: manufacturersData, loading: manufacturersLoading } = useQuery(GET_MACHINE_MANUFACTURERS);

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
    machines: (machinesData?.getMachines as Machine[]) || [],
    machineTypes: typesData?.getMachineTypes || [],
    manufacturers: manufacturersData?.getMachineManufacturers || [],
    loading: machinesLoading || typesLoading || manufacturersLoading,
    error: machinesError,
    createMachine,
    updateMachine,
    deleteMachine
  };
}
