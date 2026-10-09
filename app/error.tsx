"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./admin/admin.css";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Runtime App Error:", error);
  }, [error]);

  return (
    <div className="adm adm-login">
      <aside className="adm-login-side">
        <Link href="/" className="adm-logo"><span className="c">©</span> Code by Abhishek</Link>
        <div><h1>Something broke.</h1><p>The page hit an unexpected error while loading.</p></div>
      </aside>
      <main className="adm-login-main">
        <div>
          <h2>Try loading it again</h2>
          <p className="lede">{error.message || "An unexpected error occurred."} If it keeps happening, email abhi47025@gmail.com.</p>
        </div>
        <div className="adm-form-actions" style={{ marginTop: 0 }}>
          <button onClick={() => reset()} className="adm-pill dark">Try again</button>
          <Link href="/" className="adm-pill">Back to the portfolio</Link>
        </div>
      </main>
    </div>
  );
}
