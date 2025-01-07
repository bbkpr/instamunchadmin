import React, { useState } from 'react';
import { Container, Table, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { useMachines } from '@/hooks/useMachines';
import { Machine } from '@/generated/graphql';

interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export function MachineList() {
  const { machines, machineTypes, machineManufacturers, loading, error, createMachine, updateMachine, deleteMachine } =
    useMachines();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState<MachineFormData>({
    name: '',
    machineTypeId: '',
    manufacturerId: ''
  });

  const handleEditClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormData({
      name: machine.name,
      machineTypeId: machine.machineType!.id,
      manufacturerId: machine.manufacturer!.id
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMachine) {
        await updateMachine({
          id: selectedMachine.id,
          ...formData
        });
      } else {
        await createMachine(formData);
      }
      setShowEditModal(false);
      setSelectedMachine(null);
      setFormData({
        name: '',
        machineTypeId: '',
        manufacturerId: ''
      });
    } catch (err) {
      console.error('Error saving machine:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedMachine) return;
    try {
      await deleteMachine(selectedMachine.id);
      setShowDeleteModal(false);
      setSelectedMachine(null);
    } catch (err) {
      console.error('Error deleting machine:', err);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger" role="alert">
          Error loading machines: {error.message}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Machines</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedMachine(null);
            setShowEditModal(true);
          }}
        >
          Add Machine
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Items Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.name}</td>
              <td>{machine.machineType?.name}</td>
              <td>{machine.manufacturer?.name}</td>
              <td>{machine.machineItems?.length || 0}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditClick(machine)}>
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(machine)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMachine ? 'Edit Machine' : 'Add Machine'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.machineTypeId}
                onChange={(e) => setFormData((prev) => ({ ...prev, machineTypeId: e.target.value }))}
                required
              >
                <option value="">Select a type...</option>
                {machineTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Select
                value={formData.manufacturerId}
                onChange={(e) => setFormData((prev) => ({ ...prev, manufacturerId: e.target.value }))}
                required
              >
                <option value="">Select a manufacturer...</option>
                {machineManufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the machine "{selectedMachine?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
