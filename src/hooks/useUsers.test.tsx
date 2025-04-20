import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Role } from '../generated/graphql';

// Properly hoist mocks
const mockNavigate = vi.hoisted(() => vi.fn());
const mockResetStore = vi.hoisted(() => vi.fn());
const mockUseQuery = vi.hoisted(() => vi.fn());
const mockUseMutation = vi.hoisted(() => vi.fn());

const mockLocalStorage = vi.hoisted(() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    _store: store // For direct access in tests
  };
});

// Mock modules before importing useUsers
vi.mock('@apollo/client', () => {
  return {
    useQuery: mockUseQuery,
    useMutation: mockUseMutation,
    gql: (literals: TemplateStringsArray) => literals[0]
  };
});

vi.mock('../graphql/templates/user.template', () => ({
  GET_ME: 'GET_ME_QUERY',
  GET_USERS: 'GET_USERS_QUERY',
  CREATE_USER: 'CREATE_USER_MUTATION',
  UPDATE_USER: 'UPDATE_USER_MUTATION',
  DELETE_USER: 'DELETE_USER_MUTATION'
}));

vi.mock('../graphql/templates/auth.template', () => ({
  LOGIN: 'LOGIN_MUTATION'
}));

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate
}));

vi.mock('../graphql/apolloClient', () => ({
  client: {
    resetStore: mockResetStore
  }
}));

// Now import useUsers after all mocks are set up
import { useUsers } from './useUsers';

// Setup localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Setup mock data
const mockUser = {
  id: 'user123',
  email: 'test@example.com',
  name: 'Test User',
  role: Role.Administrator,
  tenantId: 'tenant123'
};

