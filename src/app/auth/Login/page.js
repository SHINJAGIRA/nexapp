import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ClientLoginPage from "./ClientLoginPage";

// Server component wrapper
export default async function LoginPageWrapper() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <ClientLoginPage />;
}
