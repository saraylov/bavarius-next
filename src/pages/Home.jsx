import { useState, useEffect } from 'react'

const BASE = import.meta.env.BASE_URL
const BGS = [`${BASE}img/bg_main.jpg`, `${BASE}img/bg_main2.jpg`, `${BASE}img/bg_main3.jpg`]

export default function Home() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % BGS.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="home-hero">
      {BGS.map((src, i) => (
        <img key={src} src={src} alt="" className={`home-hero-img ${i === idx ? 'visible' : ''}`} />
      ))}
      <div className="home-hero-logo">
        <img src={`${BASE}img/logo.png`} alt="БАВАРИУС. Мясо.Гриль.Специи." />
      </div>
    </div>
  )
}
