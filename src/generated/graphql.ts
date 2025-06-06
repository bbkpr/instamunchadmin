import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum AuditAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type AuditLog = {
  __typename?: 'AuditLog';
  action: AuditAction;
  createdAt: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  field?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  newValue?: Maybe<Scalars['String']['output']>;
  oldValue?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type AuditLogFilter = {
  action?: InputMaybe<AuditAction>;
  entityType?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CashCollection = {
  __typename?: 'CashCollection';
  amount: Scalars['Float']['output'];
  collectedAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machine: Machine;
  notes?: Maybe<Scalars['String']['output']>;
  user: User;
};

/** Create Item */
export type CreateItemInput = {
  basePrice: Scalars['Float']['input'];
  expirationPeriod: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

export type CreateItemMutationResponse = MutationResponse & {
  __typename?: 'CreateItemMutationResponse';
  code: Scalars['String']['output'];
  item?: Maybe<Item>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Create Location */
export type CreateLocationInput = {
  address1: Scalars['String']['input'];
  address2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  stateOrProvince: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

export type CreateLocationMutationResponse = MutationResponse & {
  __typename?: 'CreateLocationMutationResponse';
  code: Scalars['String']['output'];
  location?: Maybe<Location>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Create Machine */
export type CreateMachineInput = {
  machineTypeId: Scalars['ID']['input'];
  manufacturerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

/** Assign an Item to a Machine */
export type CreateMachineItemInput = {
  itemId: Scalars['ID']['input'];
  machineId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  setPrice?: InputMaybe<Scalars['Float']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type CreateMachineItemMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineItemMutationResponse';
  code: Scalars['String']['output'];
  machineItem?: Maybe<MachineItem>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Assign a Machine to a Location */
export type CreateMachineLocationInput = {
  locationId: Scalars['ID']['input'];
  machineId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type CreateMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  machineLocation?: Maybe<MachineLocation>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Create a Manufacturer */
export type CreateMachineManufacturerInput = {
  name: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

export type CreateMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  manufacturer?: Maybe<MachineManufacturer>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMachineMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine?: Maybe<Machine>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Create a MachineType */
export type CreateMachineTypeInput = {
  manufacturerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

export type CreateMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  machineType?: Maybe<MachineType>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  tenantId: Scalars['ID']['input'];
};

export type CreateUserMutationResponse = MutationResponse & {
  __typename?: 'CreateUserMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteUserMutationResponse = MutationResponse & {
  __typename?: 'DeleteUserMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Item = {
  __typename?: 'Item';
  /** Default price if no specific pricing policy exists */
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Expected shelf life, in days, of newly purchased items */
  expirationPeriod?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  /** Name of the item */
  name: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  address1: Scalars['String']['output'];
  address2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machineLocations?: Maybe<Array<Maybe<MachineLocation>>>;
  postalCode: Scalars['String']['output'];
  stateOrProvince: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

/** Log in */
export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Login Mutation Response */
export type LoginResponse = MutationResponse & {
  __typename?: 'LoginResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Machine = {
  __typename?: 'Machine';
  cashCollections: Array<CashCollection>;
  cashOnHand: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  machineLocations?: Maybe<Array<Maybe<MachineLocation>>>;
  machineType?: Maybe<MachineType>;
  manufacturer?: Maybe<MachineManufacturer>;
  name: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  transactions: Array<Transaction>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MachineItem = {
  __typename?: 'MachineItem';
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  itemId: Scalars['ID']['output'];
  machine?: Maybe<Machine>;
  machineId: Scalars['ID']['output'];
  /** Optional override for item name in specific machine */
  name?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  setPrice?: Maybe<Scalars['Float']['output']>;
  tenantId: Scalars['ID']['output'];
};

export type MachineLocation = {
  __typename?: 'MachineLocation';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  locationId: Scalars['ID']['output'];
  machine?: Maybe<Machine>;
  machineId: Scalars['ID']['output'];
  /** Optional display name for this machine-location pairing */
  name?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MachineManufacturer = {
  __typename?: 'MachineManufacturer';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machineTypes?: Maybe<Array<Maybe<MachineType>>>;
  machines?: Maybe<Array<Maybe<Machine>>>;
  name: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MachineType = {
  __typename?: 'MachineType';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machines?: Maybe<Array<Maybe<Machine>>>;
  manufacturer: MachineManufacturer;
  manufacturerId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new Item */
  createItem: CreateItemMutationResponse;
  /** Create a new Location */
  createLocation: CreateLocationMutationResponse;
  /** Create a new Machine */
  createMachine: CreateMachineMutationResponse;
  /** Add an Item to a Machine */
  createMachineItem: CreateMachineItemMutationResponse;
  /** Assign a Machine to a Location */
  createMachineLocation: CreateMachineLocationMutationResponse;
  /** Assign a Machine to a Manufacturer */
  createMachineManufacturer: CreateMachineManufacturerMutationResponse;
  /** Assign a Machine to a Type */
  createMachineType: CreateMachineTypeMutationResponse;
  /** Create a new User */
  createUser: CreateUserMutationResponse;
  /** Delete an existing Item */
  deleteItem: DeleteItemMutationResponse;
  /** Delete a Location */
  deleteLocation: DeleteLocationMutationResponse;
  /** Delete a Machine */
  deleteMachine: DeleteMachineMutationResponse;
  /** Delete an Item from a Machine */
  deleteMachineItem: DeleteMachineItemMutationResponse;
  /** Delete a MachineLocation relation */
  deleteMachineLocation: DeleteMachineLocationMutationResponse;
  /** Delete a MachineManufacturer relation */
  deleteMachineManufacturer: DeleteMachineManufacturerMutationResponse;
  /** Delete a MachineType relation */
  deleteMachineType: DeleteMachineTypeMutationResponse;
  /** Delete a User */
  deleteUser: DeleteUserMutationResponse;
  /** Log in and retrieve an auth token */
  login: LoginResponse;
  recordCashCollection: CashCollection;
  recordTransaction: Transaction;
  /** Update an existing Item */
  updateItem: UpdateItemMutationResponse;
  /** Update a Location */
  updateLocation: UpdateLocationMutationResponse;
  /** Update an existing Machine */
  updateMachine: UpdateMachineMutationResponse;
  /** Update a MachineItem */
  updateMachineItem: UpdateMachineItemMutationResponse;
  /** Update all MachineItems (be VERY careful with this) */
  updateMachineItems: UpdateMachineItemsMutationResponse;
  /** Update a MachineLocation relation */
  updateMachineLocation: UpdateMachineLocationMutationResponse;
  /** Update a MachineManufacturer relation */
  updateMachineManufacturer: UpdateMachineManufacturerMutationResponse;
  /** Update a MachineType relation */
  updateMachineType: UpdateMachineTypeMutationResponse;
  /** Update a User */
  updateUser: UpdateUserMutationResponse;
};

export type MutationCreateItemArgs = {
  input: CreateItemInput;
};

export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};

export type MutationCreateMachineArgs = {
  input: CreateMachineInput;
};

export type MutationCreateMachineItemArgs = {
  input: CreateMachineItemInput;
};

export type MutationCreateMachineLocationArgs = {
  input: CreateMachineLocationInput;
};

export type MutationCreateMachineManufacturerArgs = {
  input: CreateMachineManufacturerInput;
};

export type MutationCreateMachineTypeArgs = {
  input: CreateMachineTypeInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteItemArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMachineArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMachineItemArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMachineLocationArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMachineManufacturerArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMachineTypeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRecordCashCollectionArgs = {
  input: RecordCashCollectionInput;
};

export type MutationRecordTransactionArgs = {
  input: RecordTransactionInput;
};

export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};

export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};

export type MutationUpdateMachineArgs = {
  input: UpdateMachineInput;
};

export type MutationUpdateMachineItemArgs = {
  input: UpdateMachineItemInput;
};

export type MutationUpdateMachineItemsArgs = {
  input: UpdateMachineItemsInput;
};

export type MutationUpdateMachineLocationArgs = {
  input: UpdateMachineLocationInput;
};

export type MutationUpdateMachineManufacturerArgs = {
  input: UpdateMachineManufacturerInput;
};

export type MutationUpdateMachineTypeArgs = {
  input: UpdateMachineTypeInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationResponse = {
  /** HTTP-style response code */
  code: Scalars['String']['output'];
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** If ACL permission was denied for this operation */
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  /** Operation success indicator */
  success: Scalars['Boolean']['output'];
};

export type PaginatedAuditLogs = {
  __typename?: 'PaginatedAuditLogs';
  logs: Array<AuditLog>;
  pageCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export enum PaymentMethod {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD'
}

/** Auth Permissions */
export enum Permission {
  CreateItems = 'CREATE_ITEMS',
  CreateLocations = 'CREATE_LOCATIONS',
  CreateMachines = 'CREATE_MACHINES',
  CreateMachineItems = 'CREATE_MACHINE_ITEMS',
  CreateMachineLocations = 'CREATE_MACHINE_LOCATIONS',
  CreateMachineManufacturers = 'CREATE_MACHINE_MANUFACTURERS',
  CreateMachineTypes = 'CREATE_MACHINE_TYPES',
  CreateUsers = 'CREATE_USERS',
  DeleteItems = 'DELETE_ITEMS',
  DeleteLocations = 'DELETE_LOCATIONS',
  DeleteMachines = 'DELETE_MACHINES',
  DeleteMachineItems = 'DELETE_MACHINE_ITEMS',
  DeleteMachineLocations = 'DELETE_MACHINE_LOCATIONS',
  DeleteMachineManufacturers = 'DELETE_MACHINE_MANUFACTURERS',
  DeleteMachineTypes = 'DELETE_MACHINE_TYPES',
  DeleteUsers = 'DELETE_USERS',
  ReadAuditLogs = 'READ_AUDIT_LOGS',
  ReadItems = 'READ_ITEMS',
  ReadLocations = 'READ_LOCATIONS',
  ReadMachines = 'READ_MACHINES',
  ReadMachineItems = 'READ_MACHINE_ITEMS',
  ReadMachineLocations = 'READ_MACHINE_LOCATIONS',
  ReadMachineManufacturers = 'READ_MACHINE_MANUFACTURERS',
  ReadMachineTypes = 'READ_MACHINE_TYPES',
  ReadUsers = 'READ_USERS',
  UpdateItems = 'UPDATE_ITEMS',
  UpdateLocations = 'UPDATE_LOCATIONS',
  UpdateMachines = 'UPDATE_MACHINES',
  UpdateMachineItems = 'UPDATE_MACHINE_ITEMS',
  UpdateMachineLocations = 'UPDATE_MACHINE_LOCATIONS',
  UpdateMachineManufacturers = 'UPDATE_MACHINE_MANUFACTURERS',
  UpdateMachinePrices = 'UPDATE_MACHINE_PRICES',
  UpdateMachineTypes = 'UPDATE_MACHINE_TYPES',
  UpdateUsers = 'UPDATE_USERS'
}

export enum PermissionOperator {
  And = 'AND',
  Or = 'OR'
}

export type Query = {
  __typename?: 'Query';
  getAuditLogs: PaginatedAuditLogs;
  /** Get entity changes from the Audit Log */
  getEntityChanges: Array<AuditLog>;
  /** Get all Items, from everywhere */
  getItems?: Maybe<Array<Maybe<Item>>>;
  /** Get Items in a specific Machine */
  getItemsByMachine?: Maybe<Array<MachineItem>>;
  /** Get all Locations, from everywhere */
  getLocations?: Maybe<Array<Maybe<Location>>>;
  /** Get Locations stocking a specific Item */
  getLocationsByItem?: Maybe<Array<Location>>;
  /** Get Locations with a Machine matching a name (case insensitive) */
  getLocationsByMachineName: Array<Location>;
  getMachine?: Maybe<Machine>;
  /** Get cash collection records for a specific machine */
  getMachineCashCollections: Array<CashCollection>;
  /** Get all MachineItems, from everywhere */
  getMachineItems?: Maybe<Array<Maybe<MachineItem>>>;
  /** Get all MachineLocations */
  getMachineLocations?: Maybe<Array<MachineLocation>>;
  /** Get a MachineManufacturer by ID */
  getMachineManufacturer?: Maybe<MachineManufacturer>;
  /** Get all MachineManufacturers */
  getMachineManufacturers: Array<MachineManufacturer>;
  /** Get all transactions for a specific machine */
  getMachineTransactions: Array<Transaction>;
  /** Get a MachineType by ID */
  getMachineType?: Maybe<MachineType>;
  /** Get all MachineTypes */
  getMachineTypes: Array<MachineType>;
  /** Get all Machines, from everywhere */
  getMachines?: Maybe<Array<Maybe<Machine>>>;
  /** Get all Machines stocking a specific Item */
  getMachinesByItem?: Maybe<Array<MachineItem>>;
  /** Get Machines at a specific Location */
  getMachinesByLocation?: Maybe<Array<Machine>>;
  getUser?: Maybe<User>;
  /** Get entity changes by a specific user from the Audit Log */
  getUserChanges: Array<AuditLog>;
  getUserPermissions: Array<Scalars['String']['output']>;
  getUsers: Array<User>;
  /** Get the currently logged in User */
  me?: Maybe<User>;
};

export type QueryGetAuditLogsArgs = {
  filter?: InputMaybe<AuditLogFilter>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetEntityChangesArgs = {
  entityId: Scalars['String']['input'];
  entityType: Scalars['String']['input'];
};

export type QueryGetItemsByMachineArgs = {
  machineId: Scalars['ID']['input'];
};

export type QueryGetLocationsByItemArgs = {
  itemId: Scalars['ID']['input'];
};

export type QueryGetLocationsByMachineNameArgs = {
  machineName: Scalars['String']['input'];
};

export type QueryGetMachineArgs = {
  machineId: Scalars['ID']['input'];
};

export type QueryGetMachineCashCollectionsArgs = {
  machineId: Scalars['ID']['input'];
};

export type QueryGetMachineManufacturerArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetMachineTransactionsArgs = {
  machineId: Scalars['ID']['input'];
};

export type QueryGetMachineTypeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetMachinesByItemArgs = {
  itemId: Scalars['ID']['input'];
};

export type QueryGetMachinesByLocationArgs = {
  locationId: Scalars['ID']['input'];
};

export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetUserChangesArgs = {
  userId: Scalars['String']['input'];
};

export type QueryGetUserPermissionsArgs = {
  id: Scalars['ID']['input'];
};

export type RecordCashCollectionInput = {
  amount: Scalars['Float']['input'];
  machineId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type RecordTransactionInput = {
  amount: Scalars['Float']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  machineId: Scalars['ID']['input'];
  method: PaymentMethod;
  notes?: InputMaybe<Scalars['String']['input']>;
  type: TransactionType;
};

/** Auth Roles */
export enum Role {
  Administrator = 'ADMINISTRATOR',
  Operator = 'OPERATOR',
  Technician = 'TECHNICIAN'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  machine: Machine;
  method: PaymentMethod;
  notes?: Maybe<Scalars['String']['output']>;
  type: TransactionType;
  user?: Maybe<User>;
};

export enum TransactionType {
  Collection = 'COLLECTION',
  Refund = 'REFUND',
  Sale = 'SALE'
}

/** Update Item */
export type UpdateItemInput = {
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  expirationPeriod?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateItemMutationResponse = MutationResponse & {
  __typename?: 'UpdateItemMutationResponse';
  code: Scalars['String']['output'];
  item?: Maybe<Item>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Update Location */
export type UpdateLocationInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  postalCode: Scalars['String']['input'];
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateLocationMutationResponse = MutationResponse & {
  __typename?: 'UpdateLocationMutationResponse';
  code: Scalars['String']['output'];
  location?: Maybe<Location>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Update Machine */
export type UpdateMachineInput = {
  id: Scalars['ID']['input'];
  machineTypeId?: InputMaybe<Scalars['ID']['input']>;
  manufacturerId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

/** Update a MachineItem */
export type UpdateMachineItemInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  setPrice?: InputMaybe<Scalars['Float']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateMachineItemMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineItemMutationResponse';
  code: Scalars['String']['output'];
  machineItem?: Maybe<MachineItem>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineItemsInput = {
  itemIds: Array<Scalars['ID']['input']>;
  machineId: Scalars['ID']['input'];
  tenantId: Scalars['ID']['input'];
};

export type UpdateMachineItemsMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineItemsMutationResponse';
  code: Scalars['String']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Update a MachineLocation relation */
export type UpdateMachineLocationInput = {
  id: Scalars['ID']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  machineId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  machineLocation?: Maybe<MachineLocation>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Update a Manufacturer */
export type UpdateMachineManufacturerInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};

export type UpdateMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  manufacturer?: Maybe<MachineManufacturer>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine?: Maybe<Machine>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Update a MachineType */
export type UpdateMachineTypeInput = {
  id: Scalars['ID']['input'];
  manufacturerId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  machineType?: Maybe<MachineType>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  tenantId: Scalars['ID']['input'];
};

export type UpdateUserMutationResponse = MutationResponse & {
  __typename?: 'UpdateUserMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MutationResponse:
    | CreateItemMutationResponse
    | CreateLocationMutationResponse
    | CreateMachineItemMutationResponse
    | CreateMachineLocationMutationResponse
    | CreateMachineManufacturerMutationResponse
    | CreateMachineMutationResponse
    | CreateMachineTypeMutationResponse
    | CreateUserMutationResponse
    | DeleteItemMutationResponse
    | DeleteLocationMutationResponse
    | DeleteMachineItemMutationResponse
    | DeleteMachineLocationMutationResponse
    | DeleteMachineManufacturerMutationResponse
    | DeleteMachineMutationResponse
    | DeleteMachineTypeMutationResponse
    | DeleteUserMutationResponse
    | LoginResponse
    | UpdateItemMutationResponse
    | UpdateLocationMutationResponse
    | UpdateMachineItemMutationResponse
    | UpdateMachineItemsMutationResponse
    | UpdateMachineLocationMutationResponse
    | UpdateMachineManufacturerMutationResponse
    | UpdateMachineMutationResponse
    | UpdateMachineTypeMutationResponse
    | UpdateUserMutationResponse;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuditAction: AuditAction;
  AuditLog: ResolverTypeWrapper<AuditLog>;
  AuditLogFilter: AuditLogFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CashCollection: ResolverTypeWrapper<CashCollection>;
  CreateItemInput: CreateItemInput;
  CreateItemMutationResponse: ResolverTypeWrapper<CreateItemMutationResponse>;
  CreateLocationInput: CreateLocationInput;
  CreateLocationMutationResponse: ResolverTypeWrapper<CreateLocationMutationResponse>;
  CreateMachineInput: CreateMachineInput;
  CreateMachineItemInput: CreateMachineItemInput;
  CreateMachineItemMutationResponse: ResolverTypeWrapper<CreateMachineItemMutationResponse>;
  CreateMachineLocationInput: CreateMachineLocationInput;
  CreateMachineLocationMutationResponse: ResolverTypeWrapper<CreateMachineLocationMutationResponse>;
  CreateMachineManufacturerInput: CreateMachineManufacturerInput;
  CreateMachineManufacturerMutationResponse: ResolverTypeWrapper<CreateMachineManufacturerMutationResponse>;
  CreateMachineMutationResponse: ResolverTypeWrapper<CreateMachineMutationResponse>;
  CreateMachineTypeInput: CreateMachineTypeInput;
  CreateMachineTypeMutationResponse: ResolverTypeWrapper<CreateMachineTypeMutationResponse>;
  CreateUserInput: CreateUserInput;
  CreateUserMutationResponse: ResolverTypeWrapper<CreateUserMutationResponse>;
  DeleteItemMutationResponse: ResolverTypeWrapper<DeleteItemMutationResponse>;
  DeleteLocationMutationResponse: ResolverTypeWrapper<DeleteLocationMutationResponse>;
  DeleteMachineItemMutationResponse: ResolverTypeWrapper<DeleteMachineItemMutationResponse>;
  DeleteMachineLocationMutationResponse: ResolverTypeWrapper<DeleteMachineLocationMutationResponse>;
  DeleteMachineManufacturerMutationResponse: ResolverTypeWrapper<DeleteMachineManufacturerMutationResponse>;
  DeleteMachineMutationResponse: ResolverTypeWrapper<DeleteMachineMutationResponse>;
  DeleteMachineTypeMutationResponse: ResolverTypeWrapper<DeleteMachineTypeMutationResponse>;
  DeleteUserMutationResponse: ResolverTypeWrapper<DeleteUserMutationResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<Item>;
  Location: ResolverTypeWrapper<Location>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Machine: ResolverTypeWrapper<Machine>;
  MachineItem: ResolverTypeWrapper<MachineItem>;
  MachineLocation: ResolverTypeWrapper<MachineLocation>;
  MachineManufacturer: ResolverTypeWrapper<MachineManufacturer>;
  MachineType: ResolverTypeWrapper<MachineType>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  PaginatedAuditLogs: ResolverTypeWrapper<PaginatedAuditLogs>;
  PaymentMethod: PaymentMethod;
  Permission: Permission;
  PermissionOperator: PermissionOperator;
  Query: ResolverTypeWrapper<{}>;
  RecordCashCollectionInput: RecordCashCollectionInput;
  RecordTransactionInput: RecordTransactionInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionType: TransactionType;
  UpdateItemInput: UpdateItemInput;
  UpdateItemMutationResponse: ResolverTypeWrapper<UpdateItemMutationResponse>;
  UpdateLocationInput: UpdateLocationInput;
  UpdateLocationMutationResponse: ResolverTypeWrapper<UpdateLocationMutationResponse>;
  UpdateMachineInput: UpdateMachineInput;
  UpdateMachineItemInput: UpdateMachineItemInput;
  UpdateMachineItemMutationResponse: ResolverTypeWrapper<UpdateMachineItemMutationResponse>;
  UpdateMachineItemsInput: UpdateMachineItemsInput;
  UpdateMachineItemsMutationResponse: ResolverTypeWrapper<UpdateMachineItemsMutationResponse>;
  UpdateMachineLocationInput: UpdateMachineLocationInput;
  UpdateMachineLocationMutationResponse: ResolverTypeWrapper<UpdateMachineLocationMutationResponse>;
  UpdateMachineManufacturerInput: UpdateMachineManufacturerInput;
  UpdateMachineManufacturerMutationResponse: ResolverTypeWrapper<UpdateMachineManufacturerMutationResponse>;
  UpdateMachineMutationResponse: ResolverTypeWrapper<UpdateMachineMutationResponse>;
  UpdateMachineTypeInput: UpdateMachineTypeInput;
  UpdateMachineTypeMutationResponse: ResolverTypeWrapper<UpdateMachineTypeMutationResponse>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserMutationResponse: ResolverTypeWrapper<UpdateUserMutationResponse>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuditLog: AuditLog;
  AuditLogFilter: AuditLogFilter;
  Boolean: Scalars['Boolean']['output'];
  CashCollection: CashCollection;
  CreateItemInput: CreateItemInput;
  CreateItemMutationResponse: CreateItemMutationResponse;
  CreateLocationInput: CreateLocationInput;
  CreateLocationMutationResponse: CreateLocationMutationResponse;
  CreateMachineInput: CreateMachineInput;
  CreateMachineItemInput: CreateMachineItemInput;
  CreateMachineItemMutationResponse: CreateMachineItemMutationResponse;
  CreateMachineLocationInput: CreateMachineLocationInput;
  CreateMachineLocationMutationResponse: CreateMachineLocationMutationResponse;
  CreateMachineManufacturerInput: CreateMachineManufacturerInput;
  CreateMachineManufacturerMutationResponse: CreateMachineManufacturerMutationResponse;
  CreateMachineMutationResponse: CreateMachineMutationResponse;
  CreateMachineTypeInput: CreateMachineTypeInput;
  CreateMachineTypeMutationResponse: CreateMachineTypeMutationResponse;
  CreateUserInput: CreateUserInput;
  CreateUserMutationResponse: CreateUserMutationResponse;
  DeleteItemMutationResponse: DeleteItemMutationResponse;
  DeleteLocationMutationResponse: DeleteLocationMutationResponse;
  DeleteMachineItemMutationResponse: DeleteMachineItemMutationResponse;
  DeleteMachineLocationMutationResponse: DeleteMachineLocationMutationResponse;
  DeleteMachineManufacturerMutationResponse: DeleteMachineManufacturerMutationResponse;
  DeleteMachineMutationResponse: DeleteMachineMutationResponse;
  DeleteMachineTypeMutationResponse: DeleteMachineTypeMutationResponse;
  DeleteUserMutationResponse: DeleteUserMutationResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Item: Item;
  Location: Location;
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  Machine: Machine;
  MachineItem: MachineItem;
  MachineLocation: MachineLocation;
  MachineManufacturer: MachineManufacturer;
  MachineType: MachineType;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  PaginatedAuditLogs: PaginatedAuditLogs;
  Query: {};
  RecordCashCollectionInput: RecordCashCollectionInput;
  RecordTransactionInput: RecordTransactionInput;
  String: Scalars['String']['output'];
  Transaction: Transaction;
  UpdateItemInput: UpdateItemInput;
  UpdateItemMutationResponse: UpdateItemMutationResponse;
  UpdateLocationInput: UpdateLocationInput;
  UpdateLocationMutationResponse: UpdateLocationMutationResponse;
  UpdateMachineInput: UpdateMachineInput;
  UpdateMachineItemInput: UpdateMachineItemInput;
  UpdateMachineItemMutationResponse: UpdateMachineItemMutationResponse;
  UpdateMachineItemsInput: UpdateMachineItemsInput;
  UpdateMachineItemsMutationResponse: UpdateMachineItemsMutationResponse;
  UpdateMachineLocationInput: UpdateMachineLocationInput;
  UpdateMachineLocationMutationResponse: UpdateMachineLocationMutationResponse;
  UpdateMachineManufacturerInput: UpdateMachineManufacturerInput;
  UpdateMachineManufacturerMutationResponse: UpdateMachineManufacturerMutationResponse;
  UpdateMachineMutationResponse: UpdateMachineMutationResponse;
  UpdateMachineTypeInput: UpdateMachineTypeInput;
  UpdateMachineTypeMutationResponse: UpdateMachineTypeMutationResponse;
  UpdateUserInput: UpdateUserInput;
  UpdateUserMutationResponse: UpdateUserMutationResponse;
  User: User;
};

export type RequirePermissionDirectiveArgs = {
  operator?: Maybe<PermissionOperator>;
  permissions: Array<Permission>;
};

export type RequirePermissionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = RequirePermissionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuditLogResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuditLog'] = ResolversParentTypes['AuditLog']
> = {
  action?: Resolver<ResolversTypes['AuditAction'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  newValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oldValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CashCollectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CashCollection'] = ResolversParentTypes['CashCollection']
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  collectedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateItemMutationResponse'] = ResolversParentTypes['CreateItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateLocationMutationResponse'] = ResolversParentTypes['CreateLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateMachineItemMutationResponse'] = ResolversParentTypes['CreateMachineItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItem?: Resolver<Maybe<ResolversTypes['MachineItem']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateMachineLocationMutationResponse'] = ResolversParentTypes['CreateMachineLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<Maybe<ResolversTypes['MachineLocation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineManufacturerMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateMachineManufacturerMutationResponse'] = ResolversParentTypes['CreateMachineManufacturerMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateMachineMutationResponse'] = ResolversParentTypes['CreateMachineMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineTypeMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateMachineTypeMutationResponse'] = ResolversParentTypes['CreateMachineTypeMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateUserMutationResponse'] = ResolversParentTypes['CreateUserMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteItemMutationResponse'] = ResolversParentTypes['DeleteItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteLocationMutationResponse'] = ResolversParentTypes['DeleteLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteMachineItemMutationResponse'] = ResolversParentTypes['DeleteMachineItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteMachineLocationMutationResponse'] = ResolversParentTypes['DeleteMachineLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineManufacturerMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteMachineManufacturerMutationResponse'] = ResolversParentTypes['DeleteMachineManufacturerMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteMachineMutationResponse'] = ResolversParentTypes['DeleteMachineMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineTypeMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteMachineTypeMutationResponse'] = ResolversParentTypes['DeleteMachineTypeMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteUserMutationResponse'] = ResolversParentTypes['DeleteUserMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']
> = {
  basePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationPeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineLocation']>>>, ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stateOrProvince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']
> = {
  cashCollections?: Resolver<Array<ResolversTypes['CashCollection']>, ParentType, ContextType>;
  cashOnHand?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  machineLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineLocation']>>>, ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineItem'] = ResolversParentTypes['MachineItem']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  setPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineLocation'] = ResolversParentTypes['MachineLocation']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  locationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineManufacturerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineManufacturer'] = ResolversParentTypes['MachineManufacturer']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineType']>>>, ParentType, ContextType>;
  machines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineType'] = ResolversParentTypes['MachineType']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  manufacturer?: Resolver<ResolversTypes['MachineManufacturer'], ParentType, ContextType>;
  manufacturerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createItem?: Resolver<
    ResolversTypes['CreateItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateItemArgs, 'input'>
  >;
  createLocation?: Resolver<
    ResolversTypes['CreateLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLocationArgs, 'input'>
  >;
  createMachine?: Resolver<
    ResolversTypes['CreateMachineMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMachineArgs, 'input'>
  >;
  createMachineItem?: Resolver<
    ResolversTypes['CreateMachineItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMachineItemArgs, 'input'>
  >;
  createMachineLocation?: Resolver<
    ResolversTypes['CreateMachineLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMachineLocationArgs, 'input'>
  >;
  createMachineManufacturer?: Resolver<
    ResolversTypes['CreateMachineManufacturerMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMachineManufacturerArgs, 'input'>
  >;
  createMachineType?: Resolver<
    ResolversTypes['CreateMachineTypeMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMachineTypeArgs, 'input'>
  >;
  createUser?: Resolver<
    ResolversTypes['CreateUserMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >;
  deleteItem?: Resolver<
    ResolversTypes['DeleteItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteItemArgs, 'id'>
  >;
  deleteLocation?: Resolver<
    ResolversTypes['DeleteLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLocationArgs, 'id'>
  >;
  deleteMachine?: Resolver<
    ResolversTypes['DeleteMachineMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMachineArgs, 'id'>
  >;
  deleteMachineItem?: Resolver<
    ResolversTypes['DeleteMachineItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMachineItemArgs, 'id'>
  >;
  deleteMachineLocation?: Resolver<
    ResolversTypes['DeleteMachineLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMachineLocationArgs, 'id'>
  >;
  deleteMachineManufacturer?: Resolver<
    ResolversTypes['DeleteMachineManufacturerMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMachineManufacturerArgs, 'id'>
  >;
  deleteMachineType?: Resolver<
    ResolversTypes['DeleteMachineTypeMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMachineTypeArgs, 'id'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['DeleteUserMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
  >;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  recordCashCollection?: Resolver<
    ResolversTypes['CashCollection'],
    ParentType,
    ContextType,
    RequireFields<MutationRecordCashCollectionArgs, 'input'>
  >;
  recordTransaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType,
    RequireFields<MutationRecordTransactionArgs, 'input'>
  >;
  updateItem?: Resolver<
    ResolversTypes['UpdateItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateItemArgs, 'input'>
  >;
  updateLocation?: Resolver<
    ResolversTypes['UpdateLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLocationArgs, 'input'>
  >;
  updateMachine?: Resolver<
    ResolversTypes['UpdateMachineMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineArgs, 'input'>
  >;
  updateMachineItem?: Resolver<
    ResolversTypes['UpdateMachineItemMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineItemArgs, 'input'>
  >;
  updateMachineItems?: Resolver<
    ResolversTypes['UpdateMachineItemsMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineItemsArgs, 'input'>
  >;
  updateMachineLocation?: Resolver<
    ResolversTypes['UpdateMachineLocationMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineLocationArgs, 'input'>
  >;
  updateMachineManufacturer?: Resolver<
    ResolversTypes['UpdateMachineManufacturerMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineManufacturerArgs, 'input'>
  >;
  updateMachineType?: Resolver<
    ResolversTypes['UpdateMachineTypeMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMachineTypeArgs, 'input'>
  >;
  updateUser?: Resolver<
    ResolversTypes['UpdateUserMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >;
};

export type MutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']
> = {
  __resolveType: TypeResolveFn<
    | 'CreateItemMutationResponse'
    | 'CreateLocationMutationResponse'
    | 'CreateMachineItemMutationResponse'
    | 'CreateMachineLocationMutationResponse'
    | 'CreateMachineManufacturerMutationResponse'
    | 'CreateMachineMutationResponse'
    | 'CreateMachineTypeMutationResponse'
    | 'CreateUserMutationResponse'
    | 'DeleteItemMutationResponse'
    | 'DeleteLocationMutationResponse'
    | 'DeleteMachineItemMutationResponse'
    | 'DeleteMachineLocationMutationResponse'
    | 'DeleteMachineManufacturerMutationResponse'
    | 'DeleteMachineMutationResponse'
    | 'DeleteMachineTypeMutationResponse'
    | 'DeleteUserMutationResponse'
    | 'LoginResponse'
    | 'UpdateItemMutationResponse'
    | 'UpdateLocationMutationResponse'
    | 'UpdateMachineItemMutationResponse'
    | 'UpdateMachineItemsMutationResponse'
    | 'UpdateMachineLocationMutationResponse'
    | 'UpdateMachineManufacturerMutationResponse'
    | 'UpdateMachineMutationResponse'
    | 'UpdateMachineTypeMutationResponse'
    | 'UpdateUserMutationResponse',
    ParentType,
    ContextType
  >;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type PaginatedAuditLogsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedAuditLogs'] = ResolversParentTypes['PaginatedAuditLogs']
> = {
  logs?: Resolver<Array<ResolversTypes['AuditLog']>, ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getAuditLogs?: Resolver<
    ResolversTypes['PaginatedAuditLogs'],
    ParentType,
    ContextType,
    RequireFields<QueryGetAuditLogsArgs, 'page' | 'pageSize'>
  >;
  getEntityChanges?: Resolver<
    Array<ResolversTypes['AuditLog']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEntityChangesArgs, 'entityId' | 'entityType'>
  >;
  getItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  getItemsByMachine?: Resolver<
    Maybe<Array<ResolversTypes['MachineItem']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetItemsByMachineArgs, 'machineId'>
  >;
  getLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  getLocationsByItem?: Resolver<
    Maybe<Array<ResolversTypes['Location']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLocationsByItemArgs, 'itemId'>
  >;
  getLocationsByMachineName?: Resolver<
    Array<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLocationsByMachineNameArgs, 'machineName'>
  >;
  getMachine?: Resolver<
    Maybe<ResolversTypes['Machine']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachineArgs, 'machineId'>
  >;
  getMachineCashCollections?: Resolver<
    Array<ResolversTypes['CashCollection']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachineCashCollectionsArgs, 'machineId'>
  >;
  getMachineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  getMachineLocations?: Resolver<Maybe<Array<ResolversTypes['MachineLocation']>>, ParentType, ContextType>;
  getMachineManufacturer?: Resolver<
    Maybe<ResolversTypes['MachineManufacturer']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachineManufacturerArgs, 'id'>
  >;
  getMachineManufacturers?: Resolver<Array<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  getMachineTransactions?: Resolver<
    Array<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachineTransactionsArgs, 'machineId'>
  >;
  getMachineType?: Resolver<
    Maybe<ResolversTypes['MachineType']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachineTypeArgs, 'id'>
  >;
  getMachineTypes?: Resolver<Array<ResolversTypes['MachineType']>, ParentType, ContextType>;
  getMachines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  getMachinesByItem?: Resolver<
    Maybe<Array<ResolversTypes['MachineItem']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachinesByItemArgs, 'itemId'>
  >;
  getMachinesByLocation?: Resolver<
    Maybe<Array<ResolversTypes['Machine']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMachinesByLocationArgs, 'locationId'>
  >;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUserChanges?: Resolver<
    Array<ResolversTypes['AuditLog']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserChangesArgs, 'userId'>
  >;
  getUserPermissions?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserPermissionsArgs, 'id'>
  >;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  method?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateItemMutationResponse'] = ResolversParentTypes['UpdateItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateLocationMutationResponse'] = ResolversParentTypes['UpdateLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineItemMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineItemMutationResponse'] = ResolversParentTypes['UpdateMachineItemMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItem?: Resolver<Maybe<ResolversTypes['MachineItem']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineItemsMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineItemsMutationResponse'] = ResolversParentTypes['UpdateMachineItemsMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineLocationMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineLocationMutationResponse'] = ResolversParentTypes['UpdateMachineLocationMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<Maybe<ResolversTypes['MachineLocation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineManufacturerMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineManufacturerMutationResponse'] = ResolversParentTypes['UpdateMachineManufacturerMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineMutationResponse'] = ResolversParentTypes['UpdateMachineMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineTypeMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateMachineTypeMutationResponse'] = ResolversParentTypes['UpdateMachineTypeMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserMutationResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateUserMutationResponse'] = ResolversParentTypes['UpdateUserMutationResponse']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuditLog?: AuditLogResolvers<ContextType>;
  CashCollection?: CashCollectionResolvers<ContextType>;
  CreateItemMutationResponse?: CreateItemMutationResponseResolvers<ContextType>;
  CreateLocationMutationResponse?: CreateLocationMutationResponseResolvers<ContextType>;
  CreateMachineItemMutationResponse?: CreateMachineItemMutationResponseResolvers<ContextType>;
  CreateMachineLocationMutationResponse?: CreateMachineLocationMutationResponseResolvers<ContextType>;
  CreateMachineManufacturerMutationResponse?: CreateMachineManufacturerMutationResponseResolvers<ContextType>;
  CreateMachineMutationResponse?: CreateMachineMutationResponseResolvers<ContextType>;
  CreateMachineTypeMutationResponse?: CreateMachineTypeMutationResponseResolvers<ContextType>;
  CreateUserMutationResponse?: CreateUserMutationResponseResolvers<ContextType>;
  DeleteItemMutationResponse?: DeleteItemMutationResponseResolvers<ContextType>;
  DeleteLocationMutationResponse?: DeleteLocationMutationResponseResolvers<ContextType>;
  DeleteMachineItemMutationResponse?: DeleteMachineItemMutationResponseResolvers<ContextType>;
  DeleteMachineLocationMutationResponse?: DeleteMachineLocationMutationResponseResolvers<ContextType>;
  DeleteMachineManufacturerMutationResponse?: DeleteMachineManufacturerMutationResponseResolvers<ContextType>;
  DeleteMachineMutationResponse?: DeleteMachineMutationResponseResolvers<ContextType>;
  DeleteMachineTypeMutationResponse?: DeleteMachineTypeMutationResponseResolvers<ContextType>;
  DeleteUserMutationResponse?: DeleteUserMutationResponseResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  MachineItem?: MachineItemResolvers<ContextType>;
  MachineLocation?: MachineLocationResolvers<ContextType>;
  MachineManufacturer?: MachineManufacturerResolvers<ContextType>;
  MachineType?: MachineTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  PaginatedAuditLogs?: PaginatedAuditLogsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  UpdateItemMutationResponse?: UpdateItemMutationResponseResolvers<ContextType>;
  UpdateLocationMutationResponse?: UpdateLocationMutationResponseResolvers<ContextType>;
  UpdateMachineItemMutationResponse?: UpdateMachineItemMutationResponseResolvers<ContextType>;
  UpdateMachineItemsMutationResponse?: UpdateMachineItemsMutationResponseResolvers<ContextType>;
  UpdateMachineLocationMutationResponse?: UpdateMachineLocationMutationResponseResolvers<ContextType>;
  UpdateMachineManufacturerMutationResponse?: UpdateMachineManufacturerMutationResponseResolvers<ContextType>;
  UpdateMachineMutationResponse?: UpdateMachineMutationResponseResolvers<ContextType>;
  UpdateMachineTypeMutationResponse?: UpdateMachineTypeMutationResponseResolvers<ContextType>;
  UpdateUserMutationResponse?: UpdateUserMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  requirePermission?: RequirePermissionDirectiveResolver<any, any, ContextType>;
};
