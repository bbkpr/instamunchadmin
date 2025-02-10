import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { useUsers } from '@/hooks/useUsers';
import { client } from '@/graphql/apolloClient';

export function Logout() {
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  console.log('currentUser', currentUser);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await client.resetStore();
    navigate('/login');
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  return currentUser != null ? (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button variant="outline-primary" onClick={handleLogin}>
      Login
    </Button>
  );
}
