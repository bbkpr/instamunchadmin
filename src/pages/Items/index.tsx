import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Spinner, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useItems } from '@/hooks/useItems';
import { Item } from '@/generated/graphql';

interface ItemFormData {
  name: string;
  basePrice: number;
  expirationPeriod: number;
}

export function Items() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useItems();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    basePrice: 0,
    expirationPeriod: 90
  });

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger">Error loading items: {error.message}</div>
      </Container>
    );
  }

  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      basePrice: item.basePrice || 0,
      expirationPeriod: item.expirationPeriod || 90
    });
    setShowEditModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        await updateItem({
          id: selectedItem.id,
          ...formData
        });
      } else {
        await createItem(formData);
      }
      setShowEditModal(false);
      setSelectedItem(null);
      setFormData({
        name: '',
        basePrice: 0,
        expirationPeriod: 180
      });
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await deleteItem(selectedItem.id);
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Container className="py-4" fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Items</h2>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>
          Add Item
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Price</th>
            <th>Expiration Period</th>
            <th>Used In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.basePrice?.toFixed(2)}</td>
              <td>{item.expirationPeriod} days</td>
              <td>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip>
                      {item.machineItems && item.machineItems.length > 0 ? (
                        <div>
                          {item.machineItems.map((mi) => (
                            <div key={mi?.machine?.id}>
                              {mi?.machine?.name}
                              {mi?.setPrice && ` ($${mi?.setPrice.toFixed(2)})`}
                              {mi?.quantity && ` - Qty: ${mi?.quantity}`}
                            </div>
                          ))}
                        </div>
                      ) : (
                        'Not used in any machines'
                      )}
                    </Tooltip>
                  }
                >
                  <Badge bg="secondary" style={{ cursor: 'help' }}>
                    {item.machineItems?.length || 0} machines
                  </Badge>
                </OverlayTrigger>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(item)}>
                    ✏
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteModal(true);
                    }}
                    disabled={!(item.machineItems && item.machineItems.length > 0)}
                  >
                    ❌
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? 'Edit Item' : 'Add Item'}</Modal.Title>
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
              <Form.Label>Base Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                value={formData.basePrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, basePrice: parseFloat(e.target.value) }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiration Period (days)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={formData.expirationPeriod}
                onChange={(e) => setFormData((prev) => ({ ...prev, expirationPeriod: parseInt(e.target.value) }))}
                required
              />
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
          Are you sure you want to delete {selectedItem?.name}? This action cannot be undone.
          {selectedItem?.machineItems && selectedItem.machineItems.length > 0 && (
            <div className="alert alert-warning mt-3">
              This item cannot be deleted because it is currently used in {selectedItem.machineItems.length} machines.
              Remove it from all machines first.
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={selectedItem?.machineItems != null && selectedItem.machineItems.length > 0}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
