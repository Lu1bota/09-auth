"use client";

import { useState } from "react";
import css from "./SignInPage.module.css";
import { AuthRequest } from "@/types/user";
import { login } from "@/lib/api/clientApi";
import { useAuthUser } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [error, setError] = useState("");
  const setUser = useAuthUser((state) => state.setUser);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const formValues = Object.fromEntries(formData);
    const loginData: AuthRequest = {
      email: formValues.email.toString(),
      password: formValues.password.toString(),
    };
    try {
      const res = await login(loginData);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  }

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
