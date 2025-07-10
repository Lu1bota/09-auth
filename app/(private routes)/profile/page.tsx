import Image from "next/image";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description:
    "View and manage your personal information, profile photo, and account settings in NoteHub.",
  openGraph: {
    title: "User Profile",
    description:
      "View and manage your personal information, profile photo, and account settings in NoteHub.",
    url: "https://09-auth-xi.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "notehub image",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "Take and organize notes easily with tags and instant search.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "notehub image",
      },
    ],
  },
};

export default function ProfilePage() {
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src=""
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: your_username</p>
            <p>Email: your_email@example.com</p>
          </div>
        </div>
      </main>
    </>
  );
}
