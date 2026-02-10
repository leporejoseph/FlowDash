import type { ReactNode } from "react";
import { SideNav } from "@/components/dashboard/side-nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      <SideNav />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}
