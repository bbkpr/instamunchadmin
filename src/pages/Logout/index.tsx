import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { client } from '@/graphql/apolloClient';

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.resetStore();
    navigate('/login');
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}
