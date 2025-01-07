import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';
import { Container, Alert } from 'react-bootstrap';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    info: null
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info });
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return <ErrorBoundaryFallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

export const ErrorBoundaryFallbackComponent: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
    <Alert variant="danger" className="p-4 text-center">
      <h4 className="alert-heading">An error occurred!</h4>
      <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
    </Alert>
  </Container>
);
