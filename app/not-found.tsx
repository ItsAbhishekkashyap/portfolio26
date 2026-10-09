import Link from "next/link";
import "./admin/admin.css";

export default function NotFound() {
  return (
    <div className="adm adm-login">
      <aside className="adm-login-side">
        <Link href="/" className="adm-logo"><span className="c">©</span> Code by Abhishek</Link>
        <div><h1>404</h1><p>This page doesn&apos;t exist, or it moved when the portfolio was rebuilt.</p></div>
      </aside>
      <main className="adm-login-main">
        <div>
          <h2>Page not found</h2>
          <p className="lede">Check the address, or head back to the portfolio to see the work, journey and contact details.</p>
        </div>
        <div className="adm-login-foot" style={{ marginTop: 0 }}>
          <Link href="/" className="adm-pill dark">Back to the portfolio</Link>
        </div>
      </main>
    </div>
  );
}
