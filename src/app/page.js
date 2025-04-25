// app/page.js (or app/page.jsx)

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ Import the shared auth config
import { redirect } from "next/navigation"; // ✅ Required for redirecting in server components

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // 🔐 Protect homepage: redirect unauthenticated users
    redirect('/signin');
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Welcome back, {session.user.name} 👋
      </h1>
    </div>
  );
}
