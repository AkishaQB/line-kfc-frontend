import { useState } from "react";
import { authApi } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res: any = await authApi.adminLogin(email, password);
      // Backend returns: { accessToken, admin: { name, role } }
      if (res && res.accessToken && res.admin) {
        localStorage.setItem("admin_token", res.accessToken);
        localStorage.setItem("admin_name", res.admin.name || "");
        localStorage.setItem("admin_role", res.admin.role || "");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      const errorMsg = "Invalid email or password";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 420 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32, color: "white" }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "var(--color-primary)",
              borderRadius: 18,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: "0 8px 32px rgba(228,0,43,0.4)",
            }}
          >
            <span style={{ fontSize: 36 }}>🍗</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>CouponAdmin</h1>
          <p style={{ fontSize: 14, opacity: 0.5 }}>
            Sign in to the management console
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 32,
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          }}
        >
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label className="input-label">Email</label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                  }}
                />
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@coupon.local"
                  required
                  style={{ paddingLeft: 40 }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label className="input-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                  }}
                />
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#94A3B8",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 10,
                  color: "#EF4444",
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo credentials */}
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: "#F8FAFC",
              borderRadius: 12,
              fontSize: 12,
              color: "#64748B",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 6, color: "#475569" }}>
              Demo Credentials
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                fontFamily: "monospace",
                fontSize: 11,
              }}
            >
              <span>superadmin@coupon.local / admin123</span>
              <span>marketing@coupon.local / admin123</span>
              <span>store@coupon.local / admin123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
