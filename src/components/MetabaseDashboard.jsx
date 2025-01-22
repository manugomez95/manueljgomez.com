import { useEffect, useState } from 'react';
import encode from 'jwt-encode';
import { Link } from 'react-router-dom';

const METABASE_SITE_URL = "http://localhost:3000";
const METABASE_SECRET_KEY = "8ca98fde498e8ff4e449f30d8afc0e9aa9c4fa692541c316485ca391c92930a5";

export function MetabaseDashboard() {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const payload = {
      resource: { dashboard: 2 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    
    const token = encode(payload, METABASE_SECRET_KEY);
    const url = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
    setIframeUrl(url);
  }, []);

  return (
    <>
      <Link 
        to="/" 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '6px 12px',
          color: '#666',
          textDecoration: 'none',
          fontSize: '14px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1000
        }}
      >
        ← Back to CV
      </Link>
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }}>
        {iframeUrl && (
          <iframe
            src={iframeUrl}
            frameBorder={0}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allowtransparency="true"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="origin"
            loading="lazy"
          />
        )}
      </div>
    </>
  );
} 