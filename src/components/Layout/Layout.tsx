import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';
import { Logout } from '@/pages/Logout';
import { useUsers } from '@/hooks/useUsers';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { currentUser } = useUsers();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            InstaMunch Vending
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser && (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" active={['/', '/machines'].includes(location.pathname)}>
                  Machines
                </Nav.Link>
                <Nav.Link as={Link} to="/locations" active={location.pathname === '/locations'}>
                  Locations
                </Nav.Link>
                <Nav.Link as={Link} to="/items" active={location.pathname === '/items'}>
                  Items
                </Nav.Link>
                {currentUser.role === 'ADMINISTRATOR' && (
                  <>
                    <Nav.Link as={Link} to="/users" active={location.pathname === '/users'}>
                      Users
                    </Nav.Link>
                    <Nav.Link as={Link} to="/auditlogs" active={location.pathname === '/auditlogs'}>
                      Audit Logs
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={Link} to="/settings" active={location.pathname === '/settings'}>
                  Settings
                </Nav.Link>
              </Nav>
            )}
            <Logout />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>{children}</main>
    </>
  );
}
