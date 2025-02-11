import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { useUsers } from '@/hooks/useUsers';
import { client } from '@/graphql/apolloClient';

export function Logout() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, login, logout } = useUsers();

  const handleLogout = async () => {
    console.log(`Logging out ${currentUser?.email}`);
    localStorage.removeItem('token');
    await client.resetStore();
    navigate('/login');
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  return (
    <Button
      variant={isAuthenticated ? 'outline-danger' : 'outline-primary'}
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  );
}
