import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/templates/user.template';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const navigate = useNavigate();
  const { loading, error } = useQuery(GET_ME, {
    onError: (error) => {
      if (
        error.message.includes('Cannot read properties of null') ||
        error.message.includes('Unauthorized') ||
        error.message.includes('Authentication required') ||
        error.message.includes('Invalid token')
      ) {
        navigate('/login');
      }
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
