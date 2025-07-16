'use client';

import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';
import Link from 'next/link';

interface Assignment {
  id: number;
  patient: { name: string };
  medication: { name: string };
  startDate: string;
  numberOfDays: number;
  remainingDays: number;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/assignment/with-remaining`)
      .then((res) => res.json() )
      .then((data) => setAssignments(data))
      .catch((err) => console.error('Failed to fetch assignments:', err));
  }, []);
  console.log("data is",assignments)

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Medication Assignments</h1>
      <div className="flex items-center justify-between mb-4">
           <Link
          href="/assignements/new"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >        
          + New Assignment
        </Link>
        </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-sky-950">
            <th className="border px-3 py-2 text-left">Patient</th>
            <th className="border px-3 py-2 text-left">Medication</th>
            <th className="border px-3 py-2 text-left">Start Date</th>
            <th className="border px-3 py-2 text-left">Days</th>
            <th className="border px-3 py-2 text-left">Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td className="border px-3 py-2">{a.patient.name}</td>
              <td className="border px-3 py-2">{a.medication.name}</td>
              <td className="border px-3 py-2">{a.startDate}</td>
              <td className="border px-3 py-2">{a.numberOfDays}</td>
              <td className="border px-3 py-2">{a.remainingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
