import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  GET_ITEMS_BY_MACHINE,
  UPDATE_ITEM
} from '@/graphql/templates/item.template';
import {
  CREATE_MACHINE_ITEM,
  DELETE_MACHINE_ITEM,
  UPDATE_MACHINE_ITEMS
} from '@/graphql/templates/machineItem.template';
import { Item } from '@/generated/graphql';
import { useUsers } from './useUsers';

interface CreateItemData {
  name: string;
  basePrice: number;
  expirationPeriod: number;
  tenantId?: string;
}

interface UpdateItemData extends Partial<CreateItemData> {
  id: string;
}

interface CreateMachineItemData {
  machineId: string;
  itemId: string;
  name?: string;
  quantity: number;
  tenantId?: string;
}

export function useItems() {
  const { currentUser } = useUsers();
  // Queries
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError
  } = useQuery(GET_ITEMS, {
    fetchPolicy: 'cache-and-network'
  });

  // Mutations
  const [createItemMutation] = useMutation(CREATE_ITEM);
  const [updateItemMutation] = useMutation(UPDATE_ITEM);
  const [deleteItemMutation] = useMutation(DELETE_ITEM);
  const [createMachineItemMutation] = useMutation(CREATE_MACHINE_ITEM);
  const [updateMachineItemsMutation] = useMutation(UPDATE_MACHINE_ITEMS);
  const [deleteMachineItemMutation] = useMutation(DELETE_MACHINE_ITEM);

  // Item operations
  const createItem = async (input: CreateItemData) => {
    try {
      // Ensure tenantId is set from current user
      const itemInput = {
        ...input,
        tenantId: input.tenantId || currentUser?.tenantId
      };

      if (!itemInput.tenantId) {
        throw new Error('Cannot create item: missing tenant ID');
      }

      const result = await createItemMutation({
        variables: { input: itemInput },
        refetchQueries: [{ query: GET_ITEMS }]
      });

      if (!result.data?.createItem.success) {
        throw new Error(result.data?.createItem.message);
      }

      return result.data.createItem.item;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to create item');
    }
  };

  const updateItem = async (input: UpdateItemData) => {
    try {
      // Ensure tenantId is set from current user if not provided
      const itemInput = {
        ...input,
        tenantId: input.tenantId || currentUser?.tenantId
      };

      if (!itemInput.tenantId) {
        throw new Error('Cannot update item: missing tenant ID');
      }

      const result = await updateItemMutation({
        variables: { input: itemInput },
        refetchQueries: [{ query: GET_ITEMS }]
      });

      if (!result.data?.updateItem.success) {
        throw new Error(result.data?.updateItem.message);
      }

      return result.data.updateItem.item;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const result = await deleteItemMutation({
        variables: { id },
        refetchQueries: [{ query: GET_ITEMS }]
      });

      if (!result.data?.deleteItem.success) {
        throw new Error(result.data?.deleteItem.message);
      }

      return true;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete item');
    }
  };

  // MachineItem operations
  const getItemsByMachine = async (machineId: string) => {
    const { data } = useQuery(GET_ITEMS_BY_MACHINE, {
      variables: { machineId }
    });
    return data?.getItemsByMachine || [];
  };

  const createMachineItem = async (input: CreateMachineItemData) => {
    try {
      // Ensure tenantId is set from current user if not provided
      const machineItemInput = {
        ...input,
        tenantId: input.tenantId || currentUser?.tenantId
      };

      if (!machineItemInput.tenantId) {
        throw new Error('Cannot create machine item: missing tenant ID');
      }

      const result = await createMachineItemMutation({
        variables: { input: machineItemInput },
        refetchQueries: [
          { query: GET_ITEMS },
          { query: GET_ITEMS_BY_MACHINE, variables: { machineId: input.machineId } }
        ]
      });

      if (!result.data?.createMachineItem.success) {
        throw new Error(result.data?.createMachineItem.message);
      }

      return result.data.createMachineItem.machineItem;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to create machine item');
    }
  };

  const updateMachineItems = async (machineId: string, itemIds: string[]) => {
    try {
      // Ensure tenantId is added from current user
      const tenantId = currentUser?.tenantId;

      if (!tenantId) {
        throw new Error('Cannot update machine items: missing tenant ID');
      }

      const result = await updateMachineItemsMutation({
        variables: { input: { machineId, itemIds, tenantId } },
        refetchQueries: [{ query: GET_ITEMS }, { query: GET_ITEMS_BY_MACHINE, variables: { machineId } }]
      });

      if (!result.data?.updateMachineItems.success) {
        throw new Error(result.data?.updateMachineItems.message);
      }

      return result.data.updateMachineItems.machineItems;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update machine items');
    }
  };

  const deleteMachineItem = async (id: string) => {
    try {
      const result = await deleteMachineItemMutation({
        variables: { id },
        refetchQueries: [{ query: GET_ITEMS }]
      });

      if (!result.data?.deleteMachineItem.success) {
        throw new Error(result.data?.deleteMachineItem.message);
      }

      return true;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete machine item');
    }
  };

  return {
    items: (itemsData?.getItems as Item[]) || [],
    loading: itemsLoading,
    error: itemsError,
    createItem,
    updateItem,
    deleteItem,
    getItemsByMachine,
    createMachineItem,
    updateMachineItems,
    deleteMachineItem
  };
}
