import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeItem, changeQty, total, count } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', address: '', comment: '' })
  const [submitted, setSubmitted] = useState(false)

  if (count === 0 && !submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
        <h2>Корзина пуста</h2>
        <p style={{ marginTop: 16, marginBottom: 24 }}>Добавьте блюда из меню, чтобы оформить заказ</p>
        <Link to="/menu" className="cart-to-menu-btn">Перейти в меню</Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => navigate('/order-success'), 1500)
  }

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
        <div className="checkout-success-icon">✓</div>
        <h2 style={{ marginTop: 20 }}>Заказ оформляется...</h2>
        <p style={{ marginTop: 8, color: '#aaa' }}>Перенаправляем на страницу подтверждения</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <h2>Оформление заказа</h2>

      <div className="checkout-layout">
        {/* Order items */}
        <div className="checkout-items">
          <h3 className="checkout-section-title">Ваш заказ</h3>
          {items.map(item => (
            <div key={item.code} className="checkout-item">
              <div className="checkout-item-info">
                <span className="checkout-item-name">{item.name}</span>
                <span className="checkout-item-price">{item.price} ₽ × {item.quant}</span>
              </div>
              <div className="checkout-item-actions">
                <button className="cart-qty-btn" onClick={() => changeQty(item.code, -1)}>−</button>
                <span className="cart-qty">{item.quant}</span>
                <button className="cart-qty-btn" onClick={() => changeQty(item.code, 1)}>+</button>
                <button className="cart-remove" onClick={() => removeItem(item.code)}>✕</button>
              </div>
            </div>
          ))}
          <div className="checkout-total">
            <span>Итого:</span>
            <strong>{total.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </div>

        {/* Order form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3 className="checkout-section-title">Данные для доставки</h3>

          <div className="form-group">
            <label>Имя *</label>
            <input className="form-control" required placeholder="Ваше имя" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <input className="form-control" required type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Адрес доставки *</label>
            <input className="form-control" required placeholder="Улица, дом, квартира" value={form.address}
              onChange={e => setForm({...form, address: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Комментарий к заказу</label>
            <textarea className="form-control" rows="3" placeholder="Пожелания, уточнения..."
              value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
          </div>

          <div className="checkout-info">
            <h4>Информация</h4>
            <p>Доставка: 300–400 ₽ в зависимости от района</p>
            <p>Время работы: ежедневно 12:00–23:00</p>
            <p>Оплата: наличными или картой при получении</p>
          </div>

          <button type="submit" className="checkout-submit-btn">
            Оформить заказ на {total.toLocaleString('ru-RU')} ₽
          </button>
        </form>
      </div>
    </div>
  )
}
