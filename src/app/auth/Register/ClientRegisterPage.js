// app/auth/Register/ClientRegisterPage.js (Client Component)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientRegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      router.push('/auth/Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='flex justify-center w-full items-center h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 h-[24rem] bg-white px-20 py-20'>
        <h2>Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}