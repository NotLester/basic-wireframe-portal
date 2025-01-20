"use client";
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';

export default function CollabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return redirect("/");
  }

  return <div>{children}</div>;
}
