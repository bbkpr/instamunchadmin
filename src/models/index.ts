export interface Machine {
  id: string;
  name: string;
  machineType: {
    id: string;
    name: string;
  };
  manufacturer: {
    id: string;
    name: string;
  };
  machineItems: MachineItem[];
}

export interface Item {
  id: string;
  name: string;
  basePrice: number;
  expirationPeriod: number;
}

export interface MachineItem {
  id: string;
  name?: string;
  quantity: number;
  machine: Machine;
  item: Item;
}
