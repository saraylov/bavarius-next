import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bavarius_cart')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('bavarius_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((code, name, price) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.code === code)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quant: next[idx].quant + 1 }
        return next
      }
      return [...prev, { code, name, price, quant: 1 }]
    })
  }, [])

  const removeItem = useCallback((code) => {
    setItems(prev => prev.filter(i => i.code !== code))
  }, [])

  const changeQty = useCallback((code, delta) => {
    setItems(prev => prev.map(i =>
      i.code === code ? { ...i, quant: Math.max(1, Math.min(50, i.quant + delta)) } : i
    ))
  }, [])

  const total = items.reduce((s, i) => s + i.price * i.quant, 0)
  const count = items.reduce((s, i) => s + i.quant, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQty, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
