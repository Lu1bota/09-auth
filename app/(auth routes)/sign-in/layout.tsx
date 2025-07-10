import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Access your NoteHub account to manage notes and stay organized.",
  keywords: ["Next.js", "React", "JavaScript"],
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
