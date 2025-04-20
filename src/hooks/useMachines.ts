// hooks/useMachines.ts
import { useQuery, useMutation } from '@apollo/client';
import omit from 'lodash/omit';
import { CREATE_MACHINE, DELETE_MACHINE, GET_MACHINES, UPDATE_MACHINE } from '@/graphql/templates/machine.template';
import { GET_MACHINE_TYPES } from '@/graphql/templates/machineType.template';
import { GET_MACHINE_MANUFACTURERS } from '@/graphql/templates/machineManufacturer.template';
import { Location, Machine, MachineLocation, MachineManufacturer, MachineType } from '@/generated/graphql';
import {
  CREATE_MACHINE_LOCATION,
  GET_MACHINE_LOCATIONS,
  UPDATE_MACHINE_LOCATION
} from '@/graphql/templates/machineLocation.template';
import { GET_LOCATIONS } from '@/graphql/templates/location.template';

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
  const {
    data: locationsData,
    loading: locationsLoading,
    error: locationsError
  } = useQuery(GET_LOCATIONS, {
    fetchPolicy: 'cache-and-network'
  });
  const {
    data: machineLocationsData,
    loading: machineLocationsLoading,
    error: machineLocationsError
  } = useQuery(GET_MACHINE_LOCATIONS, {
    fetchPolicy: 'cache-and-network'
  });
  const {
    data: machineManufacturersData,
    loading: machineManufacturersLoading,
    error: machineManufacturersError
  } = useQuery(GET_MACHINE_MANUFACTURERS, {
    fetchPolicy: 'cache-and-network'
  });
  const {
    data: machineTypesData,
    loading: machineTypesLoading,
    error: machineTypesError
  } = useQuery(GET_MACHINE_TYPES, {
    fetchPolicy: 'cache-and-network'
  });

  const [createMachineMutation] = useMutation(CREATE_MACHINE);
  const [updateMachineMutation] = useMutation(UPDATE_MACHINE);
  const [deleteMachineMutation] = useMutation(DELETE_MACHINE);

  const [createMachineLocationMutation] = useMutation(CREATE_MACHINE_LOCATION);
  const [updateMachineLocationMutation] = useMutation(UPDATE_MACHINE_LOCATION);

  const createMachine = async (input: MachineFormData) => {
    const result = await createMachineMutation({
      variables: { input },
      refetchQueries: [{ query: GET_MACHINES }]
    });

    if (!result.data?.createMachine.success) {
      throw new Error(result.data?.createMachine.message);
    }

    return result.data.createMachine.machine;
  };

  const updateMachine = async (input: UpdateMachineData) => {
    const result = await updateMachineMutation({
      variables: { input: omit(input, 'locationId', 'machineLocationId') },
      refetchQueries: [{ query: GET_MACHINES }]
    });

    if (!result.data?.updateMachine.success) {
      throw new Error(result.data?.updateMachine.message);
    }

    return result.data.updateMachine.machine;
  };

  const deleteMachine = async (id: string) => {
    const result = await deleteMachineMutation({
      variables: { id },
      refetchQueries: [{ query: GET_MACHINES }]
    });

    if (!result.data?.deleteMachine.success) {
      throw new Error(result.data?.deleteMachine.message);
    }

    return true;
  };

  const createMachineLocation = async (input: { machineId: string; locationId: string }) => {
    const result = await createMachineLocationMutation({
      variables: { input },
      refetchQueries: [{ query: GET_MACHINES }]
    });

    if (!result.data?.createMachineLocation.success) {
      throw new Error(result.data?.createMachineLocation.message);
    }

    return result.data.createMachineLocation.machineLocation;
  };

  const updateMachineLocation = async (input: {
    id: string;
    machineId: string;
    locationId: string;
    tenantId: string;
  }) => {
    const result = await updateMachineLocationMutation({
      variables: { input },
      refetchQueries: [{ query: GET_MACHINES }]
    });

    if (!result.data?.updateMachineLocation.success) {
      throw new Error(result.data?.updateMachineLocation.message);
    }

    return result.data.updateMachineLocation.machineLocation;
  };

  return {
    machines: (machinesData?.getMachines as Machine[]) || [],
    locations: (locationsData?.getLocations as Location[]) || [],
    machineLocations: (machineLocationsData?.getMachineLocations as MachineLocation[]) || [],
    machineManufacturers: (machineManufacturersData?.getMachineManufacturers as MachineManufacturer[]) || [],
    machineTypes: (machineTypesData?.getMachineTypes as MachineType[]) || [],
    /** Whether ANY requests have errors (make sure to update this if expanding the hook later!) */
    error: locationsError || machinesError || machineLocationsError || machineManufacturersError || machineTypesError,
    /** Whether ANY requests are loading (make sure to update this if expanding the hook later!) */
    loading:
      locationsLoading ||
      machinesLoading ||
      machineLocationsLoading ||
      machineManufacturersLoading ||
      machineTypesLoading,
    locationsError,
    locationsLoading,
    machinesError,
    machinesLoading,
    machineLocationsError,
    machineLocationsLoading,
    machineManufacturersError,
    machineManufacturersLoading,
    machineTypesError,
    machineTypesLoading,
    createMachine,
    updateMachine,
    deleteMachine,
    createMachineLocation,
    updateMachineLocation
  };
}
