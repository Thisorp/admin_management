// src/pages/Status.jsx

import React, { useEffect, useState } from 'react';
import { Alert, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';

function Status() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus({ message: response.data, variant: 'success' });
      } catch (error) {
        setStatus({ message: 'Error connecting to the backend.', variant: 'danger' });
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Database Connection Status</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        status && <Alert variant={status.variant}>{status.message}</Alert>
      )}
    </Container>
  );
}

export default Status;
