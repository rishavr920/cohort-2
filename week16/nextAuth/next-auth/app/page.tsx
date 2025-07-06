"use client"

import { AppBar }   from "@/components/AppBar"
import { useSession } from "next-auth/react"
export default function Home() {
  const session = useSession();

  return (
    <div>
      <AppBar/>
      {JSON.stringify(session.data?.user)}
    </div>
  );
}
