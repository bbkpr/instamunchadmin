import React, { useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { GET_MACHINE_CASH_COLLECTIONS, RECORD_CASH_COLLECTION } from '../graphql/templates/transaction.template';

interface CashCollectionProps {
  machineId: string;
  currentCash: number;
}

export function CashCollection({ machineId, currentCash }: CashCollectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(currentCash);
  const [notes, setNotes] = useState('');

  const [recordCollection] = useMutation(RECORD_CASH_COLLECTION, {
    refetchQueries: [GET_MACHINE_CASH_COLLECTIONS]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await recordCollection({
        variables: {
          input: {
            machineId,
            amount,
            notes
          }
        }
      });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to record collection:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)} disabled={currentCash === 0}>
        Collect Cash (${currentCash?.toFixed(2) ?? 0})
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Record Cash Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Amount to Collect</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                max={currentCash}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional collection notes"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Record Collection
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
