"use client";

import { useActionState } from "react";
import styles from "../../admin.module.css";

export function ActionForm({
  action,
  submitLabel,
  children
}: {
  action: (state: string | null, form: FormData) => Promise<string | null>;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const [message, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction}>
      {children}
      {message ? <p className={styles.message} role="status">{message}</p> : null}
      <button className="btn btn-primary" style={{ marginTop: 12 }} disabled={pending}>{pending ? "Saving…" : submitLabel}</button>
    </form>
  );
}
