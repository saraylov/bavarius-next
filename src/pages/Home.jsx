import { useState, useEffect } from 'react'

const BGS = ['/img/bg_main.jpg', '/img/bg_main2.jpg', '/img/bg_main3.jpg']

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
        <img src="/img/logo.png" alt="БАВАРИУС. Мясо.Гриль.Специи." />
      </div>
    </div>
  )
}
