import React from 'react';
import { Container, Table, Button, Spinner, Modal } from 'react-bootstrap';
import { useMachines } from '@/hooks/useMachines';
import { MachineForm } from '@/components/MachineForm';
import { Machine } from '@/models';

interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export function MachineList() {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedMachine, setSelectedMachine] = React.useState<Machine | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null);

  const { machines, loading, error, createMachine, updateMachine, deleteMachine } = useMachines();

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedMachine(null);
  };

  const handleDeleteClick = (machine: Machine) => {
    setMachineToDelete(machine);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!machineToDelete) return;

    try {
      await deleteMachine(machineToDelete.id);
      setShowDeleteConfirm(false);
      setMachineToDelete(null);
    } catch (err) {
      console.error('Error deleting machine:', err);
    }
  };

  const handleFormSubmit = async (formData: MachineFormData) => {
    try {
      if (selectedMachine) {
        await updateMachine({
          id: selectedMachine.id,
          ...formData
        });
      } else {
        await createMachine(formData);
      }
      handleFormClose();
    } catch (err) {
      console.error('Error saving machine:', err);
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
        <Button variant="primary" onClick={() => setShowForm(true)}>
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
        {machines.map((machine: any) => (
          <tr key={machine.id}>
            <td>{machine.name}</td>
            <td>{machine.machineType.name}</td>
            <td>{machine.manufacturer.name}</td>
            <td>{machine.machineItems.length}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(machine)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteClick(machine)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      {selectedMachine && (
        <MachineForm
          show={showForm}
          onHide={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={selectedMachine ? {
            name: selectedMachine.name,
            machineTypeId: selectedMachine.machineType.id,
            manufacturerId: selectedMachine.manufacturer.id
          } : undefined}
        />
      )}

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the machine "{machineToDelete?.name}"?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}