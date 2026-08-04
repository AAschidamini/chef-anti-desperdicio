"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/application/context/auth-context";
import { Button } from "@/presentation/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <div className="text-sm text-neutral-500">
        {user ? `Olá, ${user.name}` : ""}
      </div>
      <Button variant="secondary" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
}
