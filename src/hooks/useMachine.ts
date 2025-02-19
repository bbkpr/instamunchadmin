// hooks/useMachine.ts
import { useQuery, useMutation } from '@apollo/client';
import { GET_MACHINE } from '@/graphql/templates/machine.template';
import { GET_ITEMS } from '@/graphql/templates/item.template';
import {
  CREATE_MACHINE_ITEM,
  UPDATE_MACHINE_ITEMS,
  DELETE_MACHINE_ITEM,
  UPDATE_MACHINE_ITEM
} from '@/graphql/templates/machineItem.template';

export function useMachine(machineId: string) {
  const {
    data: machineData,
    loading,
    error
  } = useQuery(GET_MACHINE, {
    variables: { id: machineId },
    fetchPolicy: 'cache-and-network'
  });

  const { data: itemsData } = useQuery(GET_ITEMS);

  const [createMachineItemMutation] = useMutation(CREATE_MACHINE_ITEM);
  const [updateMachineItemMutation] = useMutation(UPDATE_MACHINE_ITEM);
  const [updateMachineItemsMutation] = useMutation(UPDATE_MACHINE_ITEMS);
  const [deleteMachineItemMutation] = useMutation(DELETE_MACHINE_ITEM);

  const createMachineItem = async (input: { itemId: string; quantity: number; name?: string }) => {
    const result = await createMachineItemMutation({
      variables: {
        input: {
          ...input,
          machineId
        }
      },
      refetchQueries: [
        {
          query: GET_MACHINE,
          variables: { id: machineId }
        }
      ]
    });

    if (!result.data?.createMachineItem.success) {
      throw new Error(result.data?.createMachineItem.message);
    }

    return result.data.createMachineItem.machineItem;
  };

  const updateMachineItem = async (input: { id: string; quantity: number; setPrice?: number; tenantId: string }) => {
    const result = await updateMachineItemMutation({
      variables: { input },
      refetchQueries: [
        {
          query: GET_MACHINE,
          variables: { id: machineId }
        }
      ]
    });

    if (!result.data?.updateMachineItem.success) {
      throw new Error(result.data?.updateMachineItem.message);
    }

    return result.data.updateMachineItem.machineItem;
  };

  const updateMachineItems = async (machineId: string, items: { id: string; quantity: number; tenantId: string }[]) => {
    const result = await updateMachineItemsMutation({
      variables: { input: { machineId, items } },
      refetchQueries: [
        {
          query: GET_MACHINE,
          variables: { id: machineId }
        }
      ]
    });

    if (!result.data?.updateMachineItems.success) {
      throw new Error(result.data?.updateMachineItems.message);
    }

    return result.data.updateMachineItems.machineItems;
  };

  const deleteMachineItem = async (id: string) => {
    const result = await deleteMachineItemMutation({
      variables: { id },
      refetchQueries: [
        {
          query: GET_MACHINE,
          variables: { id: machineId }
        }
      ]
    });

    if (!result.data?.deleteMachineItem.success) {
      throw new Error(result.data?.deleteMachineItem.message);
    }

    return true;
  };

  return {
    machine: machineData?.getMachine,
    items: itemsData?.getItems || [],
    loading,
    error,
    createMachineItem,
    updateMachineItem,
    updateMachineItems,
    deleteMachineItem
  };
}
