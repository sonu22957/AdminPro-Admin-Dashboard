import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="not-found">
      <AlertCircle size={52} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: "8px", textDecoration: "none" }}>
        <Home size={16} />
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
