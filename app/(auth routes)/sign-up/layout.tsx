import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a NoteHub account to start writing, organizing, and managing your notes effortlessly.",
  keywords: ["Next.js", "React", "JavaScript"],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
