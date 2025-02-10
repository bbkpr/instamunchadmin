// src/hooks/useUsers.ts
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER, DELETE_USER, GET_ME, GET_USERS, UPDATE_USER } from '@/graphql/templates/user.template';
import { LoginInput, Role, User } from '@/generated/graphql';
import { LOGIN } from '@/graphql/templates/auth.template';

interface UserInput {
  email: string;
  password?: string;
  name: string;
  role: Role;
}

interface UpdateUserInput extends UserInput {
  id: string;
}

export function useUsers() {
  const { data: meData } = useQuery(GET_ME);
  const { data, loading, error } = useQuery(GET_USERS);

  const [loginMutation] = useMutation(LOGIN);

  const [createUserMutation] = useMutation(CREATE_USER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  const login = async (input: LoginInput) => {
    const result = await loginMutation({
      variables: { input },
      refetchQueries: [{ query: GET_ME }, { query: GET_USERS }]
    });
    console.log(`login result: ${JSON.stringify(result)}`);
    return result.data.login;
  };

  const createUser = async (input: UserInput) => {
    const result = await createUserMutation({
      variables: { input },
      refetchQueries: [{ query: GET_USERS }]
    });
    return result.data.createUser.user;
  };

  const updateUser = async (input: UpdateUserInput) => {
    const result = await updateUserMutation({
      variables: { input },
      refetchQueries: [{ query: GET_USERS }]
    });
    return result.data.updateUser.user;
  };

  const deleteUser = async (id: string) => {
    await deleteUserMutation({
      variables: { id },
      refetchQueries: [{ query: GET_USERS }]
    });
  };

  return {
    currentUser: meData?.me,
    users: (data?.getUsers as User[]) || [],
    loading,
    error,
    login,
    createUser,
    updateUser,
    deleteUser
  };
}
