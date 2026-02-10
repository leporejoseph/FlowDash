import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowDash Control Plane",
  description: "Multi-agent operations dashboard for ADK, A2A, AG-UI, and MCP workflows.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
