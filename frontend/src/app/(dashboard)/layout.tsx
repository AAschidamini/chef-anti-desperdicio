import type { ReactNode } from "react";
import { Sidebar } from "@/presentation/components/layout/sidebar";
import { Header } from "@/presentation/components/layout/header";
import { AuthGuard } from "@/presentation/components/layout/auth-guard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
