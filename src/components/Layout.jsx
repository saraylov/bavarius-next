import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const BASE = import.meta.env.BASE_URL

const NAV_LEFT = [
  { to: '/bron', label: 'Бронь' },
  { to: '/filosofija', label: 'Философия' },
  { to: '/menu', label: 'Меню доставка' },
]

const NAV_RIGHT = [
  { to: '/akcii', label: 'Акции' },
  { to: '/dostavka', label: 'Доставка' },
  { to: '/contacts', label: 'Контакты' },
]

const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT]

const NAV_MOBILE = [
  NAV_LEFT.find(l => l.to === '/filosofija'),
  NAV_LEFT.find(l => l.to === '/menu'),
  NAV_LEFT.find(l => l.to === '/bron'),
  ...NAV_RIGHT,
]

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { items, removeItem, changeQty, total, count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [badgePulse, setBadgePulse] = useState(false)
  const cartRef = useRef(null)
  const prevCount = useRef(count)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    // PWA install prompt
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => { clearTimeout(t); window.removeEventListener('beforeinstallprompt', handler) }
  }, [])

  // Close cart on outside click
  useEffect(() => {
    if (!cartOpen) return
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [cartOpen])

  // Cart badge pulse on count change
  useEffect(() => {
    if (prevCount.current !== count && prevCount.current < count) {
      setBadgePulse(true)
      const t = setTimeout(() => setBadgePulse(false), 400)
      prevCount.current = count
      return () => clearTimeout(t)
    }
    prevCount.current = count
  }, [count])

  return (
    <div className={isHome ? 'home-page' : 'bg-dark'}>
      {/* Loader */}
      <div className={`loader-overlay ${loading ? '' : 'hidden'}`}>
        <div className="loader-spinner" />
      </div>

      {/* ===== HEADER ===== */}
      <header className="site-header">
        <div className="header-bar">

          {/* Hamburger (mobile only) */}
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
            <img src={`${BASE}img/hamburger_icon.png`} alt="" /> Меню
          </button>

          {/* Desktop nav — left group */}
          <nav className="header-nav header-nav--left" aria-label="Основная навигация">
            {NAV_LEFT.map(l => (
              <Link key={l.to} to={l.to} className={`header-nav-link ${pathname === l.to ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — always centered */}
          <Link to="/" className="header-logo" aria-label="На главную">
            <img src={`${BASE}img/bav_min.png`} alt="Бавариус" />
          </Link>

          {/* Desktop nav — right group */}
          <nav className="header-nav header-nav--right" aria-label="Дополнительная навигация">
            {NAV_RIGHT.map(l => (
              <Link key={l.to} to={l.to} className={`header-nav-link ${pathname === l.to ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <div className="cart-widget" ref={cartRef}>
            <button className="cart-toggle" onClick={() => setCartOpen(o => !o)} aria-label="Корзина">
              <img src={`${BASE}img/business.svg`} alt="" />
              {count > 0 && <span className={`cart-badge${badgePulse ? ' pulse' : ''}`}>{count}</span>}
            </button>
            <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
              <h3>Корзина</h3>
              {items.length === 0 && <p className="cart-empty">Корзина пуста</p>}
              {items.map(item => (
                <div key={item.code} className="cart-row">
                  <span className="cart-row-name">{item.name}</span>
                  <div className="cart-row-actions">
                    <button className="cart-qty-btn" onClick={() => changeQty(item.code, -1)}>−</button>
                    <span className="cart-qty">{item.quant}</span>
                    <button className="cart-qty-btn" onClick={() => changeQty(item.code, 1)}>+</button>
                    <button className="cart-remove" onClick={() => removeItem(item.code)}>✕</button>
                  </div>
                </div>
              ))}
              {items.length > 0 && (
                <div className="cart-total">Итого: <strong>{total.toLocaleString('ru-RU')} ₽</strong></div>
              )}
              <Link to="/cart" className="cart-order-btn" onClick={() => setCartOpen(false)}>
                Оформить заказ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      <div className={`menu-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">✕</button>
        <div className="mobile-menu-logo">
          <img src={`${BASE}img/bav_min.png`} alt="" />
        </div>
        <nav>
          {NAV_MOBILE.map(l => (
            <Link key={l.to} to={l.to} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-menu-footer-text">© Бавариус. Мясо.Гриль.Специи</div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}

      {/* PWA Install Banner */}
      {installPrompt && (
        <div className="pwa-install-banner">
          <div className="pwa-install-info">
            <img src={`${BASE}img/icon-192.png`} alt="" className="pwa-install-icon" />
            <div>
              <div className="pwa-install-title">Установить приложение</div>
              <div className="pwa-install-sub">Быстрый доступ к меню и заказам</div>
            </div>
          </div>
          <div className="pwa-install-actions">
            <button className="pwa-install-btn" onClick={async () => {
              await installPrompt.prompt()
              const result = await installPrompt.userChoice
              if (result.outcome === 'accepted') setInstallPrompt(null)
            }}>Установить</button>
            <button className="pwa-install-close" onClick={() => setInstallPrompt(null)}>✕</button>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">© Бавариус. Мясо.Гриль.Специи</div>
          <div className="footer-col">
            <img src={`${BASE}img/pin.svg`} className="pin" alt="" /> Берёзовая аллея, 31
          </div>
          <div className="footer-col"><a href="tel:+78142771323">+7 (8142) 77-13-23</a></div>
          <div className="footer-col footer-vk">
            <a href="https://vk.com/bavarius_ptz" target="_blank" rel="noopener">
              <img src={`${BASE}img/icon_vk.png`} alt="VK" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <Link to="/politika">Политика конфиденциальности и обработки данных</Link>
          <div><a href="https://vk.com/gagarinmarketing" target="_blank" rel="noopener">Создание сайта "Маркетинговое агентство Гагарин"</a></div>
        </div>
      </footer>
    </div>
  )
}
