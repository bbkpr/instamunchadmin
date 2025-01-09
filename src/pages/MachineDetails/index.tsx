// pages/MachineDetails.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Spinner } from 'react-bootstrap';
import { useMachine } from '@/hooks/useMachine';
import { Item, MachineItem } from '@/generated/graphql';

interface ItemFormData {
  itemId: string;
  quantity: number;
  name?: string;
}

export function MachineDetails() {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const { machine, items, loading, error, addMachineItem, updateMachineItems, deleteMachineItem } = useMachine(
    machineId!
  );

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<ItemFormData>({
    itemId: '',
    quantity: 0
  });

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !machine) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger">{error?.message || 'Machine not found'}</div>
      </Container>
    );
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMachineItem(formData);
      setShowAddItemModal(false);
      setFormData({ itemId: '', quantity: 0 });
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMachineItems(machine.id, [
        {
          id: selectedItem.id,
          quantity: formData.quantity
        }
      ]);
      setShowEditItemModal(false);
      setSelectedItem(null);
      setFormData({ itemId: '', quantity: 0 });
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    try {
      await deleteMachineItem(selectedItem.id);
      setShowDeleteItemModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Button variant="secondary" onClick={() => navigate('/machines')} className="mb-3">
            ← Back to Machines
          </Button>
          <h2>{machine.name}</h2>
          <p className="text-muted">
            Type: {machine.machineType?.name} | Manufacturer: {machine.manufacturer?.name}
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Items</h5>
              <Button variant="primary" size="sm" onClick={() => setShowAddItemModal(true)}>
                Add Item
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Base Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {machine.machineItems?.map((machineItem: MachineItem) => (
                    <tr key={machineItem.id}>
                      <td>{machineItem.item?.name}</td>
                      <td>${machineItem.item?.basePrice?.toFixed(2)}</td>
                      <td>{machineItem.quantity}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setSelectedItem(machineItem);
                            setFormData({
                              itemId: machineItem.item!.id,
                              quantity: machineItem.quantity
                            });
                            setShowEditItemModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(machineItem);
                            setShowDeleteItemModal(true);
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {!machine.machineItems?.length && (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No items in this machine
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <Modal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}>
        <Form onSubmit={handleAddItem}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Item</Form.Label>
              <Form.Select
                value={formData.itemId}
                onChange={(e) => setFormData((prev) => ({ ...prev, itemId: e.target.value }))}
                required
              >
                <option value="">Select an item...</option>
                {items.map((item: Item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} (${item.basePrice?.toFixed(2)})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddItemModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditItemModal} onHide={() => setShowEditItemModal(false)}>
        <Form onSubmit={handleEditItem}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item Quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditItemModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Item Modal */}
      <Modal show={showDeleteItemModal} onHide={() => setShowDeleteItemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove {selectedItem?.item?.name} from this machine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteItemModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
