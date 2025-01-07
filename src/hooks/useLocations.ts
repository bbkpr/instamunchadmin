import { useQuery, useMutation } from '@apollo/client';
import {
  GET_LOCATIONS,
  CREATE_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION
} from '@/graphql/templates/location.template';
import { Location } from '@/generated/graphql';

export interface LocationFormData {
  address1: string;
  address2?: string;
  city: string;
  stateOrProvince: string;
  country: string;
}

export interface UpdateLocationData extends LocationFormData {
  id: string;
}

export function useLocations() {
  const { data, loading, error } = useQuery(GET_LOCATIONS, {
    fetchPolicy: 'cache-and-network'
  });

  const [createLocationMutation] = useMutation(CREATE_LOCATION);
  const [updateLocationMutation] = useMutation(UPDATE_LOCATION);
  const [deleteLocationMutation] = useMutation(DELETE_LOCATION);

  const createLocation = async (input: LocationFormData) => {
    const result = await createLocationMutation({
      variables: { input },
      refetchQueries: [{ query: GET_LOCATIONS }]
    });

    if (!result.data?.createLocation.success) {
      throw new Error(result.data?.createLocation.message);
    }

    return result.data.createLocation.location;
  };

  const updateLocation = async (input: UpdateLocationData) => {
    const result = await updateLocationMutation({
      variables: { input },
      refetchQueries: [{ query: GET_LOCATIONS }]
    });

    if (!result.data?.updateLocation.success) {
      throw new Error(result.data?.updateLocation.message);
    }

    return result.data.updateLocation.location;
  };

  const deleteLocation = async (id: string) => {
    const result = await deleteLocationMutation({
      variables: { id },
      refetchQueries: [{ query: GET_LOCATIONS }]
    });

    if (!result.data?.deleteLocation.success) {
      throw new Error(result.data?.deleteLocation.message);
    }

    return true;
  };

  return {
    locations: (data?.getLocations as Location[]) || [],
    loading,
    error,
    createLocation,
    updateLocation,
    deleteLocation
  };
}
