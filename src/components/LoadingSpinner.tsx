interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
}

const LoadingSpinner = ({ fullPage = false, message }: LoadingSpinnerProps) => {
  if (fullPage) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '16px',
          background: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '4px solid var(--color-border-light)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        {message && <p className="text-muted text-sm">{message}</p>}
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      {message && <p className="loading-text">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
