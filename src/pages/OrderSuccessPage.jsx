import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

export default function OrderSuccessPage() {
  const { items, total, count } = useCart()

  // In a real app, we'd clear the cart here. For demo, we just show the order.
  const orderNumber = 'B' + Date.now().toString(36).toUpperCase().slice(-6)

  return (
    <div className="container" style={{ maxWidth: 600, textAlign: 'center', paddingTop: 60 }}>
      <div className="order-success-icon">✓</div>
      <h2 style={{ marginTop: 16 }}>Заказ принят!</h2>
      <p style={{ marginTop: 8, color: '#aaa', marginBottom: 32 }}>
        Номер вашего заказа: <strong style={{ color: '#fff' }}>#{orderNumber}</strong>
      </p>

      {count > 0 && (
        <div className="order-receipt">
          <h3 className="checkout-section-title">Детали заказа</h3>
          {items.map(item => (
            <div key={item.code} className="checkout-item" style={{ justifyContent: 'space-between' }}>
              <span>{item.name} × {item.quant}</span>
              <span>{item.price * item.quant} ₽</span>
            </div>
          ))}
          <div className="checkout-total">
            <span>Итого:</span>
            <strong>{total.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </div>
      )}

      <div className="order-info-block">
        <p>📞 Оператор свяжется с вами в ближайшее время для подтверждения</p>
        <p>🚚 Доставка: ежедневно 12:00–23:00</p>
        <p>💳 Оплата: наличными или картой при получении</p>
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/menu" className="cart-to-menu-btn">Вернуться в меню</Link>
        <Link to="/" className="cart-to-menu-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}>
          На главную
        </Link>
      </div>
    </div>
  )
}
