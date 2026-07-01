import { useState, useCallback } from 'react'
import { MENU, IMG } from '../data/menuData'
import { useCart } from '../context/CartContext'

const BASE = import.meta.env.BASE_URL

export default function MenuPage() {
  const [tab, setTab] = useState('kitchen')
  const [preview, setPreview] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const { addItem } = useCart()

  const tabs = [
    { key: 'kitchen', label: 'Кухня' },
    { key: 'certificates', label: 'Сертификаты' },
    { key: 'express', label: 'Экспресс Обеды' },
    { key: 'pdf', label: 'Меню PDF' },
  ]

  const showPreview = useCallback((src) => setPreview(src), [])
  const hidePreview = useCallback(() => setPreview(null), [])
  const openDish = useCallback((item) => setSelectedDish(item), [])
  const closeDish = useCallback(() => setSelectedDish(null), [])

  const renderItems = (items) => items.map(item => {
    const imgSrc = IMG[item.id] ? `${BASE}menu-images/${IMG[item.id]}` : null
    return (
      <div key={item.id} className="menu-item">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={item.name}
            className="menu-item-thumb"
            loading="lazy"
            onMouseEnter={() => showPreview(imgSrc)}
            onMouseLeave={hidePreview}
            onClick={() => openDish(item)}
          />
        )}
        <span className="menu-item-name">{item.name}</span>
        <span className="menu-item-price">{item.price} ₽</span>
        <button className="add-to-cart" onClick={() => addItem(item.id, item.name, item.price)}>
          В корзину
        </button>
        {item.desc && <div className="menu-item-desc">{item.desc}</div>}
      </div>
    )
  })

  return (
    <div className="container">
      <div className="menu-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`menu-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === 'kitchen' && Object.entries(MENU.kitchen).map(([cat, items]) => (
        <div key={cat}>
          <h2 className="menu-section-title">{cat}</h2>
          {renderItems(items)}
        </div>
      ))}

      {tab === 'certificates' && (
        <div>
          <h2 className="menu-section-title">Подарочные сертификаты</h2>
          {renderItems(MENU.certificates)}
        </div>
      )}

      {tab === 'express' && (
        <div>
          <h2 className="menu-section-title">Экспресс Обеды</h2>
          {renderItems(MENU.express)}
        </div>
      )}

      {tab === 'pdf' && (
        <div className="text-center" style={{padding:'40px 0'}}>
          <a
            href="https://bavarius-ptz.ru/wp-content/uploads/2026/02/%D0%BC%D0%B5%D0%BD%D1%8E-2026.pdf"
            target="_blank"
            rel="noopener"
            style={{display:'inline-block'}}
          >
            <img src={`${BASE}img/bavarius_prev.jpg`} alt="Основное меню" style={{maxWidth:300,borderRadius:8,boxShadow:'0 4px 20px rgba(0,0,0,0.5)'}} />
            <div style={{fontSize:23,marginTop:16,fontFamily:'var(--font-cervo-m)'}}>Основное меню</div>
            <div style={{marginTop:8,fontSize:14,color:'#aaa'}}>Нажмите, чтобы скачать PDF</div>
          </a>
        </div>
      )}

      {/* Image Preview Overlay (hover) */}
      {preview && (
        <div className="img-preview-overlay" onClick={hidePreview}>
          <div className="img-preview-wrapper" onClick={e => e.stopPropagation()}>
            <img src={preview} alt="" className="img-preview-img" />
            <button className="img-preview-close" onClick={hidePreview}>✕</button>
          </div>
        </div>
      )}

      {/* Dish Detail Modal (click) */}
      {selectedDish && (
        <div className="dish-modal-overlay" onClick={closeDish}>
          <div className="dish-modal" onClick={e => e.stopPropagation()}>
            <button className="dish-modal-close" onClick={closeDish}>✕</button>

            {IMG[selectedDish.id] && (
              <div className="dish-modal-img-wrap">
                <img
                  src={`${BASE}menu-images/${IMG[selectedDish.id]}`}
                  alt={selectedDish.name}
                  className="dish-modal-img"
                />
              </div>
            )}

            <div className="dish-modal-body">
              <h2 className="dish-modal-title">{selectedDish.name}</h2>
              <div className="dish-modal-price">{selectedDish.price} ₽</div>

              {selectedDish.desc && (
                <div className="dish-modal-desc">
                  <h4>Состав:</h4>
                  <p>{selectedDish.desc}</p>
                </div>
              )}

              <button
                className="dish-modal-cart-btn"
                onClick={() => {
                  addItem(selectedDish.id, selectedDish.name, selectedDish.price)
                  closeDish()
                }}
              >
                Добавить в корзину — {selectedDish.price} ₽
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
