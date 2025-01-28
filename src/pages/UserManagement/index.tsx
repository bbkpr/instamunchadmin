import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { Role, User } from '@/generated/graphql';
import { ROLE_PERMISSIONS } from '@/utils/permissions';
import { useUsers } from '@/hooks/useUsers';
import { formatEnumValue } from '@/utils/formatters';

export function UserManagement() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: Role.Technician
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser.id, ...formData });
      } else {
        await createUser(formData);
      }
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({ email: '', password: '', name: '', role: Role.Technician });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>
          Add User
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatEnumValue(user.role)}</td>
              <td>
                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  {ROLE_PERMISSIONS[user.role]
                    .sort((a, b) => a.localeCompare(b))
                    .map((permission) => (
                      <Badge key={permission} bg="secondary" className="me-1 mb-1">
                        {formatEnumValue(permission)}
                      </Badge>
                    ))}
                </div>
              </td>
              <td>
                <div className="table-button-wrap">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedUser(user);
                      setFormData({
                        email: user.email,
                        password: '',
                        name: user.name,
                        role: user.role
                      });
                      setShowEditModal(true);
                    }}
                    aria-description="Edit"
                  >
                    ✏
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                    aria-description="Delete"
                  >
                    ❌
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password {selectedUser && '(leave blank to keep unchanged)'}</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                required={!selectedUser}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as Role }))}
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {formatEnumValue(role)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (selectedUser) {
                await deleteUser(selectedUser.id);
                setShowDeleteModal(false);
                setSelectedUser(null);
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
