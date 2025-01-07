import React, { useState } from 'react';
import { Button, Table, Modal, Form, Container, Spinner } from 'react-bootstrap';
import { LocationFormData, useLocations } from '@/hooks/useLocations';
import { Location } from '@/generated/graphql';

export function Locations() {
  const { locations, loading, error, createLocation, updateLocation, deleteLocation } = useLocations();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<LocationFormData>({
    address1: '',
    city: '',
    stateOrProvince: '',
    country: ''
  });

  const handleEditClick = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      address1: location.address1,
      address2: location.address2 || '',
      city: location.city,
      stateOrProvince: location.stateOrProvince,
      country: location.country
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (location: Location) => {
    setSelectedLocation(location);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedLocation) {
        await updateLocation({
          id: selectedLocation.id,
          ...formData
        });
      } else {
        await createLocation(formData);
      }
      setShowEditModal(false);
      setSelectedLocation(null);
      setFormData({
        address1: '',
        city: '',
        stateOrProvince: '',
        country: ''
      });
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedLocation) return;
    try {
      await deleteLocation(selectedLocation.id);
      setShowDeleteModal(false);
      setSelectedLocation(null);
    } catch (err) {
      console.error('Error deleting location:', err);
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
          Error loading locations: {error.message}
        </div>
      </Container>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Locations</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedLocation(null);
            setShowEditModal(true);
          }}
        >
          Add Location
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State/Province</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>
                {location.address1}
                {location.address2 && <br />}
                {location.address2}
              </td>
              <td>{location.city}</td>
              <td>{location.stateOrProvince}</td>
              <td>{location.country}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditClick(location)}>
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(location)}>
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
            <Modal.Title>{selectedLocation ? 'Edit Location' : 'Add Location'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Address 1</Form.Label>
              <Form.Control
                type="text"
                value={formData.address1}
                onChange={(e) => setFormData((prev) => ({ ...prev, address1: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                value={formData.address2}
                onChange={(e) => setFormData((prev) => ({ ...prev, address2: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="text"
                value={formData.stateOrProvince}
                onChange={(e) => setFormData((prev) => ({ ...prev, stateOrProvince: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={formData.country}
                onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
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
        <Modal.Body>Are you sure you want to delete this location? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
