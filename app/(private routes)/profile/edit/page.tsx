"use client";

import React, { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMe() {
      await getMe().then((user) => {
        setUserName(user.username);
        setUserEmail(user.email);
        setUserImage(user.avatar ?? "");
      });
    }
    fetchMe();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await updateMe({ username: userName, email: userEmail });
      router.push("/profile");
    } catch (error) {
      setError(String(error));
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={userImage}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
            />
          </div>

          <p>Email: {userEmail}</p>

          {error && <p>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={router.back}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
