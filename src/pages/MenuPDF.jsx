export default function MenuPDF() {
  const BASE = import.meta.env.BASE_URL
  return (
    <div className="container text-center">
      <h3>Меню PDF</h3>
      <a href="https://bavarius-ptz.ru/wp-content/uploads/2026/02/%D0%BC%D0%B5%D0%BD%D1%8E-2026.pdf" target="_blank" rel="noopener">
        <img src={`${BASE}img/bavarius_prev.jpg`} alt="Основное меню" style={{maxWidth:300}} />
        <div style={{fontSize:23,marginTop:15}}>Основное меню</div>
      </a>
    </div>
  )
}
