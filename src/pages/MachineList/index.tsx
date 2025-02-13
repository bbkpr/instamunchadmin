import React, { useState } from 'react';
import { Container, Table, Button, Spinner, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useMachines } from '@/hooks/useMachines';
import { Machine } from '@/generated/graphql';
import { useNavigate } from 'react-router';
import omit from 'lodash/omit';

interface MachineFormData {
  /** Selected `locationId`.
   *
   * **Omit this from the `UpdateMachine` Mutation!** */
  locationId?: string;
  /** `id` of the `MachineLocation` representing this Machine's main Location. In the future, multiple Locations
   * per machine will be supported, so we will need to tweak this form then.
   *
   * **Omit this from the `UpdateMachine` Mutation!** */
  machineLocationId?: string;
  machineTypeId: string;
  manufacturerId: string;
  name: string;
}

export function MachineList() {
  const navigate = useNavigate();
  const {
    locations,
    machines,
    machineTypes,
    machineManufacturers,
    loading,
    error,
    createMachine,
    updateMachine,
    deleteMachine,
    createMachineLocation,
    updateMachineLocation
  } = useMachines();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedMachineItems, setSelectedMachineItems] = useState<Machine | null>(null);
  const [formData, setFormData] = useState<MachineFormData>({
    locationId: '',
    machineLocationId: '',
    machineTypeId: '',
    manufacturerId: '',
    name: ''
  });

  const handleEditClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormData({
      locationId: machine.machineLocations?.[0]?.location?.id,
      machineLocationId: machine.machineLocations?.[0]?.id,
      machineTypeId: machine.machineType!.id,
      manufacturerId: machine.manufacturer!.id,
      name: machine.name
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
        console.log(
          'handleFormSubmit selectedMachine',
          selectedMachine,
          'formData',
          formData,
          'selectedMachine.machineLocations?.[0]?.location?.id',
          selectedMachine.machineLocations?.[0]?.location?.id
        );
        await updateMachine({
          id: selectedMachine.id,
          ...formData
        });

        // If the MachineLocation `id` is different, update the 1 MachineLocation (multiple MachineLocations will be supported in the future)
        if (
          formData.locationId &&
          formData.machineLocationId &&
          formData.locationId !== selectedMachine.machineLocations?.[0]?.location?.id
        ) {
          await updateMachineLocation({
            id: formData.machineLocationId,
            machineId: selectedMachine.id,
            locationId: formData.locationId
          });
        }
      } else {
        const mch = await createMachine(omit(formData, 'locationId', 'machineLocationId'));
        await createMachineLocation({ machineId: mch.id, locationId: formData.locationId! });
      }
      setShowEditModal(false);
      setSelectedMachine(null);
      setFormData({
        name: '',
        locationId: '',
        machineLocationId: '',
        machineTypeId: '',
        manufacturerId: ''
      });
    } catch (err) {
      console.error('Error saving machine:', err);
    }
  };

  const handleItemsClick = (machine: Machine) => {
    setSelectedMachineItems(machine);
    setShowItemsModal(true);
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
      <Container className="d-flex justify-content-center py-4" fluid>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4" fluid>
        <div className="alert alert-danger" role="alert">
          Error loading machines: {error.message}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Machines</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedMachine(null);
            setShowEditModal(true);
            setFormData(() => ({
              name: '',
              machineTypeId: '',
              manufacturerId: '',
              machineLocationId: '',
              locationId: ''
            }));
          }}
        >
          Add Machine
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.name}</td>
              <td>{machine.machineLocations?.length ? machine.machineLocations[0]!.location!.address1 : 'Unknown'}</td>
              <td>
                {machine.manufacturer?.name} {machine.machineType?.name}
              </td>
              <td>
                {machine.machineItems && machine.machineItems.length > 0 ? (
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip>
                        {machine.machineItems.map((mi, index) => (
                          <div key={mi?.id}>
                            {mi?.item?.name} ({mi?.quantity}){mi?.setPrice && ` - $${mi?.setPrice.toFixed(2)}`}{' '}
                            {mi?.item?.basePrice && ` ($${mi?.item?.basePrice.toFixed(2)})`}
                            {index < (machine?.machineItems?.length ?? 0) - 1 && <hr className="my-1" />}
                          </div>
                        ))}
                      </Tooltip>
                    }
                  >
                    <span style={{ cursor: 'help', textDecoration: 'underline' }}>{machine.machineItems.length}</span>
                  </OverlayTrigger>
                ) : (
                  0
                )}
              </td>
              <td>
                <div className="table-button-wrap">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/machines/${machine.id}`)}
                  >
                    Manage Items
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(machine)}
                    aria-description="Edit"
                  >
                    ✏
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(machine)}
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

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.machineTypeId}
                onChange={(e) => setFormData((prev) => ({ ...prev, machineTypeId: e.target.value }))}
                required
              >
                <option value="">Select a type...</option>
                {formData.manufacturerId
                  ? machineTypes
                      .filter((mt) => (formData.manufacturerId ? mt.manufacturerId === formData.manufacturerId : true))
                      .map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))
                  : null}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select
                value={formData.locationId}
                onChange={(e) => setFormData((prev) => ({ ...prev, locationId: e.target.value }))}
              >
                <option value="">Select a location...</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.address1}
                    {location.address2 ? ` ${location.address2}` : ''}, {location.city}, {location.stateOrProvince}{' '}
                    {location.postalCode}
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

      {/* Machine Items Modal */}
      <Modal show={showItemsModal} onHide={() => setShowItemsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Items in {selectedMachineItems?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Base Price</th>
                <th>Set Price</th>
                <th>Expiration Period</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedMachineItems?.machineItems?.map((machineItem) => (
                <tr key={machineItem!.id}>
                  <td>{machineItem!.item?.name}</td>
                  <td>${machineItem!.item?.basePrice?.toFixed(2)}</td>
                  <td>${machineItem!.setPrice?.toFixed(2)}</td>
                  <td>{machineItem!.item?.expirationPeriod} days</td>
                  <td>{machineItem!.quantity}</td>
                </tr>
              ))}
              {!selectedMachineItems?.machineItems?.length && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No items in this machine
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
