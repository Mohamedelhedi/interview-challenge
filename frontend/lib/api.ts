import { BACKEND_URL } from './constants';

export async function fetchPatients() {
  const res = await fetch(`${BACKEND_URL}/patient`);
  if (!res.ok) {
    throw new Error('Failed to fetch patients');
  }
  return res.json();
}


export async function fetchMedications() {
  const res = await fetch(`${BACKEND_URL}/medication`);
  if (!res.ok) {
    throw new Error('Failed to fetch medications');
  }
  return res.json();
}


export async function createMedication(medication: { name: string; dosage: string; frequency: string }) {
  const res = await fetch(`${BACKEND_URL}/medication`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medication),
  });
  if (!res.ok) {
    throw new Error('Failed to create medication');
  }
  return res.json();
}