const mockUsers = [
  mockUser,
  {
    id: 'user456',
    email: 'user2@example.com',
    name: 'User Two',
    role: Role.Technician,
    tenantId: 'tenant123'
  }
];

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  it('should return current user and authentication status', () => {
    // Setup mocks for GET_ME and GET_USERS queries
    mockUseQuery
      .mockReturnValueOnce({
        data: { me: mockUser },
        loading: false,
        error: null
      })
      .mockReturnValueOnce({
        data: { getUsers: mockUsers },
        loading: false,
        error: null
      });

    // Mock empty login mutation response
    mockUseMutation.mockReturnValue([vi.fn()]);

    // Test the hook
    const { currentUser, isAuthenticated, users } = useUsers();

    // Assertions
    expect(currentUser).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
    expect(users).toEqual(mockUsers);
  });

  it('should handle login correctly', async () => {
    // Create login mutation mock function
    const loginMock = vi.fn().mockResolvedValue({
      data: {
        login: {
          code: '200',
          success: true,
          message: 'Login successful',
          token: 'fake-token',
          user: mockUser
        }
      }
    });

    // Setup query mocks
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    });

    // Setup mutation mocks
    mockUseMutation
      .mockReturnValueOnce([loginMock]) // First mock is for login
      .mockReturnValue([vi.fn()]); // Default for other mutations

    // Test the hook
    const { login } = useUsers();

    // Call the login function
    const result = await login({
      email: 'test@example.com',
      password: 'password123'
    });

    // Assertions
    expect(loginMock).toHaveBeenCalledWith({
      variables: {
        input: {
          email: 'test@example.com',
          password: 'password123'
        }
      },
      refetchQueries: expect.any(Array)
    });

    expect(result).toEqual({
      code: '200',
      success: true,
      message: 'Login successful',
      token: 'fake-token',
      user: mockUser
    });
  });

  it('should handle logout correctly', async () => {
    // Setup query mocks
    mockUseQuery.mockReturnValue({
      data: { me: mockUser },
      loading: false,
      error: null
    });

    // Setup mutation mocks
    mockUseMutation.mockReturnValue([vi.fn()]);

    // Set token in localStorage
    mockLocalStorage.setItem('token', 'test-token');

    // Test the hook
    const { logout } = useUsers();

    // Call logout
    await logout();

    // Assertions
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockResetStore).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should handle createUser correctly', async () => {
    // Create createUser mutation mock function
    const createUserMock = vi.fn().mockResolvedValue({
      data: {
        createUser: {
          code: '200',
          success: true,
          message: 'User created',
          user: {
            id: 'new123',
            email: 'new@example.com',
            name: 'New User',
            role: Role.Operator,
            tenantId: 'tenant123'
          }
        }
      }
    });

    // Setup query mocks
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    });

    // Setup mutation mocks
    mockUseMutation
      .mockReturnValueOnce([vi.fn()]) // First mock is for login
      .mockReturnValueOnce([createUserMock]) // Second mock is for createUser
      .mockReturnValue([vi.fn()]); // Default for other mutations

    // Test the hook
    const { createUser } = useUsers();

    // Call createUser
    const result = await createUser({
      email: 'new@example.com',
      password: 'newpass123',
      name: 'New User',
      role: Role.Operator
    });

    // Assertions
    expect(createUserMock).toHaveBeenCalledWith({
      variables: {
        input: {
          email: 'new@example.com',
          password: 'newpass123',
          name: 'New User',
          role: Role.Operator
        }
      },
      refetchQueries: expect.any(Array)
    });

    expect(result).toEqual({
      id: 'new123',
      email: 'new@example.com',
      name: 'New User',
      role: Role.Operator,
      tenantId: 'tenant123'
    });
  });

  it('should handle updateUser correctly', async () => {
    // Create updateUser mutation mock function
    const updateUserMock = vi.fn().mockResolvedValue({
      data: {
        updateUser: {
          code: '200',
          success: true,
          message: 'User updated',
          user: {
            id: 'user123',
            email: 'updated@example.com',
            name: 'Updated User',
            role: Role.Operator,
            tenantId: 'tenant123'
          }
        }
      }
    });

    // Setup query mocks
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    });

    // Setup mutation mocks
    mockUseMutation
      .mockReturnValueOnce([vi.fn()]) // First mock is for login
      .mockReturnValueOnce([vi.fn()]) // Second mock is for createUser
      .mockReturnValueOnce([updateUserMock]) // Third mock is for updateUser
      .mockReturnValue([vi.fn()]); // Default for other mutations

    // Test the hook
    const { updateUser } = useUsers();

    // Call updateUser
    const result = await updateUser({
      id: 'user123',
      email: 'updated@example.com',
      name: 'Updated User',
      role: Role.Operator
    });

    // Assertions
    expect(updateUserMock).toHaveBeenCalledWith({
      variables: {
        input: {
          id: 'user123',
          email: 'updated@example.com',
          name: 'Updated User',
          role: Role.Operator
        }
      },
      refetchQueries: expect.any(Array)
    });

    expect(result).toEqual({
      id: 'user123',
      email: 'updated@example.com',
      name: 'Updated User',
      role: Role.Operator,
      tenantId: 'tenant123'
    });
  });

  it('should handle deleteUser correctly', async () => {
    // Create deleteUser mutation mock function
    const deleteUserMock = vi.fn().mockResolvedValue({
      data: {
        deleteUser: {
          code: '200',
          success: true,
          message: 'User deleted'
        }
      }
    });

    // Setup query mocks
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    });

    // Setup mutation mocks
    mockUseMutation
      .mockReturnValueOnce([vi.fn()]) // First mock is for login
      .mockReturnValueOnce([vi.fn()]) // Second mock is for createUser
      .mockReturnValueOnce([vi.fn()]) // Third mock is for updateUser
      .mockReturnValueOnce([deleteUserMock]); // Fourth mock is for deleteUser

    // Test the hook
    const { deleteUser } = useUsers();

    // Call deleteUser
    await deleteUser('user123');

    // Assertions
    expect(deleteUserMock).toHaveBeenCalledWith({
      variables: { id: 'user123' },
      refetchQueries: expect.any(Array)
    });
  });
});
