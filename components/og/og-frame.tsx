import type { ReactElement } from 'react'

export const OG_SIZE = { width: 1200, height: 630 }

export function ogFrame(title: string, subtitle: string): ReactElement {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, background: '#e9e9e6', color: '#0f0f0e' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 28 }}>
        <span style={{ fontWeight: 700 }}>elshan®</span>
        <span style={{ width: 44, height: 44, borderRadius: 44, background: '#c8f34b', border: '2px solid #0f0f0e' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={{ fontSize: 180, fontWeight: 700, letterSpacing: -10, lineHeight: 0.9 }}>{title}</span>
        <span style={{ fontSize: 32, color: '#62625d', maxWidth: 900 }}>{subtitle}</span>
      </div>
    </div>
  )
}
