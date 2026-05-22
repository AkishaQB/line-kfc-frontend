import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CouponCard from "../components/CouponCard";
import { Ticket, Loader2 } from "lucide-react";
import { couponApi } from "../services/api";

const tabs = ["Active", "Used", "Expired"];

interface CouponAssignment {
  id: string;
  couponId: string;
  customerId: string;
  couponCode: string;
  isRedeemed: boolean;
  redeemedAt: string | null;
  expiresAt: string;
  coupon: {
    id: string;
    code: string;
    type: string;
    title: string;
    description: string | null;
    discountType: string | null;
    discountValue: number | null;
    expirationDate: string;
    status: string;
  };
}

const MyCoupons = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [assignments, setAssignments] = useState<CouponAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await couponApi.getMyCoupons()) as any;
        // The API response may be an array directly or wrapped in data
        const list = Array.isArray(data)
          ? data
          : data?.items || data?.data || [];
        setAssignments(list);
      } catch (err: any) {
        console.error("Failed to fetch coupons:", err);
        setError(err?.response?.data?.message || "Failed to load coupons");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // Filter assignments based on active tab
  const filteredCoupons = assignments.filter((a) => {
    const now = new Date();
    const expired = new Date(a.expiresAt) < now;

    if (activeTab === "Active") return !a.isRedeemed && !expired;
    if (activeTab === "Used") return a.isRedeemed;
    if (activeTab === "Expired") return expired && !a.isRedeemed;
    return false;
  });

  // Map assignments to CouponCard props
  const coupons = filteredCoupons.map((a) => ({
    id: a.id,
    title: a.coupon.title,
    description: a.coupon.description || undefined,
    type: a.coupon.type,
    discountType: a.coupon.discountType || undefined,
    discountValue: a.coupon.discountValue || undefined,
    expiresAt: a.expiresAt,
    code: a.coupon.code,
  }));

  return (
    <div className="page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: 800 }}>My Coupons</h1>
        </motion.div>

        <div
          style={{
            display: "flex",
            gap: 4,
            background: "var(--color-surface-hover)",
            borderRadius: "var(--radius-md)",
            padding: 4,
            marginBottom: 20,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: 10,
                border: "none",
                borderRadius: "var(--radius-sm)",
                background:
                  activeTab === tab ? "var(--color-surface)" : "transparent",
                color:
                  activeTab === tab
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                fontFamily: "var(--font-family)",
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                boxShadow: activeTab === tab ? "var(--shadow-sm)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="empty-state">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={36} style={{ opacity: 0.5 }} />
            </motion.div>
            <p style={{ color: "var(--color-text-muted)", marginTop: 8 }}>
              Loading coupons...
            </p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <Ticket size={48} style={{ opacity: 0.3 }} />
            <h3 style={{ color: "var(--color-error)" }}>{error}</h3>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 12,
                padding: "8px 20px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-primary)",
                color: "#fff",
                fontFamily: "var(--font-family)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {coupons.length > 0 ? (
                coupons.map((c, i) => (
                  <CouponCard key={c.id} {...c} index={i} />
                ))
              ) : (
                <div className="empty-state">
                  <Ticket size={48} style={{ opacity: 0.3 }} />
                  <h3>No {activeTab.toLowerCase()} coupons</h3>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MyCoupons;
