import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { customerApi } from '../../services/api';

interface Customer {
  id: string;
  displayName: string | null;
  lineUserId: string;
  tier: string;
  points: number;
  totalPoints: number;
  isActive: boolean;
  lastActiveAt: string | null;
  createdAt: string;
  _count: {
    couponAssignments: number;
    redemptions: number;
  };
}

const tierColors: Record<string, { color: string; bg: string }> = {
  BRONZE:   { color: '#CD7F32', bg: 'rgba(205,127,50,0.1)' },
  SILVER:   { color: '#78716C', bg: 'rgba(148,163,184,0.1)' },
  GOLD:     { color: '#B45309', bg: 'rgba(245,158,11,0.1)' },
  PLATINUM: { color: '#7C3AED', bg: 'rgba(139,92,246,0.1)' },
};

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const limit = 20;

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data: any = await customerApi.getAll(page, limit, search || undefined, tierFilter || undefined);
      const items = Array.isArray(data) ? data : (data?.items || data?.data || []);
      const count = data?.total ?? data?.meta?.total ?? items.length;
      setCustomers(items);
      setTotal(count);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, tierFilter]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  // Debounced search — reset page on new search
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B' }}>Customers</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>
          {isLoading ? 'Loading...' : `${total} registered customer${total !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            className="input"
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search by name, email, phone, LINE ID..."
            style={{ paddingLeft: 40, background: 'white' }}
          />
        </div>
        <select
          value={tierFilter}
          onChange={e => { setTierFilter(e.target.value); setPage(1); }}
          style={{
            padding: '10px 14px', borderRadius: 10, border: '1px solid #E2E8F0',
            background: 'white', fontSize: 13, color: '#475569', cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <option value="">All Tiers</option>
          <option value="BRONZE">Bronze</option>
          <option value="SILVER">Silver</option>
          <option value="GOLD">Gold</option>
          <option value="PLATINUM">Platinum</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        border: '1px solid #F1F5F9', overflow: 'hidden',
      }}>
        {isLoading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
            <Loader2 size={24} className="spin" style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: 13 }}>Loading customers...</p>
          </div>
        ) : error ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#EF4444' }}>
            <p style={{ fontSize: 13 }}>{error}</p>
            <button onClick={fetchCustomers} style={{
              marginTop: 8, padding: '6px 16px', borderRadius: 8, border: '1px solid #E2E8F0',
              background: 'white', fontSize: 12, cursor: 'pointer', color: '#64748B',
            }}>Retry</button>
          </div>
        ) : customers.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
            <Users size={32} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
            <p style={{ fontSize: 13 }}>
              {search || tierFilter ? 'No customers match your filters' : 'No customers yet'}
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                {['Customer', 'Tier', 'Points', 'Lifetime', 'Coupons', 'Redemptions', 'Last Active'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left', fontSize: 12,
                    fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => {
                const tc = tierColors[c.tier] || tierColors.BRONZE;
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid #F8FAFC' }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%', background: tc.bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, color: tc.color,
                          flexShrink: 0,
                        }}>
                          {(c.displayName || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                            {c.displayName || 'Unknown'}
                          </p>
                          <p style={{ fontSize: 11, color: '#CBD5E1', fontFamily: 'monospace' }}>
                            {c.lineUserId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
                        background: tc.bg, color: tc.color,
                      }}>
                        {c.tier}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
                      {c.points.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>
                      {c.totalPoints.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>
                      {c._count?.couponAssignments ?? 0}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>
                      {c._count?.redemptions ?? 0}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>
                      {c.lastActiveAt ? new Date(c.lastActiveAt).toLocaleDateString() : '—'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
          marginTop: 20,
        }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            style={{
              padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0',
              background: 'white', cursor: page <= 1 ? 'not-allowed' : 'pointer',
              color: page <= 1 ? '#CBD5E1' : '#475569', display: 'flex', alignItems: 'center',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            style={{
              padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0',
              background: 'white', cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              color: page >= totalPages ? '#CBD5E1' : '#475569', display: 'flex', alignItems: 'center',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminCustomers;
