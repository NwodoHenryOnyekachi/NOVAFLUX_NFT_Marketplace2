import { useState, useEffect } from 'react'
import art1 from './assets/art1.jpg'
import art2 from './assets/art2.jpg'
import art3 from './assets/art3.jpg'
import art4 from './assets/art4.jpg'
import art5 from './assets/art5.jpg'
import art6 from './assets/art6.jpg'
import art7 from './assets/art7.jpg'
import art8 from './assets/art8.jpg'
import art9 from './assets/art9.jpg'
import art10 from './assets/art10.jpg'
import art11 from './assets/art11.jpg'
import art12 from './assets/art12.jpg'
import art13 from './assets/art13.jpg'
import art14 from './assets/art14.jpg'
import art15 from './assets/art15.jpg'
import art16 from './assets/art16.jpg'

type Page = 'home' | 'explore' | 'detail' | 'collection' | 'creator' | 'rankings' | 'activity' | 'profile'

// ─── Data ──────────────────────────────────────────────────────────────

const CREATORS = [
  { id: 0, name: 'Ari Vale', username: '@arivale', bio: 'Digital architect exploring the boundaries between synthetic and organic forms. Based between Seoul and the metaverse.', followers: '24.8K', following: '312', sales: '847 ETH', verified: true, color: '#7c3aed', initials: 'AV' },
  { id: 1, name: 'Mara Soleil', username: '@marasoleil', bio: 'Generative artist. I let algorithms dream and I curate the results. Infinite canvas, finite attention.', followers: '18.2K', following: '204', sales: '523 ETH', verified: true, color: '#06b6d4', initials: 'MS' },
  { id: 2, name: 'Koi Zhang', username: '@koizhang', bio: 'Sculptor of digital light. Former architect, now building impossible worlds from pure mathematics.', followers: '31.5K', following: '89', sales: '1,204 ETH', verified: true, color: '#10b981', initials: 'KZ' },
  { id: 3, name: 'Deva Nox', username: '@devanox', bio: 'The dark between the stars is where I create. Into the void, out come worlds.', followers: '12.7K', following: '156', sales: '298 ETH', verified: false, color: '#f59e0b', initials: 'DN' },
  { id: 4, name: 'Lena Frost', username: '@lenafrost', bio: 'Photography meets code. Reality is just one filter away from something transcendently beautiful.', followers: '9.4K', following: '78', sales: '167 ETH', verified: true, color: '#ec4899', initials: 'LF' },
  { id: 5, name: 'Rex Morion', username: '@rexmorion', bio: '3D artist obsessed with impossible geometries and synthetic textures. I render what physics forbids.', followers: '41.2K', following: '521', sales: '2,891 ETH', verified: true, color: '#ef4444', initials: 'RM' },
]

const NFTS = [
  { id: 0, name: 'Neon Genesis #024', collection: 'Synthetic Dreams', creator: 0, price: 2.48, usdPrice: '$8,244', likes: 847, art: 1 },
  { id: 1, name: 'Void Walker', collection: 'Dark Matter Series', creator: 3, price: 1.12, usdPrice: '$3,724', likes: 432, art: 2 },
  { id: 2, name: 'Digital Eden', collection: 'Genesis Protocol', creator: 1, price: 0.74, usdPrice: '$2,460', likes: 219, art: 3 },
  { id: 3, name: 'Prism Protocol', collection: 'Refraction Labs', creator: 2, price: 3.75, usdPrice: '$12,469', likes: 1203, art: 4 },
  { id: 4, name: 'Quantum Break', collection: 'Glitch Season', creator: 5, price: 0.38, usdPrice: '$1,263', likes: 156, art: 5 },
  { id: 5, name: 'Celestial Mind', collection: 'Inner Cosmos', creator: 4, price: 5.20, usdPrice: '$17,291', likes: 2841, art: 6 },
  { id: 6, name: 'Neural Storm', collection: 'Synthetic Dreams', creator: 0, price: 1.85, usdPrice: '$6,153', likes: 673, art: 7 },
  { id: 7, name: 'Echo Chamber', collection: 'Resonance', creator: 1, price: 0.96, usdPrice: '$3,192', likes: 388, art: 8 },
  { id: 8, name: 'Phase Shift', collection: 'Dark Matter Series', creator: 3, price: 1.44, usdPrice: '$4,788', likes: 521, art: 9 },
  { id: 9, name: 'Synthetic Soul', collection: 'Refraction Labs', creator: 2, price: 2.10, usdPrice: '$6,981', likes: 934, art: 10 },
  { id: 10, name: 'Binary Dreams', collection: 'Genesis Protocol', creator: 1, price: 0.55, usdPrice: '$1,829', likes: 287, art: 11 },
  { id: 11, name: 'Dark Matter #007', collection: 'Dark Matter Series', creator: 3, price: 4.88, usdPrice: '$16,226', likes: 1567, art: 12 },
]

const COLLECTIONS = [
  { id: 0, name: 'Synthetic Dreams', creator: 0, items: 144, owners: 89, floor: '1.85 ETH', volume: '2,847 ETH', change: '+12.4%', up: true, art: 1 },
  { id: 1, name: 'Dark Matter Series', creator: 3, items: 88, owners: 67, floor: '1.12 ETH', volume: '1,203 ETH', change: '+8.7%', up: true, art: 2 },
  { id: 2, name: 'Refraction Labs', creator: 2, items: 256, owners: 134, floor: '2.10 ETH', volume: '4,521 ETH', change: '-3.2%', up: false, art: 4 },
  { id: 3, name: 'Genesis Protocol', creator: 1, items: 512, owners: 287, floor: '0.55 ETH', volume: '891 ETH', change: '+24.1%', up: true, art: 3 },
  { id: 4, name: 'Inner Cosmos', creator: 4, items: 64, owners: 41, floor: '4.20 ETH', volume: '3,204 ETH', change: '+5.3%', up: true, art: 6 },
  { id: 5, name: 'Glitch Season', creator: 5, items: 200, owners: 112, floor: '0.38 ETH', volume: '612 ETH', change: '-1.8%', up: false, art: 5 },
]

