"use client";

// import { useState } from "react";
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  //   const [error, setError] = useState("");
  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form}>
          <h1 className={css.formTitle}>Sign up</h1>
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
              Register
            </button>
          </div>

          {/* {error && <p className={css.error}>Error</p>} */}
        </form>
      </main>
    </>
  );
}
