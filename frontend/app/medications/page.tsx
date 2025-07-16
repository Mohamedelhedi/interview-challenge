'use client';

import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';
import Link from "next/link";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}


const MedicationsPage = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedications() {
      try {
        const res = await fetch(`${BACKEND_URL}/medication`);
        if (!res.ok) throw new Error('Failed to fetch medications');
        const data = await res.json();
        setMedications(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchMedications();
  }, []);

  if (loading) return <p>Loading medications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medications</h1>
        <div className="mb-4">
        <Link
          href="/medications/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Medication
        </Link>
      </div>
      {medications.length === 0 ? (
        <p>No medications found.</p>
      ) : (
        <ul>
          {medications.map(med => (
            <li key={med.id} className="mb-2 border p-2 rounded">
              <p><strong>Name:</strong> {med.name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Frequency:</strong> {med.frequency}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationsPage;
