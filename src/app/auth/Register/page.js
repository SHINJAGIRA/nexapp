// app/auth/Register/page.js (Server Component - no 'use client')
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ClientRegisterPage from './ClientRegisterPage';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) redirect('/');
  return <ClientRegisterPage />;
}