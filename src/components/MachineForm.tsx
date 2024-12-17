// components/machines/MachineForm.tsx
import React from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_MACHINE_TYPES, GET_MACHINE_MANUFACTURERS } from '@/graphql/queries';

interface MachineFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (machine: MachineFormData) => void;
  initialData?: MachineFormData;
}

interface MachineFormData {
  name: string;
  machineTypeId: string;
  manufacturerId: string;
}

export function MachineForm({ show, onHide, onSubmit, initialData }: MachineFormProps) {
  const [formData, setFormData] = React.useState<MachineFormData>({
    name: '',
    machineTypeId: '',
    manufacturerId: '',
    ...initialData
  });

  const { data: typeData, loading: typesLoading } = useQuery(GET_MACHINE_TYPES);
  const { data: manufacturerData, loading: manufacturersLoading } = useQuery(GET_MACHINE_MANUFACTURERS);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLoading = typesLoading || manufacturersLoading;

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {initialData ? 'Edit Machine' : 'Create New Machine'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Machine Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Machine Type</Form.Label>
            <Form.Select
              name="machineTypeId"
              value={formData.machineTypeId}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              <option value="">Select a type...</option>
              {typeData?.getMachineTypes.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Select
              name="manufacturerId"
              value={formData.manufacturerId}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              <option value="">Select a manufacturer...</option>
              {manufacturerData?.getMachineManufacturers.map((manufacturer: any) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </>
            ) : initialData ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}