// src/pages/UserSettings.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useUsers } from '@/hooks/useUsers';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function UserSettings() {
  const { currentUser, updateUser } = useUsers();
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: 'danger', text: 'New passwords do not match' });
        return;
      }

      const updateData = {
        id: currentUser!.id,
        name: formData.name,
        email: formData.email,
        role: currentUser!.role,
        ...(formData.newPassword.length > 0 && { password: formData.newPassword })
      };

      const updatedUser = await updateUser(updateData);

      if (updatedUser) {
        setMessage({ type: 'success', text: 'Settings updated successfully' });
        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to update settings' });
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">User Settings</h3>
            </Card.Header>
            <Card.Body>
              {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Theme</Form.Label>
                      <div>
                        <ThemeSwitcher />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mb-3">Change Password</h4>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password (leave blank to keep unchanged)</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
