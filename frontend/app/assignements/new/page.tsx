'use client';

import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';

interface Patient {
  id: number;
  name: string;
}

interface Medication {
  id: number;
  name: string;
}

export default function NewAssignmentPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/patient`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error('Failed to fetch patients:', err));

    fetch(`${BACKEND_URL}/medication`)
      .then((res) => res.json())
      .then((data) => setMedications(data))
      .catch((err) => console.error('Failed to fetch medications:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${BACKEND_URL}/assignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: Number(selectedPatient),
          medicationId: Number(selectedMedication),
          startDate,
          numberOfDays: Number(days),
        }),
      });
      alert('Assignment created!');
    } catch (err) {
      console.error('Failed to create assignment:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Assign Medication to Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Patient</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-cyan-950"
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Medication</label>
          <select
            value={selectedMedication}
            onChange={(e) => setSelectedMedication(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-cyan-950"
            required
          >
            <option value="">Select a medication</option>
            {medications.map((med) => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-cyan-950"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Number of Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-cyan-950"
            required
            min="1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </form>
    </div>
  );
}
