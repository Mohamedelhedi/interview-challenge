'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/constants';

const NewMedicationPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !dosage || !frequency) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/medication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dosage, frequency }),
      });

      if (!res.ok) throw new Error('Failed to create medication');

      router.push('/medications');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Medication</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Medication Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded bg-cyan-950"
          required
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          className="border p-2 rounded bg-cyan-950"
          required
        />
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          className="border p-2 rounded bg-cyan-950"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Medication
        </button>
      </form>
    </div>
  );
};

export default NewMedicationPage;
