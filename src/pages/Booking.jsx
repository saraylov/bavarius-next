export default function Booking() {
  return (
    <div className="container" style={{maxWidth:500}}>
      <h2>Бронирование столика</h2>
      <p>Забронировать столик можно по телефону <strong>77-13-23</strong></p>
      <form onSubmit={e => { e.preventDefault(); alert('Спасибо! Ваша заявка отправлена.'); }}>
        <div className="form-group"><label>Имя</label><input className="form-control" required placeholder="Ваше имя:" /></div>
        <div className="form-group"><label>Телефон</label><input className="form-control" required placeholder="Ваш телефон:" /></div>
        <div className="form-group"><label>Дата и время</label><input className="form-control" type="datetime-local" required /></div>
        <div className="form-group"><label>Количество персон</label><input className="form-control" type="number" required /></div>
        <div className="form-group"><label>Ресторан</label>
          <select className="form-control">
            <option>Октябрьский пр., 13</option>
            <option>Берёзовая аллея, 31</option>
          </select>
        </div>
        <label style={{color:'#fff',display:'block',marginBottom:12}}>
          <input type="checkbox" required /> Я согласен с обработкой персональных данных
        </label>
        <button type="submit" className="btn-primary">Забронировать</button>
      </form>
    </div>
  )
}
