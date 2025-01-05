import React from 'react';
import { Container, Table, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { useMachines } from '@/hooks/useMachines';
import { Machine } from '@/generated/graphql';

interface EditableField {
  fieldName: 'name' | 'machineTypeId' | 'manufacturerId';
  machineId: string;
  originalValue: string;
}

interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export function MachineList() {
  const [editingField, setEditingField] = React.useState<EditableField | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null);

  const { machines, loading, error, updateMachine, deleteMachine, machineTypes, manufacturers } = useMachines();

  const handleEditClick = (field: EditableField) => {
    setEditingField(field);
    setEditValue(field.originalValue);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleSubmitEdit = async () => {
    if (!editingField) return;

    const machine = machines.find((m) => m.id === editingField.machineId);
    if (!machine) return;

    try {
      await updateMachine({
        id: editingField.machineId,
        name: editingField.fieldName === 'name' ? editValue : machine.name,
        machineTypeId: editingField.fieldName === 'machineTypeId' ? editValue : machine.machineType!.id,
        manufacturerId: editingField.fieldName === 'manufacturerId' ? editValue : machine.manufacturer!.id
      });
      setEditingField(null);
      setEditValue('');
    } catch (err) {
      console.error('Error updating machine:', err);
    }
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

  const renderEditableCell = (
    machine: Machine,
    fieldName: EditableField['fieldName'],
    displayValue: string,
    options?: { id: string; name: string }[]
  ) => {
    const isEditing = editingField?.machineId === machine.id && editingField?.fieldName === fieldName;

    if (isEditing) {
      return (
        <div className="d-flex align-items-center">
          {options ? (
            <Form.Select value={editValue} onChange={(e) => setEditValue(e.target.value)} size="sm" className="me-2">
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              size="sm"
              className="me-2"
            />
          )}
          <Button variant="success" size="sm" className="me-1" onClick={handleSubmitEdit}>
            ✓
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
            ✗
          </Button>
        </div>
      );
    }

    return (
      <div className="d-flex align-items-center justify-content-between">
        {displayValue}
        <Button
          variant="link"
          size="sm"
          className="p-0 ms-2"
          onClick={() =>
            handleEditClick({
              fieldName,
              machineId: machine.id,
              originalValue: options
                ? fieldName === 'machineTypeId'
                  ? machine.machineType!.id
                  : machine.manufacturer!.id
                : machine.name
            })
          }
        >
          ✎
        </Button>
      </div>
    );
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
              <td>{renderEditableCell(machine, 'name', machine.name)}</td>
              <td>{renderEditableCell(machine, 'machineTypeId', machine.machineType!.name, machineTypes)}</td>
              <td>{renderEditableCell(machine, 'manufacturerId', machine.manufacturer!.name, manufacturers)}</td>
              <td>{machine.machineItems!.length}</td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(machine)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the machine "{machineToDelete?.name}"? This action cannot be undone.
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