const ACTIVITIES = [
  { type: 'sale', nftIdx: 0, from: '@rexmorion', to: '@collector_88', price: '2.48 ETH', time: '2 min ago' },
  { type: 'listing', nftIdx: 3, from: '@koizhang', to: null, price: '3.75 ETH', time: '8 min ago' },
  { type: 'offer', nftIdx: 5, from: '@whale_x', to: '@arivale', price: '4.90 ETH', time: '15 min ago' },
  { type: 'sale', nftIdx: 1, from: '@devanox', to: '@artlover', price: '1.12 ETH', time: '24 min ago' },
  { type: 'transfer', nftIdx: 6, from: '@arivale', to: '@vault_99', price: null, time: '31 min ago' },
  { type: 'bid', nftIdx: 5, from: '@bidder22', to: null, price: '4.75 ETH', time: '45 min ago' },
  { type: 'listing', nftIdx: 7, from: '@marasoleil', to: null, price: '0.96 ETH', time: '1 hr ago' },
  { type: 'sale', nftIdx: 11, from: '@devanox', to: '@nftpro', price: '4.88 ETH', time: '1 hr ago' },
  { type: 'offer', nftIdx: 9, from: '@artcollect', to: '@koizhang', price: '2.30 ETH', time: '2 hrs ago' },
  { type: 'bid', nftIdx: 0, from: '@highbid', to: null, price: '2.20 ETH', time: '2 hrs ago' },
  { type: 'sale', nftIdx: 10, from: '@marasoleil', to: '@newbie_01', price: '0.55 ETH', time: '3 hrs ago' },
  { type: 'listing', nftIdx: 4, from: '@rexmorion', to: null, price: '0.38 ETH', time: '3 hrs ago' },
]

// ─── Artwork ──────────────────────────────────────────────────────────

const ART = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12, art13, art14, art15, art16]

function NFTArt({ id, className }: { id: number; className?: string }) {
  return (
    <img src={ART[(id - 1) % ART.length]} alt="" loading="lazy" draggable={false}
      className={className || 'w-full h-full'}
      style={{ display: 'block', objectFit: 'cover', objectPosition: 'center 30%' }}/>
  )
}


function Slider({ arts, interval = 3800 }: { arts: number[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (arts.length < 2) return
    const t = setInterval(() => setI(v => (v + 1) % arts.length), interval)
    return () => clearInterval(t)
  }, [arts.length, interval])
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%', width: '100%', transform: `translateX(-${i * 100}%)`, transition: 'transform 0.9s cubic-bezier(.65,0,.35,1)' }}>
        {arts.map((a, k) => (
          <div key={k} style={{ flex: '0 0 100%', height: '100%' }}><NFTArt id={a} className="w-full h-full"/></div>
        ))}
      </div>
      {arts.length > 1 && (
        <div style={{ position: 'absolute', bottom: 10, right: 14, display: 'flex', gap: 6, zIndex: 3 }}>
          {arts.map((_, k) => (
            <button key={k} onClick={e => { e.stopPropagation(); setI(k) }} aria-label={`Slide ${k + 1}`}
              style={{ width: k === i ? 18 : 6, height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0, background: k === i ? '#a78bfa' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}/>
          ))}
        </div>
      )}
    </div>
  )
}

function slideArts(first: number, collection?: string, creator?: number): number[] {
  const own = NFTS.filter(n => (collection ? n.collection === collection : creator !== undefined ? n.creator === creator : false)).map(n => n.art)
  const out: number[] = []
  for (const a of [first, ...own, ...NFTS.map(n => n.art)]) { if (!out.includes(a)) out.push(a); if (out.length === 5) break }
  return out
}

// ─── Avatar ────────────────────────────────────────────────────────────

function Avatar({ creator, size = 32 }: { creator: typeof CREATORS[0]; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${creator.color}88, ${creator.color}22)`,
      border: `1.5px solid ${creator.color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.32, fontWeight: 600, color: creator.color,
      fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0,
    }}>
      {creator.initials}
    </div>
  )
}

// ─── Verified Badge ────────────────────────────────────────────────────

function VerifiedBadge({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#7c3aed"/>
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── NFT Card ─────────────────────────────────────────────────────────

function NFTCard({ nft, onClick, favorited, onFavorite }: {
  nft: typeof NFTS[0]; onClick: () => void;
  favorited: boolean; onFavorite: (e: React.MouseEvent) => void
}) {
  const creator = CREATORS[nft.creator]
  return (
    <div className="nft-card card-hover cursor-pointer" onClick={onClick}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
      {/* Artwork */}
      <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#0a0a18' }}>
        <NFTArt id={nft.art} className="w-full h-full"/>
        {/* Hover overlay */}
        <div className="nft-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <button className="btn-violet" style={{ borderRadius: 10, padding: '8px 18px', fontSize: 13 }}>Buy Now</button>
        </div>
        {/* Favorite */}
        <button onClick={onFavorite}
          style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={favorited ? '#ef4444' : 'none'} stroke={favorited ? '#ef4444' : '#9ca3af'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {/* Likes */}
        <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9ca3af' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#9ca3af"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {nft.likes.toLocaleString()}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '14px 14px 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{nft.collection}</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 10, color: '#f1f0ff' }}>{nft.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Avatar creator={creator} size={22}/>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{creator.name}</span>
            {creator.verified && <VerifiedBadge size={12}/>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: '#a78bfa' }}>{nft.price} ETH</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{nft.usdPrice}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Collection Card ───────────────────────────────────────────────────

function CollectionCard({ col, rank, onClick }: { col: typeof COLLECTIONS[0]; rank?: number; onClick?: () => void }) {
  const creator = CREATORS[col.creator]
  return (
    <div className="card-hover cursor-pointer" onClick={onClick}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ height: 110, background: '#0a0a18', position: 'relative', overflow: 'hidden' }}>
        <Slider arts={slideArts(col.art, col.name)} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }}/>
        {rank && <div style={{ position: 'absolute', zIndex: 3, top: 8, left: 8, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.25)' }}>#{rank}</div>}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 36, height: 48, borderRadius: 8, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.12)', flexShrink: 0, background: '#0a0a18' }}>
            <NFTArt id={col.art} className="w-full h-full"/>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff', display: 'flex', alignItems: 'center', gap: 4 }}>
              {col.name} <VerifiedBadge size={12}/>
            </div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>by {creator.name}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['Floor', col.floor], ['Volume', col.volume]].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: '#4b5563', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: '#a78bfa' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: col.up ? '#10b981' : '#ef4444', fontWeight: 600 }}>
          {col.up ? '▲' : '▼'} {col.change}
        </div>
      </div>
    </div>
  )
}

// ─── Creator Card ──────────────────────────────────────────────────────

