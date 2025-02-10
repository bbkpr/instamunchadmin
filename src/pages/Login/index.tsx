import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/templates/auth.template';
import { useNavigate } from 'react-router';
import { useUsers } from '@/hooks/useUsers';

export function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login, loading } = useUsers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const loginResult = await login(formData);

      console.log(`login handleSubmit data`, loginResult);
      if (loginResult.success) {
        localStorage.setItem('token', loginResult.token);
        navigate('/');
      } else {
        setError(loginResult.message);
      }
    } catch (err) {
      console.log(`login handleSubmit err`, err);
      setError('Login failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
