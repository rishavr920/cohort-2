import { AppBar } from "@/components/AppBar";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <AppBar />
      userComponent: 
      {JSON.stringify(session)}
    </div>
  );
}