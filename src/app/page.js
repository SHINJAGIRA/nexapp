// app/page.js (or app/page.jsx)

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation"; // ✅ Required for redirecting in server components

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/Login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome back 👋
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          You’re signed in as <span className="font-medium">{session.user.name}</span>
        </p>
        <div className="flex flex-col gap-3">
          
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition duration-200"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}