function CreatorCard({ creator, rank, onClick }: { creator: typeof CREATORS[0]; rank?: number; onClick?: () => void }) {
  return (
    <div className="card-hover cursor-pointer" onClick={onClick}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
      {rank && <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: 'rgba(255,255,255,0.15)', minWidth: 28 }}>#{rank}</div>}
      <Avatar creator={creator} size={48}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff' }}>{creator.name}</span>
          {creator.verified && <VerifiedBadge size={13}/>}
        </div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{creator.username}</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{creator.followers} followers</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#a78bfa' }}>{creator.sales}</div>
        <div style={{ fontSize: 11, color: '#4b5563' }}>total sales</div>
      </div>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────

function Nav({ page, setPage, openWallet, connected }: {
  page: Page; setPage: (p: Page) => void; openWallet: () => void; connected: boolean
}) {
  const links: [string, Page][] = [['Discover', 'home'], ['Explore', 'explore'], ['Creators', 'creator'], ['Rankings', 'rankings'], ['Activity', 'activity']]
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      className="glass">
      <div className="nav-inner" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', gap: 0 }}>
        {/* Logo */}
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 48 }} className="nav-logo">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">NOVA</span><span style={{ color: '#f1f0ff' }}>FLUX</span>
          </span>
        </button>
        {/* Links */}
        <div className="md:flex" style={{ gap: 32, flex: 1, display: 'none' }}>
          {links.map(([label, p]) => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, padding: '4px 0', transition: 'color 0.2s',
                color: page === p ? '#a78bfa' : '#9ca3af' }}
              onMouseEnter={e => { if(page!==p)(e.target as HTMLElement).style.color='#e5e7eb' }}
              onMouseLeave={e => { if(page!==p)(e.target as HTMLElement).style.color='#9ca3af' }}>
              {label}
            </button>
          ))}
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          {/* Search */}
          <div className="md:block" style={{ position: 'relative', display: 'none' }}>
            <input placeholder="Search NFTs, creators…"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 36px 8px 14px', fontSize: 13, color: '#f1f0ff', outline: 'none', width: 220, fontFamily: "'DM Sans', sans-serif" }}/>
            <svg style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <button className="btn-violet" onClick={connected ? () => setPage('profile') : openWallet} style={{ borderRadius: 10, padding: '8px 18px', fontSize: 13, gap: 6, whiteSpace: 'nowrap' }}>
            {connected ? (
              <><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}/>0x4f2…9b3c</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>Connect Wallet</>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────

function Footer({ setPage, openWallet, connected }: { setPage: (p: Page) => void; openWallet: () => void; connected: boolean }) {
  const linkStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 14, padding: 0, textAlign: 'left', fontFamily: "'DM Sans',sans-serif" }
  const cols: [string, [string, () => void][]][] = [
    ['Marketplace', [['Discover', () => setPage('home')], ['Explore', () => setPage('explore')], ['Rankings', () => setPage('rankings')], ['Activity', () => setPage('activity')]]],
    ['Community', [['Creators', () => setPage('creator')], ['Collections', () => setPage('collection')], [connected ? 'My Account' : 'Connect Wallet', () => connected ? setPage('profile') : openWallet()]]],
  ]
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 40, background: 'rgba(255,255,255,0.015)' }}>
      <div className="footer-pad" style={{ maxWidth: 1440, margin: '0 auto', padding: '56px 40px 32px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>
              <span className="gradient-text">NOVA</span><span style={{ color: '#f1f0ff' }}>FLUX</span>
            </span>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginTop: 14, maxWidth: 320 }}>
              The premium marketplace for discovering and collecting unique digital art from visionary creators.
            </p>
          </div>
          {cols.map(([title, links]) => (
            <div key={title}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: '#f1f0ff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(([label, fn]) => <button key={label} onClick={fn} style={linkStyle}>{label}</button>)}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: '#f1f0ff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Follow</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['𝕏', '💬', '📷'].map(i => <span key={i} className="btn-ghost" style={{ borderRadius: 10, width: 38, height: 38, fontSize: 16 }}>{i}</span>)}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#4b5563' }}>
          <span>© 2026 NOVAFLUX. All rights reserved.</span>
          <span>Terms · Privacy · Support</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Mobile Nav ───────────────────────────────────────────────────────

function MobileNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const items: [string, Page, string][] = [
    ['Home','home','M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'],
    ['Explore','explore','M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z'],
    ['Activity','activity','M22 12h-4l-3 9L9 3l-3 9H2'],
    ['Rankings','rankings','M18 20V10M12 20V4M6 20v-6'],
    ['Profile','profile','M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z'],
  ]
  return (
    <div className="md:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', zIndex: 50, borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,8,13,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '8px 4px max(8px, env(safe-area-inset-bottom))' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'stretch' }}>
        {items.map(([label, p, d]) => (
          <button key={p} onClick={() => setPage(p)}
            style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', color: page === p ? '#a78bfa' : '#6b7280', transition: 'color 0.2s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={d}/>
            </svg>
            <span style={{ fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Wallet Modal ─────────────────────────────────────────────────────

function WalletModal({ onClose, onConnect }: { onClose: () => void; onConnect: () => void }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const wallets = [
    { name: 'MetaMask', desc: 'Most popular Ethereum wallet', color: '#f6851b', icon: '🦊' },
    { name: 'Coinbase Wallet', desc: 'Built for the next generation', color: '#0052ff', icon: '🔵' },
    { name: 'WalletConnect', desc: 'Connect via QR code', color: '#3b99fc', icon: '🔗' },
    { name: 'Phantom', desc: 'Solana & multi-chain support', color: '#ab9ff2', icon: '👻' },
  ]

  const handleConnect = (name: string) => {
    setLoading(name); setError(null)
    setTimeout(() => {
      setLoading(null)
      if (name === 'MetaMask') { onConnect() }
      else setError(`Unable to connect to ${name}. Please try again.`)
    }, 1800)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#111119', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, width: '100%', maxWidth: 420, margin: 16, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '28px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: '#f1f0ff', marginBottom: 6 }}>Connect your wallet</h2>
            <p style={{ fontSize: 13, color: '#6b7280' }}>Choose a wallet to continue to NOVAFLUX</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9ca3af', fontSize: 18, flexShrink: 0 }}>×</button>
        </div>
        {/* Wallets */}
        <div style={{ padding: '20px 28px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wallets.map(w => (
            <button key={w.name} onClick={() => handleConnect(w.name)} disabled={!!loading}
              style={{ background: loading === w.name ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${loading===w.name ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: loading && loading !== w.name ? 0.5 : 1 }}
              onMouseEnter={e => { if(!loading)(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.3)' }}
              onMouseLeave={e => { if(!loading)(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.07)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${w.color}18`, border: `1px solid ${w.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{w.icon}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff', marginBottom: 2 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{w.desc}</div>
              </div>
              {loading === w.name ? (
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(167,139,250,0.3)', borderTopColor: '#a78bfa', animation: 'spin 0.8s linear infinite' }}/>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              )}
            </button>
          ))}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fca5a5' }}>{error}</div>
          )}
          <p style={{ fontSize: 11, color: '#4b5563', textAlign: 'center', marginTop: 4 }}>By connecting, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

// ─── Section Header ────────────────────────────────────────────────────

function SectionHeader({ title, subtitle, action, onAction }: { title: string; subtitle?: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, color: '#f1f0ff', letterSpacing: '-0.02em', marginBottom: subtitle ? 6 : 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 14, color: '#6b7280' }}>{subtitle}</p>}
      </div>
      {action && <button className="btn-ghost" onClick={onAction} style={{ borderRadius: 10, padding: '8px 16px', fontSize: 13 }}>{action} →</button>}
    </div>
  )
}

// ─── Mini Chart SVG ────────────────────────────────────────────────────

function MiniChart({ up }: { up: boolean }) {
  const color = up ? '#10b981' : '#ef4444'
  const pts = up
    ? '0,30 10,25 20,28 30,18 40,22 50,12 60,8'
    : '0,10 10,15 20,12 30,22 40,18 50,28 60,30'
  return (
    <svg width="60" height="32" viewBox="0 0 60 32">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────

function HomePage({ setPage, favorites, onFavorite, openWallet }: {
  setPage: (p: Page) => void; favorites: Set<number>;
  onFavorite: (id: number) => void; openWallet: () => void
}) {
  const featuredNFT = NFTS[0]
  const featuredCreator = CREATORS[featuredNFT.creator]

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', paddingTop: 80, paddingBottom: 100 }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 99, padding: '6px 14px', fontSize: 12, color: '#a78bfa', fontWeight: 500, marginBottom: 28, fontFamily: "'Space Grotesk',sans-serif" }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed' }} className="pulse-glow"/>
              Live marketplace · 2,847 NFTs listed
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(48px, 5vw, 76px)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
              <span style={{ color: '#f1f0ff' }}>Collect</span>{' '}
              <span className="gradient-text">What's</span>{' '}
              <span style={{ color: '#f1f0ff' }}>Next.</span>
            </h1>
            <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.65, marginBottom: 40, maxWidth: 440 }}>
              NOVAFLUX is the premium marketplace for discovering and collecting unique digital art from the world's most visionary creators.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn-violet" onClick={() => setPage('explore')} style={{ borderRadius: 12, padding: '14px 28px', fontSize: 15, gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                Explore NFTs
              </button>
              <button className="btn-ghost" onClick={() => setPage('collection')} style={{ borderRadius: 12, padding: '14px 28px', fontSize: 15 }}>
                Create Collection
              </button>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 52, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[['$2.4B+', 'Total Volume'], ['184K+', 'Artworks'], ['52K+', 'Collectors']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: '#f1f0ff', marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right - Featured NFT */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, maxWidth: '100%', height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', pointerEvents: 'none' }}/>
            {/* NFT frame */}
            <div className="float-anim" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440 }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.2)', background: '#0a0a18' }}>
                <NFTArt id={1} className="w-full"/>
              </div>
              {/* Floating info card */}
              <div className="glass" style={{ position: 'absolute', bottom: -20, left: -20, borderRadius: 16, padding: '14px 18px', minWidth: 220 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar creator={featuredCreator} size={32}/>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff' }}>{featuredNFT.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{featuredNFT.collection}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#4b5563', marginBottom: 2 }}>CURRENT PRICE</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: '#a78bfa' }}>2.48 ETH</div>
                  </div>
                  <button className="btn-violet" onClick={openWallet} style={{ borderRadius: 8, padding: '6px 14px', fontSize: 12 }}>Buy</button>
                </div>
              </div>
              {/* Top badge */}
              <div className="glass" style={{ position: 'absolute', top: 16, right: 16, borderRadius: 99, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#a78bfa"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Featured Drop
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending NFTs */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 60px' }}>
        <SectionHeader title="Trending Now" subtitle="Most active NFTs in the last 24 hours" action="View All" onAction={() => setPage('explore')}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
          {NFTS.slice(0, 8).map(nft => (
            <NFTCard key={nft.id} nft={nft} onClick={() => setPage('detail')}
              favorited={favorites.has(nft.id)} onFavorite={e => { e.stopPropagation(); onFavorite(nft.id) }}/>
          ))}
        </div>
      </div>

      {/* Top Collections */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 60px' }}>
        <SectionHeader title="Top Collections" action="All Collections" onAction={() => setPage('collection')}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 20 }}>
          {COLLECTIONS.slice(0, 4).map((col, i) => (
            <CollectionCard key={col.id} col={col} rank={i+1} onClick={() => setPage('collection')}/>
          ))}
        </div>
      </div>

      {/* Top Creators */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 60px' }}>
        <SectionHeader title="Top Creators" subtitle="Artists with the highest trading volume" action="All Creators" onAction={() => setPage('creator')}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 16 }}>
          {CREATORS.map((c, i) => (
            <CreatorCard key={c.id} creator={c} rank={i+1} onClick={() => setPage('creator')}/>
          ))}
        </div>
      </div>

      {/* Recently Listed */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader title="Recently Listed" action="Explore More" onAction={() => setPage('explore')}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
          {NFTS.slice(4, 8).map(nft => (
            <NFTCard key={nft.id} nft={nft} onClick={() => setPage('detail')}
              favorited={favorites.has(nft.id)} onFavorite={e => { e.stopPropagation(); onFavorite(nft.id) }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────

function ExplorePage({ setPage, favorites, onFavorite }: {
  setPage: (p: Page) => void; favorites: Set<number>; onFavorite: (id: number) => void
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('Trending')
  const categories = ['All', 'Art', 'Gaming', 'Music', 'Photography', 'Collectibles', '3D']
  const sorts = ['Trending', 'Recently Listed', 'Price: Low to High', 'Price: High to Low']

  const sorted = [...NFTS].sort((a, b) => {
    if (sort === 'Price: Low to High') return a.price - b.price
    if (sort === 'Price: High to Low') return b.price - a.price
    return 0
  })

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 40px 100px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: '#f1f0ff', marginBottom: 8 }}>Explore NFTs</h1>
        <p style={{ fontSize: 15, color: '#6b7280' }}>Discover rare digital art from verified creators worldwide</p>
      </div>
      {/* Search + Filter bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <input placeholder="Search by name, collection, or creator…"
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 40px 12px 16px', fontSize: 14, color: '#f1f0ff', outline: 'none', fontFamily: "'DM Sans',sans-serif" }}/>
          <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#f1f0ff', outline: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", minWidth: 180 }}>
          {sorts.map(s => <option key={s} value={s} style={{ background: '#111119' }}>{s}</option>)}
        </select>
        <button className="btn-ghost" style={{ borderRadius: 12, padding: '12px 20px', fontSize: 14, gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters
        </button>
      </div>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 36, overflowX: 'auto', paddingBottom: 4 }} className="scroll-hide">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            style={{ borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: "'Space Grotesk',sans-serif",
              background: activeCategory === c ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
              color: activeCategory === c ? '#a78bfa' : '#9ca3af',
              outline: activeCategory === c ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
            {c}
          </button>
        ))}
      </div>
      {/* NFT Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
        {sorted.map(nft => (
          <NFTCard key={nft.id} nft={nft} onClick={() => setPage('detail')}
            favorited={favorites.has(nft.id)} onFavorite={e => { e.stopPropagation(); onFavorite(nft.id) }}/>
        ))}
      </div>
    </div>
  )
}

// ─── NFT DETAIL PAGE ──────────────────────────────────────────────────

function NFTDetailPage({ setPage, favorites, onFavorite, openWallet }: {
  setPage: (p: Page) => void; favorites: Set<number>; onFavorite: (id: number) => void; openWallet: () => void
}) {
  const nft = NFTS[0]
  const creator = CREATORS[nft.creator]
  const [tab, setTab] = useState<'properties'|'activity'>('properties')
  const [offerMode, setOfferMode] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')

  const traits = [
    { label: 'Background', value: 'Void Purple', rarity: 8 },
    { label: 'Frame', value: 'Crystalline', rarity: 12 },
    { label: 'Core', value: 'Neon Fractal', rarity: 4 },
    { label: 'Aura', value: 'Electric Cyan', rarity: 6 },
    { label: 'Edition', value: 'Genesis', rarity: 2 },
    { label: 'Grade', value: 'Legendary', rarity: 3 },
  ]

  const txHistory = [
    { event: 'Sale', price: '2.48 ETH', from: '0x4f2…1a9', to: '0x8b3…9c4', time: '2 days ago' },
    { event: 'Sale', price: '1.92 ETH', from: '0x7c1…3e2', to: '0x4f2…1a9', time: '14 days ago' },
    { event: 'Listing', price: '2.20 ETH', from: '0x7c1…3e2', to: '—', time: '20 days ago' },
    { event: 'Mint', price: '0.40 ETH', from: 'Ari Vale', to: '0x7c1…3e2', time: '32 days ago' },
  ]

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 40px 100px' }}>
      {/* Back */}
      <button onClick={() => setPage('explore')} className="btn-ghost" style={{ borderRadius: 10, padding: '8px 16px', fontSize: 13, gap: 6, marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Explore
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="stack-md">
        {/* Left: Artwork */}
        <div>
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.15)', background: '#0a0a18' }}>
            <NFTArt id={nft.art} className="w-full"/>
          </div>
          {/* Description */}
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 16, color: '#f1f0ff', marginBottom: 10 }}>About this piece</h3>
            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.75 }}>
              Neon Genesis #024 is part of the "Synthetic Dreams" series — a meditation on the collision between digital and biological consciousness. Each shard represents a fragment of manufactured memory, crystallized in the moment of synthesis. One of 144 in a closed series.
            </p>
          </div>
          {/* Blockchain info */}
          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, display: 'grid', gap: 14 }}>
            {[['Blockchain', 'Ethereum'], ['Token Standard', 'ERC-721'], ['Token ID', '#024'], ['Contract', '0x71c8…3def'], ['Royalties', '7.5%']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{k}</span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 13, color: '#f1f0ff' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          {/* Collection + actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={() => setPage('collection')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#a78bfa', fontWeight: 500 }}>
              {nft.collection} ↗
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" onClick={() => onFavorite(nft.id)} style={{ borderRadius: 10, padding: '8px 12px', gap: 6, fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={favorites.has(0) ? '#ef4444' : 'none'} stroke={favorites.has(0) ? '#ef4444' : '#9ca3af'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {favorites.has(0) ? nft.likes + 1 : nft.likes}
              </button>
              <button className="btn-ghost" style={{ borderRadius: 10, padding: '8px 12px', gap: 6, fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                Share
              </button>
            </div>
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 36, letterSpacing: '-0.02em', color: '#f1f0ff', marginBottom: 20 }}>{nft.name}</h1>

          {/* Creator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
            <Avatar creator={creator} size={40}/>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>Created by</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: '#f1f0ff' }}>
                {creator.name} <VerifiedBadge size={14}/> <span style={{ color: '#a78bfa', fontSize: 12, fontWeight: 400 }}>{creator.username}</span>
              </div>
            </div>
            <button className="btn-ghost" onClick={() => setPage('creator')} style={{ borderRadius: 8, padding: '6px 12px', fontSize: 12, marginLeft: 'auto' }}>Follow</button>
          </div>

          {/* Price + CTAs */}
          <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Current price</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 40, color: '#f1f0ff', letterSpacing: '-0.02em' }}>{nft.price} ETH</span>
              <span style={{ fontSize: 18, color: '#6b7280' }}>{nft.usdPrice}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-violet" onClick={openWallet} style={{ borderRadius: 12, padding: '14px 24px', fontSize: 15, flex: 1, gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Buy Now
              </button>
              <button className="btn-ghost" onClick={() => setOfferMode(!offerMode)} style={{ borderRadius: 12, padding: '14px 24px', fontSize: 15 }}>Make Offer</button>
            </div>
            {offerMode && (
              <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input value={offerAmount} onChange={e => setOfferAmount(e.target.value)} placeholder="0.00" type="number"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 50px 10px 14px', fontSize: 15, color: '#f1f0ff', outline: 'none', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}/>
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#6b7280', fontFamily: "'Space Grotesk',sans-serif" }}>ETH</span>
                </div>
                <button className="btn-cyan" style={{ borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>Submit</button>
              </div>
            )}
          </div>

          {/* Ownership */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[['Owned by', '0x8b3c…9f2a', '👤'], ['Last sale', '1.92 ETH · 14d ago', '💰'], ['Listed', '2 days ago', '🕐'], ['Views', '12,847', '👁']].map(([label, val, icon]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#4b5563', marginBottom: 4 }}>{icon} {label}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 24, marginBottom: 20 }}>
            {(['properties', 'activity'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={tab === t ? 'tab-active' : 'tab-inactive'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', fontSize: 14, textTransform: 'capitalize', fontFamily: "'Space Grotesk',sans-serif" }}>
                {t === 'properties' ? 'Properties' : 'Activity'}
              </button>
            ))}
          </div>

          {tab === 'properties' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {traits.map(t => (
                <div key={t.label} style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, fontWeight: 600 }}>{t.label}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff', marginBottom: 6 }}>{t.value}</div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 4, overflow: 'hidden' }}>
                    <div className="trait-bar-fill" style={{ width: `${t.rarity * 6}%` }}/>
                  </div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{t.rarity}% have this trait</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {txHistory.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: tx.event === 'Sale' ? 'rgba(16,185,129,0.12)' : 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 14 }}>{tx.event === 'Sale' ? '💸' : tx.event === 'Listing' ? '📋' : '✨'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#f1f0ff', fontWeight: 500 }}>{tx.event}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{tx.from} → {tx.to}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {tx.price && <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: '#a78bfa' }}>{tx.price}</div>}
                    <div style={{ fontSize: 11, color: '#4b5563' }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* More from collection */}
      <div style={{ marginTop: 72 }}>
        <SectionHeader title="More from Synthetic Dreams" action="View Collection" onAction={() => setPage('collection')}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 20 }}>
          {NFTS.filter(n => n.collection === 'Synthetic Dreams' && n.id !== 0).slice(0, 4).map(n => (
            <NFTCard key={n.id} nft={n} onClick={() => {}}
              favorited={favorites.has(n.id)} onFavorite={e => { e.stopPropagation(); onFavorite(n.id) }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── COLLECTION PAGE ──────────────────────────────────────────────────

function CollectionPage({ setPage, favorites, onFavorite }: {
  setPage: (p: Page) => void; favorites: Set<number>; onFavorite: (id: number) => void
}) {
  const col = COLLECTIONS[0]
  const creator = CREATORS[col.creator]
  const [tab, setTab] = useState<'items'|'activity'|'analytics'>('items')
  const collectionNFTs = NFTS.filter(n => n.collection === col.name)

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Banner */}
      <div style={{ height: 280, position: 'relative', overflow: 'hidden', background: '#0a0a18' }}>
        <Slider arts={slideArts(col.art, col.name)} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,13,0.05) 0%, rgba(8,8,13,0.7) 100%)', pointerEvents: 'none', zIndex: 2 }}/>
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        {/* Collection identity */}
        <div className="ident-row" style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: -60, marginBottom: 36, flexWrap: 'wrap', position: 'relative', zIndex: 5 }}>
          <div style={{ width: 90, height: 120, borderRadius: 14, overflow: 'hidden', border: '3px solid #08080d', background: '#0a0a18', flexShrink: 0 }}>
            <NFTArt id={col.art}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 32, color: '#f1f0ff', letterSpacing: '-0.02em' }}>{col.name}</h1>
              <VerifiedBadge size={20}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#6b7280' }}>by</span>
              <Avatar creator={creator} size={22}/>
              <button onClick={() => setPage('creator')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#a78bfa', fontWeight: 500 }}>{creator.name}</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['🌐', 'Website'], ['𝕏', 'Twitter'], ['💬', 'Discord']].map(([icon, label]) => (
              <button key={label} className="btn-ghost" style={{ borderRadius: 10, padding: '8px 14px', fontSize: 12, gap: 6 }}>{icon} {label}</button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 40 }}>
          {[['Items', col.items], ['Owners', col.owners], ['Floor Price', col.floor], ['Total Volume', col.volume], ['Change', col.change]].map(([label, val], i) => (
            <div key={label} style={{ background: '#0e0e1a', padding: '20px 24px' }}>
              <div style={{ fontSize: 11, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 600 }}>{label}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: i === 4 ? (col.up ? '#10b981' : '#ef4444') : '#f1f0ff' }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.75, maxWidth: 720, marginBottom: 36 }}>
          Synthetic Dreams is a closed series of 144 generative works exploring the liminal space between human memory and machine synthesis. Each piece is algorithmically unique, derived from Ari Vale's proprietary neural architecture trained on 10,000 hours of biometric data.
        </p>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 32, marginBottom: 32 }}>
          {(['items', 'activity', 'analytics'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={tab === t ? 'tab-active' : 'tab-inactive'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', fontSize: 14, textTransform: 'capitalize', fontFamily: "'Space Grotesk',sans-serif" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'items' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
            {(collectionNFTs.length > 0 ? collectionNFTs : NFTS.slice(0, 8)).map(n => (
              <NFTCard key={n.id} nft={n} onClick={() => setPage('detail')}
                favorited={favorites.has(n.id)} onFavorite={e => { e.stopPropagation(); onFavorite(n.id) }}/>
            ))}
          </div>
        )}
        {tab === 'activity' && (
          <div style={{ maxWidth: 800 }}>
            {ACTIVITIES.slice(0, 8).map((a, i) => (
              <ActivityRowComp key={i} activity={a}/>
            ))}
          </div>
        )}
        {tab === 'analytics' && (
          <div className="stack-md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {[['Avg. Sale Price', '2.15 ETH', '+18%'], ['Unique Buyers', '89', '+12%'], ['Listings', '23', '-4%'], ['Total Trades', '847', '+31%'], ['Bid Volume', '42.8 ETH', '+22%'], ['Royalties Earned', '63.5 ETH', '+18%']].map(([label, val, chg]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 28, color: '#f1f0ff', marginBottom: 6 }}>{val}</div>
                <div style={{ fontSize: 13, color: chg.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>{chg} vs last 7d</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── CREATOR PAGE ─────────────────────────────────────────────────────

function CreatorPage({ setPage, favorites, onFavorite }: {
  setPage: (p: Page) => void; favorites: Set<number>; onFavorite: (id: number) => void
}) {
  const creator = CREATORS[0]
  const [tab, setTab] = useState<'created'|'collected'|'activity'>('created')
  const [following, setFollowing] = useState(false)

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Cover */}
      <div style={{ height: 260, background: '#0a0a18', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${creator.color}22 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(34,211,238,0.1) 0%, transparent 50%), #0e0e1a` }}/>
        <Slider arts={slideArts(NFTS.find(n => n.creator === creator.id)?.art ?? 1, undefined, creator.id)} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,13,0.05) 0%, rgba(8,8,13,0.75) 100%)', pointerEvents: 'none', zIndex: 2 }}/>
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        {/* Profile header */}
        <div className="ident-row" style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: -48, marginBottom: 32, position: 'relative', zIndex: 5 }}>
          <div style={{ width: 96, height: 96, minWidth: 96, aspectRatio: '1 / 1', borderRadius: '50%', background: `linear-gradient(135deg, ${creator.color}88, ${creator.color}22)`, border: `3px solid #08080d`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: creator.color, fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}>
            {creator.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 28, color: '#f1f0ff' }}>{creator.name}</h1>
              {creator.verified && <VerifiedBadge size={18}/>}
            </div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>{creator.username}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['🌐'], ['𝕏'], ['📷']].map(([icon], i) => (
              <button key={i} className="btn-ghost" style={{ borderRadius: 10, width: 38, height: 38, padding: 0, fontSize: 16 }}>{icon}</button>
            ))}
            <button className={following ? 'btn-ghost' : 'btn-violet'} onClick={() => setFollowing(!following)} style={{ borderRadius: 10, padding: '8px 20px', fontSize: 14 }}>
              {following ? 'Following ✓' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Bio + stats */}
        <div className="stack-md" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, marginBottom: 36 }}>
          <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.75, maxWidth: 600 }}>{creator.bio}</p>
          <div style={{ display: 'flex', gap: 40 }}>
            {[['Followers', creator.followers], ['Following', creator.following], ['Total Sales', creator.sales]].map(([label, val]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: '#f1f0ff', marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 32, marginBottom: 32 }}>
          {(['created', 'collected', 'activity'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={tab === t ? 'tab-active' : 'tab-inactive'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', fontSize: 14, textTransform: 'capitalize', fontFamily: "'Space Grotesk',sans-serif" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'activity' ? (
          <div style={{ maxWidth: 800 }}>
            {ACTIVITIES.slice(0, 8).map((a, i) => <ActivityRowComp key={i} activity={a}/>)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
            {NFTS.filter(n => n.creator === creator.id || tab === 'collected').slice(0, 8).map(n => (
              <NFTCard key={n.id} nft={n} onClick={() => setPage('detail')}
                favorited={favorites.has(n.id)} onFavorite={e => { e.stopPropagation(); onFavorite(n.id) }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── RANKINGS PAGE ────────────────────────────────────────────────────

function RankingsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'collections'|'creators'|'nfts'>('collections')
  const [timePeriod, setTimePeriod] = useState<'24h'|'7d'|'30d'>('7d')

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 40px 100px' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: '#f1f0ff', marginBottom: 8 }}>Rankings</h1>
        <p style={{ fontSize: 15, color: '#6b7280' }}>The most traded collections, creators, and NFTs on NOVAFLUX</p>
      </div>

      {/* Tab + time filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['collections','creators','nfts'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ borderRadius: 99, padding: '7px 18px', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Space Grotesk',sans-serif", textTransform: 'capitalize',
                background: activeTab === t ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeTab === t ? '#a78bfa' : '#9ca3af',
                outline: activeTab === t ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['24h','7d','30d'] as const).map(t => (
            <button key={t} onClick={() => setTimePeriod(t)}
              style={{ borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Space Grotesk',sans-serif",
                background: timePeriod === t ? '#7c3aed' : 'rgba(255,255,255,0.04)',
                color: timePeriod === t ? 'white' : '#9ca3af' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'collections' && (
        <div className="table-scroll" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
          {/* Header row */}
          <div className="table-row" style={{ display: 'grid', gridTemplateColumns: '48px 2fr 1fr 1fr 1fr 80px', gap: 16, padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['#', 'Collection', 'Floor Price', 'Volume', 'Sales', `${timePeriod} Change`].map(h => (
              <div key={h} style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Space Grotesk',sans-serif" }}>{h}</div>
            ))}
          </div>
          {COLLECTIONS.map((col, i) => {
            const creator = CREATORS[col.creator]
            return (
              <div key={col.id} onClick={() => setPage('collection')}
                style={{ display: 'grid', gridTemplateColumns: '48px 2fr 1fr 1fr 1fr 80px', gap: 16, padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.2s', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.25)' }}>{i+1}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: '#0a0a18' }}><NFTArt id={col.art}/></div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: '#f1f0ff', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>{col.name} <VerifiedBadge size={13}/></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Avatar creator={creator} size={16}/><span style={{ fontSize: 12, color: '#6b7280' }}>{creator.name}</span></div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: '#a78bfa' }}>{col.floor}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: '#f1f0ff' }}>{col.volume}</div>
                <div style={{ fontSize: 14, color: '#9ca3af' }}>{col.items * 4}</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  <MiniChart up={col.up}/>
                  <span style={{ fontSize: 12, fontWeight: 700, color: col.up ? '#10b981' : '#ef4444' }}>{col.change}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'creators' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CREATORS.map((c, i) => <CreatorCard key={c.id} creator={c} rank={i+1} onClick={() => setPage('creator')}/>)}
        </div>
      )}

      {activeTab === 'nfts' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
          {[...NFTS].sort((a,b) => b.likes - a.likes).map(n => (
            <NFTCard key={n.id} nft={n} onClick={() => setPage('detail')}
              favorited={false} onFavorite={e => e.stopPropagation()}/>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Activity Row Component ────────────────────────────────────────────

function ActivityRowComp({ activity }: { activity: typeof ACTIVITIES[0] }) {
  const nft = NFTS[activity.nftIdx]
  const pillClass = { sale: 'pill-sale', listing: 'pill-listing', offer: 'pill-offer', bid: 'pill-bid', transfer: 'pill-transfer' }[activity.type] || 'pill-transfer'
  const icons = { sale: '💸', listing: '📋', offer: '💬', bid: '⚡', transfer: '↗' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: '#0a0a18' }}>
        <NFTArt id={nft.art}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#f1f0ff', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nft.name}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          {activity.from}
          {activity.to && <><span style={{ margin: '0 4px', color: '#4b5563' }}>→</span>{activity.to}</>}
        </div>
      </div>
      <span className={`pill ${pillClass}`} style={{ textTransform: 'capitalize', flexShrink: 0 }}>
        {(icons as Record<string,string>)[activity.type]} {activity.type}
      </span>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {activity.price && <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: '#a78bfa' }}>{activity.price}</div>}
        <div style={{ fontSize: 11, color: '#4b5563' }}>{activity.time}</div>
      </div>
    </div>
  )
}

// ─── ACTIVITY PAGE ────────────────────────────────────────────────────

function ActivityPage() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Sales', 'Listings', 'Offers', 'Bids', 'Transfers']
  const typeMap: Record<string, string> = { Sales: 'sale', Listings: 'listing', Offers: 'offer', Bids: 'bid', Transfers: 'transfer' }
  const filtered = filter === 'All' ? ACTIVITIES : ACTIVITIES.filter(a => a.type === typeMap[filter])

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 40px 100px' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: '#f1f0ff' }}>Live Activity</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '4px 12px', fontSize: 12, color: '#34d399', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} className="pulse-glow"/>
            Live
          </div>
        </div>
        <p style={{ fontSize: 15, color: '#6b7280' }}>Real-time marketplace transactions across NOVAFLUX</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, overflowX: 'auto' }} className="scroll-hide">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: "'Space Grotesk',sans-serif",
              background: filter === f ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#a78bfa' : '#9ca3af',
              outline: filter === f ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="hide-sm" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', gap: 16, padding: '10px 0 10px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 4 }}>
        {['Item', 'Event', 'Price', 'Time'].map(h => (
          <div key={h} style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Space Grotesk',sans-serif" }}>{h}</div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map((a, i) => <ActivityRowComp key={i} activity={a}/>)}
      </div>
    </div>
  )
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────

function ProfilePage({ setPage, favorites, onFavorite }: {
  setPage: (p: Page) => void; favorites: Set<number>; onFavorite: (id: number) => void
}) {
  const [tab, setTab] = useState<'collected'|'created'|'favorites'|'activity'>('collected')
  const me = CREATORS[0]
  const portfolioValue = '12.84 ETH'

  const stats = [
    { label: 'Portfolio Value', val: portfolioValue, sub: '$42,706', accent: true },
    { label: 'NFTs Owned', val: '18', sub: 'across 4 collections' },
    { label: 'NFTs Created', val: '144', sub: 'Synthetic Dreams' },
    { label: 'Total Sales', val: me.sales, sub: 'lifetime' },
    { label: 'Offers Received', val: '7', sub: '3 pending' },
    { label: 'Favorites', val: favorites.size.toString(), sub: 'saved items' },
  ]

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Cover */}
      <div style={{ height: 200, background: '#0a0a18', position: 'relative', overflow: 'hidden' }}>
        <Slider arts={[1,2,3,4,5,6]} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,13,0.05) 0%, rgba(8,8,13,0.75) 100%)', pointerEvents: 'none', zIndex: 2 }}/>
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        {/* Profile header */}
        <div className="ident-row" style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: -40, marginBottom: 36, position: 'relative', zIndex: 5 }}>
          <div style={{ width: 80, height: 80, minWidth: 80, aspectRatio: '1 / 1', borderRadius: '50%', background: `linear-gradient(135deg, ${me.color}88, ${me.color}22)`, border: `3px solid #08080d`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: me.color, fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}>
            {me.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, color: '#f1f0ff' }}>{me.name}</h1>
              {me.verified && <VerifiedBadge size={16}/>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280' }}>
              <span>{me.username}</span>
              <span>·</span>
              <span style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>0x4f2c…9b3c</span>
              <button className="btn-ghost" style={{ borderRadius: 7, padding: '3px 10px', fontSize: 11 }}>Copy</button>
            </div>
          </div>
          <button className="btn-ghost" style={{ borderRadius: 10, padding: '10px 20px', fontSize: 13, gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit Profile
          </button>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: s.accent ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${s.accent ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, color: s.accent ? '#a78bfa' : '#f1f0ff', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 32, marginBottom: 32 }}>
          {(['collected','created','favorites','activity'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={tab === t ? 'tab-active' : 'tab-inactive'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', fontSize: 14, textTransform: 'capitalize', fontFamily: "'Space Grotesk',sans-serif" }}>
              {t}
              {t === 'favorites' && favorites.size > 0 && <span style={{ marginLeft: 6, background: 'rgba(124,58,237,0.2)', color: '#a78bfa', borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{favorites.size}</span>}
            </button>
          ))}
        </div>

        {tab === 'activity' ? (
          <div style={{ maxWidth: 800 }}>
            {ACTIVITIES.slice(0, 8).map((a, i) => <ActivityRowComp key={i} activity={a}/>)}
          </div>
        ) : tab === 'favorites' ? (
          favorites.size > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
              {NFTS.filter(n => favorites.has(n.id)).map(n => (
                <NFTCard key={n.id} nft={n} onClick={() => setPage('detail')}
                  favorited={true} onFavorite={e => { e.stopPropagation(); onFavorite(n.id) }}/>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#4b5563' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 18, color: '#9ca3af', marginBottom: 8 }}>No favorites yet</div>
              <div style={{ fontSize: 14 }}>Heart NFTs you love to save them here</div>
              <button className="btn-violet" onClick={() => setPage('explore')} style={{ borderRadius: 10, padding: '10px 24px', fontSize: 14, marginTop: 20 }}>Explore NFTs</button>
            </div>
          )
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
            {(tab === 'created' ? NFTS.filter(n => n.creator === 0) : NFTS.slice(0, 6)).map(n => (
              <NFTCard key={n.id} nft={n} onClick={() => setPage('detail')}
                favorited={favorites.has(n.id)} onFavorite={e => { e.stopPropagation(); onFavorite(n.id) }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [walletOpen, setWalletOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const onFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const [pending, setPending] = useState<Page | null>(null)
  const openWallet = () => setWalletOpen(true)
  const go = (p: Page) => {
    if (p === 'profile' && !connected) { setPending('profile'); setWalletOpen(true); return }
    setPage(p)
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ background: '#08080d', minHeight: '100vh', color: '#f1f0ff' }}>
      {/* Ambient background glow */}
      <div style={{ position: 'fixed', top: 0, left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}/>
      <div style={{ position: 'fixed', top: '30%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav page={page} setPage={go} openWallet={openWallet} connected={connected}/>

        {page === 'home' && <HomePage setPage={go} favorites={favorites} onFavorite={onFavorite} openWallet={openWallet}/>}
        {page === 'explore' && <ExplorePage setPage={go} favorites={favorites} onFavorite={onFavorite}/>}
        {page === 'detail' && <NFTDetailPage setPage={go} favorites={favorites} onFavorite={onFavorite} openWallet={openWallet}/>}
        {page === 'collection' && <CollectionPage setPage={go} favorites={favorites} onFavorite={onFavorite}/>}
        {page === 'creator' && <CreatorPage setPage={go} favorites={favorites} onFavorite={onFavorite}/>}
        {page === 'rankings' && <RankingsPage setPage={go}/>}
        {page === 'activity' && <ActivityPage/>}
        {page === 'profile' && <ProfilePage setPage={go} favorites={favorites} onFavorite={onFavorite}/>}

        <MobileNav page={page} setPage={go}/>
        <Footer setPage={go} openWallet={openWallet} connected={connected}/>
      </div>

      {walletOpen && (
        <WalletModal
          onClose={() => { setWalletOpen(false); setPending(null) }}
          onConnect={() => { setConnected(true); setWalletOpen(false); if (pending) { setPage(pending); setPending(null); window.scrollTo({ top: 0 }) } }}
        />
      )}

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input, textarea { cursor: text; caret-color: #a78bfa; }
        select, button { cursor: pointer; }
        img { max-width: 100%; }
        @media (max-width: 768px) {
          [style*="padding: 0px 40px"], [style*="padding: 48px 40px"], .nav-inner, .footer-pad { padding-left: 16px !important; padding-right: 16px !important; }
          .nav-logo { margin-right: 0 !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; padding-top: 32px !important; padding-bottom: 56px !important; }
          .hero-grid h1 { font-size: 44px !important; }
          .hero-grid p { font-size: 16px !important; }
          .hero-grid .glass[style*="left: -20px"] { left: 8px !important; bottom: -16px !important; }
          .stack-md { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ident-row { flex-wrap: wrap !important; align-items: flex-start !important; gap: 14px !important; }
          .ident-row > div[style*="flex: 1 1"], .ident-row > div[style*="flex: 1"] { min-width: 0; flex-basis: 100% !important; }
          .table-scroll { overflow-x: auto !important; }
          .table-row { min-width: 640px; }
          .hide-sm { display: none !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
          footer { padding-bottom: 72px; }
          h1 { word-break: break-word; }
        }
        @media (max-width: 768px) {
          .md\\:block { display: none !important; }
          .md\\:flex { display: none !important; }
          .md\\:hidden { display: flex !important; }
        }
        @media (min-width: 769px) {
          .md\\:block { display: block !important; }
          .md\\:flex { display: flex !important; }
          .md\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
