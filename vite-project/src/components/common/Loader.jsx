function Loader({ size = 42, label = 'Loading' }) {
    const spinnerStyle = {
        width: size,
        height: size,
        borderWidth: Math.max(3, Math.round(size / 10)),
    };

    return (
        <>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <div
                className="loader-wrapper"
                role="status"
                aria-live="polite"
                aria-busy="true"
                aria-label={label}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <div
                    className="loader-spinner"
                    style={{
                        ...spinnerStyle,
                        border: '4px solid rgba(148, 163, 184, 0.3)',
                        borderTopColor: '#2563eb',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                />
                {label ? (
                    <span style={{ fontSize: 12, color: '#475569', letterSpacing: '0.04em' }}>
                        {label}
                    </span>
                ) : null}
            </div>
        </>
    );
}

export default Loader;