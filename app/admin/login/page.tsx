"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { loginAdmin } from "@/lib/actions";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(null, formData);

    // On success the action redirects to /admin; we only get here on failure.
    if (res && !res.success) {
      setLoading(false);
      setError(res.error || "Sign-in failed. Check your username and password.");
    }
  };

  return (
    <div className="adm adm-login">
      <aside className="adm-login-side">
        <Link href="/" className="adm-logo"><span className="c">©</span> Code by Abhishek<b>Studio</b></Link>
        <div>
          <div className="adm-login-ava" aria-hidden="true" />
          <h1>Welcome<br />back.</h1>
          <p>Manage the projects on your portfolio and read messages from recruiters and collaborators.</p>
        </div>
      </aside>

      <main className="adm-login-main">
        <Link href="/" className="adm-back"><ArrowLeft aria-hidden="true" /> Back to the portfolio</Link>
        <div>
          <h2>Sign in to Studio</h2>
          <p className="lede">Only the site owner can sign in here.</p>
        </div>

        {error && <div className="adm-alert" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="adm-field">
            <span className="q">01</span>
            <div>
              <label htmlFor="adm-user">Username</label>
              <input id="adm-user" type="text" name="username" required autoComplete="username" placeholder="admin" />
            </div>
          </div>
          <div className="adm-field">
            <span className="q">02</span>
            <div>
              <label htmlFor="adm-pass">Password</label>
              <input id="adm-pass" type="password" name="password" required autoComplete="current-password" placeholder="••••••••" />
            </div>
          </div>
          <div className="adm-login-foot">
            <p className="lede" style={{ margin: 0, color: "var(--mute)", fontSize: 14 }}>Your session stays signed in for 7 days.</p>
            <button type="submit" className="adm-circle" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
          </div>
        </form>
      </main>
    </div>
  );
}
