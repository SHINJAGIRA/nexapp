'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/auth/Login'); // ✅ Redirect to login
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex  justify-center w-full items-center h-screen'>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 h-[24rem] bg-white px-20 py-20'>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
    </div>
  );
}
