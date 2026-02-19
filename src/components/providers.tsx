"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ChatWidget } from "@/components/chat/chat-widget";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}
