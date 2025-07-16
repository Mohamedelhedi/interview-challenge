// app/patients/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/constants";

type Patient = {
  id: number;
  name: string;
  dateOfBirth: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/patient`);
        const data = await res.json();
        setPatients(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Patients</h1>

      <div className="mb-4">
        <Link
          href="/patients/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Patient
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className="space-y-2">
          {patients.map((patient) => (
            <li key={patient.id} className="border rounded p-3">
              <p className="font-medium">{patient.name}</p>
              <p className="text-gray-600 text-sm">
                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
