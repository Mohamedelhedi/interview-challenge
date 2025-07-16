// app/patients/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

export default function CreatePatientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dateOfBirth) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dateOfBirth }),
      });

      if (res.ok) {
        router.push("/patients");
      } else {
        const data = await res.json();
        alert(`Error: ${data.message || "Failed to create patient."}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 bg-cyan-950"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            className="w-full border rounded p-2 bg-cyan-950"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Patient
        </button>
      </form>
    </main>
  );
}
