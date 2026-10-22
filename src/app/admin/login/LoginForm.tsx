"use client";

import { useActionState } from "react";
import { login } from "../actions";
import styles from "../admin.module.css";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action}>
      <label className={styles.label} htmlFor="password">Password</label>
      <input className={styles.input} id="password" name="password" type="password" autoComplete="current-password" required />
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      <button className="btn btn-primary" style={{ marginTop: 14, width: "100%" }} disabled={pending}>Sign in</button>
    </form>
  );
}
