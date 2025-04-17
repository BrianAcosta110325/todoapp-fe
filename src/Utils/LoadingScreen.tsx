import React from 'react';

interface LoadingScreenProps {
    loading: boolean;
}

function LoadingScreen({ loading }: LoadingScreenProps) {
    if (loading) {
        return (
            <div data-testid="loading-screen" style={styles.overlay}>
                <div style={styles.loader}>
                    <span role="img" aria-label="loading" style={styles.icon}>
                        🦜
                    </span>
                    <p style={{ ...styles.text, fontWeight: 'bold' }}>Cargando...</p>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loader: {
        textAlign: 'center' as 'center',
        color: '#fff',
    },
    icon: {
        fontSize: '4rem',
    },
    text: {
        marginTop: '1rem',
        fontSize: '1.5rem',
    },
};

export default LoadingScreen;