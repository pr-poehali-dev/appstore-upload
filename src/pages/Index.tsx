import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "suppliers" | "delivery" | "courses" | "chat" | "profile" | "news";

const FACTORY_IMG = "https://cdn.poehali.dev/projects/9559d5cc-ec8c-4343-b3ff-97ed72df958c/files/7e7abed1-1039-4a1a-8aa0-b9ad7a5c9ed1.jpg";

const suppliers = [
  { id: 1, name: "Guangzhou Elite Textile Co.", category: "Текстиль", rating: 4.9, orders: "2 400", verified: true, price: "от $0.8/шт", country: "Гуанчжоу", tag: "ТОП" },
  { id: 2, name: "Shenzhen TechParts Ltd.", category: "Электроника", rating: 4.8, orders: "5 100", verified: true, price: "от $12/шт", country: "Шэньчжэнь", tag: "Надёжный" },
  { id: 3, name: "Yiwu Accessories World", category: "Аксессуары", rating: 4.7, orders: "8 900", verified: true, price: "от $0.3/шт", country: "Иу", tag: "Оптом" },
  { id: 4, name: "Hangzhou Fashion Group", category: "Одежда", rating: 4.6, orders: "1 200", verified: false, price: "от $2.5/шт", country: "Ханчжоу", tag: "Новый" },
  { id: 5, name: "Foshan Furniture Factory", category: "Мебель", rating: 4.8, orders: "630", verified: true, price: "от $45/шт", country: "Фошань", tag: "Эксклюзив" },
  { id: 6, name: "Ningbo Sporting Goods", category: "Спорттовары", rating: 4.5, orders: "3 300", verified: true, price: "от $5/шт", country: "Нинбо", tag: "Хит" },
];

const deliveries = [
  { id: "CB-2024-0891", product: "Электроника (120 ед.)", status: "В пути", statusKey: "transit", progress: 65, from: "Шэньчжэнь", to: "Москва", eta: "3 июня", weight: "48 кг" },
  { id: "CB-2024-0756", product: "Текстиль (500 ед.)", status: "Таможня", statusKey: "pending", progress: 45, from: "Гуанчжоу", to: "Санкт-Петербург", eta: "8 июня", weight: "120 кг" },
  { id: "CB-2024-0634", product: "Аксессуары (1000 ед.)", status: "Доставлен", statusKey: "done", progress: 100, from: "Иу", to: "Казань", eta: "Завершено", weight: "35 кг" },
];

const courses = [
  { id: 1, title: "Старт с нуля: первая закупка в Китае", level: "Начинающий", lessons: 12, students: "4 200", price: "Бесплатно", duration: "6 ч", emoji: "🚀" },
  { id: 2, title: "Переговоры с поставщиками на практике", level: "Средний", lessons: 18, students: "2 100", price: "2 900 ₽", duration: "9 ч", emoji: "🤝" },
  { id: 3, title: "Логистика и таможня без ошибок", level: "Средний", lessons: 15, students: "1 800", price: "3 500 ₽", duration: "8 ч", emoji: "📦" },
  { id: 4, title: "Маркировка и сертификация товаров", level: "Продвинутый", lessons: 10, students: "980", price: "1 900 ₽", duration: "5 ч", emoji: "📋" },
];

const news = [
  { id: 1, title: "Новые правила ввоза товаров из Китая в 2024 году", date: "24 мая 2024", tag: "Таможня", hot: true },
  { id: 2, title: "Canton Fair 2024: что везут российские предприниматели", date: "22 мая 2024", tag: "Выставки", hot: true },
  { id: 3, title: "Курс юань/рубль: прогноз на лето 2024", date: "20 мая 2024", tag: "Финансы", hot: false },
  { id: 4, title: "Топ-10 трендовых категорий для импорта этим летом", date: "18 мая 2024", tag: "Аналитика", hot: false },
  { id: 5, title: "Открытие новых маршрутов: Чжэнчжоу — Москва", date: "15 мая 2024", tag: "Логистика", hot: false },
];

const chatMsgs = [
  { id: 1, name: "Ли Вэй — Guangzhou Elite", avatar: "🏭", text: "Готов обсудить условия партии от 500 единиц", time: "10:32", unread: 2 },
  { id: 2, name: "Поддержка ChinaBridge", avatar: "💬", text: "Ваш запрос #4821 принят в работу", time: "09:15", unread: 0 },
  { id: 3, name: "Чэнь Цзяо — TechParts", avatar: "⚡", text: "Отправил каталог с актуальными ценами", time: "Вчера", unread: 1 },
];

const categoryFilters = ["Все", "Текстиль", "Электроника", "Одежда", "Аксессуары", "Мебель", "Спорттовары"];

const navItems: { key: Section; label: string; icon: string }[] = [
  { key: "home", label: "Главная", icon: "Home" },
  { key: "suppliers", label: "Поставщики", icon: "Building2" },
  { key: "delivery", label: "Доставка", icon: "Package" },
  { key: "courses", label: "Обучение", icon: "GraduationCap" },
  { key: "chat", label: "Чат", icon: "MessageCircle" },
  { key: "news", label: "Новости", icon: "Newspaper" },
  { key: "profile", label: "Кабинет", icon: "User" },
];

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [activeCat, setActiveCat] = useState("Все");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = suppliers.filter(s => {
    const catOk = activeCat === "Все" || s.category === activeCat;
    const srchOk = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    return catOk && srchOk;
  });

  const go = (s: Section) => { setSection(s); setMobileOpen(false); window.scrollTo(0, 0); };

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Promo bar */}
      <div className="promo-bar hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <span>🎁 Первая сделка без комиссии для новых клиентов</span>
          <div className="flex items-center gap-4 text-sm">
            <span style={{ color: "rgba(255,255,255,0.7)" }}>+7 800 555-35-35</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Поддержка 24/7</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid var(--border-color)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[60px] flex items-center gap-6">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 flex-shrink-0">
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 16 }}>中</span>
            </div>
            <span style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>
              China<span style={{ color: "var(--blue)" }}>Bridge</span>
            </span>
          </button>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={`nav-link flex items-center gap-1.5 ${section === item.key ? "nav-link-active" : ""}`}
              >
                <Icon name={item.icon as "Home"} size={14} />
                {item.label}
                {item.key === "chat" && (
                  <span style={{ background: "var(--blue)", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 99, minWidth: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>3</span>
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="hidden md:flex btn-outline px-4 py-2 text-sm">
              Войти
            </button>
            <button className="hidden md:flex btn-primary px-4 py-2 text-sm">
              Регистрация
            </button>
            <button className="lg:hidden btn-ghost p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div style={{ background: "white", borderTop: "1px solid var(--border-color)", padding: "12px 16px" }}>
            {navItems.map(item => (
              <button key={item.key} onClick={() => go(item.key)} className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm" style={{ color: section === item.key ? "var(--blue)" : "var(--text-secondary)", background: section === item.key ? "var(--blue-light)" : "transparent", fontWeight: section === item.key ? 600 : 400 }}>
                <Icon name={item.icon as "Home"} size={16} />
                {item.label}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--border-color)", marginTop: 8, paddingTop: 8, display: "flex", gap: 8 }}>
              <button className="btn-outline flex-1 py-2 text-sm justify-center">Войти</button>
              <button className="btn-primary flex-1 py-2 text-sm justify-center">Регистрация</button>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN ─── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-24 lg:pb-8">

        {/* ════ HOME ════ */}
        {section === "home" && (
          <div className="anim-0">
            {/* Hero */}
            <section className="hero-section rounded-2xl px-8 md:px-14 py-12 md:py-16 mb-6 relative overflow-hidden">
              {/* decorative blob */}
              <div style={{ position: "absolute", right: -60, top: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: 40, top: 0, bottom: 0, display: "flex", alignItems: "center", pointerEvents: "none" }} className="hidden md:flex">
                <img src={FACTORY_IMG} alt="" style={{ width: 300, height: 200, objectFit: "cover", borderRadius: 16, opacity: 0.18, filter: "grayscale(30%)" }} />
              </div>
              <div className="relative max-w-xl">
                <div className="section-label mb-3 anim-0">Платформа для импорта из Китая</div>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.15, marginBottom: 16 }} className="anim-1">
                  Бизнес с Китаем —<br />
                  <span style={{ color: "var(--blue)" }}>просто и безопасно</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6, marginBottom: 28 }} className="anim-2">
                  Поставщики, доставка, обучение и поддержка. Всё для успешного импорта в одном месте.
                </p>
                {/* Search bar */}
                <div className="flex gap-2 anim-3 max-w-md">
                  <div className="relative flex-1">
                    <Icon name="Search" size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input className="input-base" style={{ paddingLeft: 38 }} placeholder="Найти поставщика или товар..." />
                  </div>
                  <button className="btn-primary px-5 py-2.5 text-sm flex-shrink-0" onClick={() => go("suppliers")}>
                    Найти
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 anim-4">
                  {["Текстиль", "Электроника", "Одежда", "Мебель"].map(t => (
                    <button key={t} className="pill text-xs" onClick={() => { go("suppliers"); setActiveCat(t); }}>{t}</button>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { v: "12 400+", l: "Поставщиков", i: "Building2" },
                { v: "8 900", l: "Доставок в месяц", i: "Package" },
                { v: "45K+", l: "Студентов", i: "GraduationCap" },
                { v: "23K+", l: "Клиентов", i: "Users" },
              ].map((s, i) => (
                <div key={s.l} className={`card-base p-5 anim-${i}`}>
                  <div className="icon-box mb-3">
                    <Icon name={s.i as "Home"} size={20} style={{ color: "var(--blue)" }} />
                  </div>
                  <div className="stat-num text-2xl">{s.v}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 20 }}>Все сервисы</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {[
                { key: "suppliers" as Section, icon: "Building2", title: "Каталог поставщиков", desc: "12 400+ проверенных производителей и поставщиков из Китая" },
                { key: "delivery" as Section, icon: "Package", title: "Отслеживание доставки", desc: "Контроль груза от склада в Китае до вашего адреса в России" },
                { key: "courses" as Section, icon: "GraduationCap", title: "Курсы и обучение", desc: "От первой закупки до построения импортного бизнеса" },
                { key: "chat" as Section, icon: "MessageCircle", title: "Прямой чат", desc: "Общение с поставщиками и поддержкой на русском языке" },
                { key: "profile" as Section, icon: "User", title: "Личный кабинет", desc: "История заказов, аналитика расходов и сохранённые поставщики" },
                { key: "news" as Section, icon: "Newspaper", title: "Новости и аналитика", desc: "Таможня, курсы валют и актуальные тренды рынка" },
              ].map((srv, i) => (
                <button key={srv.key} onClick={() => go(srv.key)} className={`card-base p-5 text-left anim-${i}`}>
                  <div className="icon-box mb-3">
                    <Icon name={srv.icon as "Home"} size={20} style={{ color: "var(--blue)" }} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>{srv.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12 }}>{srv.desc}</p>
                  <span style={{ fontSize: 13, color: "var(--blue)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    Открыть <Icon name="ArrowRight" size={13} />
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Banner */}
            <div style={{ background: "var(--blue)", borderRadius: 16, padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16 }} className="md:flex-row md:items-center md:justify-between">
              <div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Специальное предложение</div>
                <h3 style={{ color: "white", fontSize: 22, fontFamily: "'Rubik', sans-serif", marginBottom: 4 }}>Первая закупка — без комиссии</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>Полное сопровождение сделки бесплатно для новых клиентов</p>
              </div>
              <button style={{ background: "white", color: "var(--blue)", fontFamily: "'Rubik', sans-serif", fontWeight: 700, padding: "12px 24px", borderRadius: 8, fontSize: 14, whiteSpace: "nowrap", flexShrink: 0, transition: "transform 0.15s, box-shadow 0.15s" }} className="hover:scale-[1.02]">
                Начать бесплатно →
              </button>
            </div>
          </div>
        )}

        {/* ════ SUPPLIERS ════ */}
        {section === "suppliers" && (
          <div className="anim-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 style={{ fontSize: 24, marginBottom: 2 }}>Каталог поставщиков</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>12 400+ проверенных производителей</p>
              </div>
            </div>

            {/* Filters */}
            <div className="card-base p-4 mb-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Icon name="Search" size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input className="input-base" style={{ paddingLeft: 36 }} placeholder="Поиск поставщика..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 border rounded-lg" style={{ borderColor: "var(--border-color)" }}>
                <Icon name="SlidersHorizontal" size={15} /> Фильтры
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mb-5">
              {categoryFilters.map(cat => (
                <button key={cat} className={`pill ${activeCat === cat ? "pill-active" : ""}`} onClick={() => setActiveCat(cat)}>{cat}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((s, i) => (
                <div key={s.id} className={`card-base p-5 anim-${Math.min(i, 5)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏭</div>
                    <div className="flex gap-1.5">
                      {s.verified && <span className="badge-green">Проверен</span>}
                      <span className="badge-blue">{s.tag}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.4 }}>{s.name}</h3>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
                    <Icon name="MapPin" size={11} /> {s.country} · {s.category}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                    <div style={{ background: "var(--bg-page)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Рейтинг</div>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 15 }}>
                        <span style={{ color: "#F79009" }}>★</span> {s.rating}
                      </div>
                    </div>
                    <div style={{ background: "var(--bg-page)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Заказов</div>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 15 }}>{s.orders}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", marginBottom: 12 }}>{s.price}</div>
                  <button className="btn-primary w-full py-2.5 text-sm justify-center">Связаться</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ DELIVERY ════ */}
        {section === "delivery" && (
          <div className="anim-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 style={{ fontSize: 24, marginBottom: 2 }}>Мои доставки</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>Отслеживание и управление отправлениями</p>
              </div>
              <button className="btn-primary px-4 py-2 text-sm">
                <Icon name="Plus" size={15} /> Новая доставка
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "В пути", count: 1, dot: "dot-orange" },
                { label: "На таможне", count: 1, dot: "dot-orange" },
                { label: "Доставлено", count: 1, dot: "dot-green" },
              ].map(item => (
                <div key={item.label} className="card-base p-4 text-center">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
                    <span className={item.dot} />
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.label}</span>
                  </div>
                  <div className="stat-num text-3xl">{item.count}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {deliveries.map((d, i) => (
                <div key={d.id} className={`card-base p-5 anim-${i}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "var(--blue)", background: "var(--blue-light)", padding: "2px 8px", borderRadius: 4 }}>{d.id}</span>
                        <span className={d.statusKey === "done" ? "badge-green" : "badge-orange"}
                          style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <span className={d.statusKey === "done" ? "dot-green" : "dot-orange"} style={{ width: 6, height: 6 }} />
                          {d.status}
                        </span>
                      </div>
                      <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{d.product}</h3>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 12 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="MapPin" size={11} /> {d.from} → {d.to}</span>
                        <span>{d.weight}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Ожидается</div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: d.statusKey === "done" ? "var(--green)" : "var(--orange)" }}>{d.eta}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                      <span>Прогресс</span><span>{d.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${d.progress}%`, background: d.statusKey === "done" ? "var(--green)" : "var(--blue)" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                    {["Отправлен", "В пути", "Таможня", "Доставлен"].map((step, idx) => {
                      const done = d.progress >= (idx + 1) * 25;
                      return (
                        <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                          <div style={{
                            width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                            background: done ? "var(--blue)" : "var(--bg-page)",
                            color: done ? "white" : "var(--text-muted)",
                            border: done ? "none" : "1.5px solid var(--border-color)"
                          }}>
                            {done ? <Icon name="Check" size={11} /> : idx + 1}
                          </div>
                          <span style={{ fontSize: 10, color: done ? "var(--blue)" : "var(--text-muted)", textAlign: "center" }}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ COURSES ════ */}
        {section === "courses" && (
          <div className="anim-0">
            <div className="mb-5">
              <h1 style={{ fontSize: 24, marginBottom: 2 }}>Курсы и обучение</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>Всё для успешного старта и развития бизнеса с Китаем</p>
            </div>

            {/* Featured */}
            <div style={{ background: "var(--blue)", borderRadius: 16, padding: "28px 32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -30, top: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div className="relative">
                <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4, display: "inline-block", marginBottom: 10 }}>🔥 Самый популярный</span>
                <h2 style={{ color: "white", fontSize: 22, marginBottom: 6, fontFamily: "'Rubik', sans-serif" }}>Полный курс: Бизнес с Китаем</h2>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginBottom: 16 }}>48 уроков · 24 часа · Сертификат · Поддержка куратора</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: "white", fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 28 }}>9 900 ₽</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", textDecoration: "line-through", fontSize: 16 }}>19 900 ₽</span>
                  <button style={{ background: "white", color: "var(--blue)", fontFamily: "'Rubik', sans-serif", fontWeight: 700, padding: "10px 22px", borderRadius: 8, fontSize: 14 }}>
                    Записаться
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((c, i) => (
                <div key={c.id} className={`card-base p-5 anim-${i}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ fontSize: 36 }}>{c.emoji}</span>
                    <span className={c.price === "Бесплатно" ? "badge-green" : "badge-blue"} style={{ fontSize: 13 }}>{c.price}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, lineHeight: 1.4, color: "var(--text-primary)" }}>{c.title}</h3>
                  <span style={{ fontSize: 11, background: "var(--bg-page)", color: "var(--text-muted)", padding: "2px 8px", borderRadius: 4, display: "inline-block", marginBottom: 12 }}>{c.level}</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
                    {[{ icon: "BookOpen", v: `${c.lessons} ур.` }, { icon: "Clock", v: c.duration }, { icon: "Users", v: c.students }].map(it => (
                      <div key={it.icon} style={{ background: "var(--bg-page)", borderRadius: 8, padding: "6px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Icon name={it.icon as "Home"} size={13} style={{ color: "var(--text-muted)" }} />
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{it.v}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-2.5 text-sm rounded-lg font-semibold transition-all ${c.price === "Бесплатно" ? "btn-outline justify-center" : "btn-primary justify-center"}`}>
                    {c.price === "Бесплатно" ? "Начать бесплатно" : "Записаться"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ CHAT ════ */}
        {section === "chat" && (
          <div className="anim-0">
            <h1 style={{ fontSize: 24, marginBottom: 2 }}>Сообщения</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 16 }}>Общение с поставщиками и поддержкой</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="lg:grid-cols-[300px_1fr]">
              {/* Sidebar */}
              <div className="card-base overflow-hidden" style={{ height: "fit-content" }}>
                <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border-color)" }}>
                  <div style={{ position: "relative" }}>
                    <Icon name="Search" size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input className="input-base" style={{ paddingLeft: 32, fontSize: 13 }} placeholder="Поиск..." />
                  </div>
                </div>
                {chatMsgs.map((m, i) => (
                  <div key={m.id} className="table-row" style={{ padding: "12px 14px", borderBottom: "1px solid var(--border-color)", cursor: "pointer", background: i === 0 ? "var(--blue-light)" : "white" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</span>
                          <span style={{ fontSize: 11, color: "var(--text-muted)", flexShrink: 0, marginLeft: 8 }}>{m.time}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{m.text}</span>
                      </div>
                      {m.unread > 0 && (
                        <span style={{ background: "var(--blue)", color: "white", fontSize: 10, fontWeight: 700, borderRadius: 99, minWidth: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.unread}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="card-base overflow-hidden flex flex-col" style={{ minHeight: 460 }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏭</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Ли Вэй — Guangzhou Elite</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--green)" }}>
                      <span className="dot-green" /> Онлайн
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                    <button className="btn-ghost p-2 rounded-lg"><Icon name="Phone" size={16} /></button>
                    <button className="btn-ghost p-2 rounded-lg"><Icon name="Video" size={16} /></button>
                  </div>
                </div>

                <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏭</div>
                    <div className="bubble-in" style={{ padding: "10px 14px", maxWidth: "75%" }}>
                      <p style={{ fontSize: 13, lineHeight: 1.5 }}>Здравствуйте! Рады сотрудничеству с российскими партнёрами.</p>
                      <span style={{ fontSize: 10, color: "var(--text-muted)", display: "block", marginTop: 4 }}>10:30</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="bubble-out" style={{ padding: "10px 14px", maxWidth: "75%" }}>
                      <p style={{ fontSize: 13, lineHeight: 1.5 }}>Добрый день! Интересует партия текстиля от 500 единиц. Можете прислать каталог?</p>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", display: "block", marginTop: 4 }}>10:31</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏭</div>
                    <div className="bubble-in" style={{ padding: "10px 14px", maxWidth: "75%" }}>
                      <p style={{ fontSize: 13, lineHeight: 1.5 }}>Готов обсудить условия! Каталог и прайс отправлю в ближайшее время.</p>
                      <span style={{ fontSize: 10, color: "var(--text-muted)", display: "block", marginTop: 4 }}>10:32</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color)", display: "flex", gap: 8 }}>
                  <button className="btn-ghost p-2 rounded-lg"><Icon name="Paperclip" size={16} /></button>
                  <input className="input-base" placeholder="Написать сообщение..." style={{ flex: 1, padding: "9px 13px", fontSize: 13 }} />
                  <button className="btn-primary px-4 py-2 text-sm"><Icon name="Send" size={15} /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ NEWS ════ */}
        {section === "news" && (
          <div className="anim-0">
            <h1 style={{ fontSize: 24, marginBottom: 2 }}>Новости и аналитика</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 16 }}>Актуальная информация по торговле с Китаем</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="lg:grid-cols-[1fr_280px]">
              <div className="space-y-3">
                {news.map((item, i) => (
                  <div key={item.id} className={`card-base p-5 cursor-pointer anim-${i}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                          <span className="badge-blue">{item.tag}</span>
                          {item.hot && <span className="badge-orange">🔥 Горячее</span>}
                          <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>{item.date}</span>
                        </div>
                        <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.title}</h3>
                      </div>
                      <Icon name="ArrowUpRight" size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="card-base p-5">
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="TrendingUp" size={16} style={{ color: "var(--blue)" }} /> Курс юань / рубль
                  </h3>
                  <div className="stat-num text-4xl mb-1">12.84 ₽</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--green)", marginBottom: 14 }}>
                    <Icon name="TrendingUp" size={13} /> +0.12 (+0.94%)
                  </div>
                  <div className="divider mb-3" />
                  {[{ l: "USD/RUB", v: "89.20" }, { l: "EUR/RUB", v: "96.40" }].map(c => (
                    <div key={c.l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border-color)", fontSize: 13 }}>
                      <span style={{ color: "var(--text-secondary)" }}>{c.l}</span>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.v}</span>
                    </div>
                  ))}
                </div>

                <div className="card-base p-5">
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Полезные инструменты</h3>
                  {[
                    { icon: "FileText", label: "Таможенный калькулятор" },
                    { icon: "Globe", label: "Справочник ТН ВЭД" },
                    { icon: "BarChart2", label: "Аналитика импорта" },
                    { icon: "Calendar", label: "Выставки в Китае" },
                  ].map(link => (
                    <button key={link.label} className="table-row w-full flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm text-left" style={{ color: "var(--text-secondary)" }}>
                      <div className="icon-box" style={{ width: 30, height: 30, borderRadius: 8 }}>
                        <Icon name={link.icon as "Home"} size={14} style={{ color: "var(--blue)" }} />
                      </div>
                      {link.label}
                      <Icon name="ChevronRight" size={13} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ PROFILE ════ */}
        {section === "profile" && (
          <div className="anim-0">
            <h1 style={{ fontSize: 24, marginBottom: 16 }}>Личный кабинет</h1>

            <div style={{ display: "grid", gap: 12 }} className="lg:grid-cols-[280px_1fr]">
              {/* Left col */}
              <div className="space-y-3">
                <div className="card-base p-5 text-center">
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>👤</div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--text-primary)", marginBottom: 2 }}>Александр К.</h3>
                  <span className="badge-blue">Премиум</span>
                  <div style={{ marginTop: 8, color: "#F79009", fontSize: 14 }}>★★★★★</div>
                  <div className="divider my-4" />
                  {[{ icon: "Mail", v: "alex@example.com" }, { icon: "Phone", v: "+7 (999) 123-45-67" }, { icon: "MapPin", v: "Москва" }].map(it => (
                    <div key={it.icon} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", fontSize: 13, color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                      <Icon name={it.icon as "Home"} size={14} style={{ color: "var(--blue)" }} />
                      {it.v}
                    </div>
                  ))}
                  <button className="btn-outline w-full py-2 text-sm mt-4 justify-center">Редактировать профиль</button>
                </div>

                <div style={{ background: "var(--blue)", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Баланс кошелька</div>
                  <div style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 28, color: "white", marginBottom: 12 }}>₽ 48 200</div>
                  <button style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, width: "100%" }}>
                    Пополнить счёт
                  </button>
                </div>
              </div>

              {/* Right col */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { l: "Заказов", v: "24", i: "ShoppingBag" },
                    { l: "Поставщиков", v: "8", i: "Building2" },
                    { l: "Курсов", v: "3", i: "BookOpen" },
                    { l: "Сохранено", v: "15", i: "Heart" },
                  ].map(s => (
                    <div key={s.l} className="card-base p-4">
                      <div className="icon-box mb-2" style={{ width: 34, height: 34, borderRadius: 8 }}>
                        <Icon name={s.i as "Home"} size={16} style={{ color: "var(--blue)" }} />
                      </div>
                      <div className="stat-num text-2xl">{s.v}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="card-base overflow-hidden">
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-color)" }}>
                    <h3 style={{ fontWeight: 700, fontSize: 15 }}>История заказов</h3>
                  </div>
                  {[
                    { name: "Текстиль — 500 ед.", date: "15 мая", amount: "84 000 ₽", status: "Доставлен", ok: true },
                    { name: "Электроника — 120 ед.", date: "28 апр", amount: "216 000 ₽", status: "В пути", ok: false },
                    { name: "Аксессуары — 1000 ед.", date: "10 апр", amount: "24 000 ₽", status: "Доставлен", ok: true },
                    { name: "Спорттовары — 200 ед.", date: "2 апр", amount: "78 000 ₽", status: "Доставлен", ok: true },
                  ].map((o, i) => (
                    <div key={i} className="table-row" style={{ padding: "12px 18px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>{o.name}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{o.date}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{o.amount}</div>
                        <span className={o.ok ? "badge-green" : "badge-orange"} style={{ marginTop: 2 }}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-base p-5">
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Способы оплаты</h3>
                  {[
                    { name: "Visa •••• 4521", icon: "CreditCard", primary: true },
                    { name: "СБП / Тинькофф", icon: "Smartphone", primary: false },
                    { name: "USDT / Крипто", icon: "Coins", primary: false },
                  ].map(pm => (
                    <div key={pm.name} className="table-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8 }}>
                      <div className="icon-box" style={{ width: 34, height: 34, borderRadius: 8 }}>
                        <Icon name={pm.icon as "Home"} size={16} style={{ color: "var(--blue)" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "var(--text-primary)", flex: 1 }}>{pm.name}</span>
                      {pm.primary && <span className="badge-blue">Основной</span>}
                      <Icon name="ChevronRight" size={15} style={{ color: "var(--text-muted)" }} />
                    </div>
                  ))}
                  <button style={{ width: "100%", marginTop: 8, padding: "9px 0", border: "1.5px dashed var(--border-color)", borderRadius: 8, color: "var(--text-muted)", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", transition: "border-color 0.15s" }}>
                    <Icon name="Plus" size={14} /> Добавить способ оплаты
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom mobile nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid var(--border-color)", zIndex: 50, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "8px 4px 10px" }} className="lg:hidden">
        {navItems.map(item => (
          <button key={item.key} onClick={() => go(item.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: section === item.key ? "var(--blue)" : "var(--text-muted)", position: "relative", transition: "color 0.15s" }}>
            {item.key === "chat" && (
              <span style={{ position: "absolute", top: 0, right: "50%", marginRight: -16, width: 14, height: 14, background: "var(--red-c)", borderRadius: 99, color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            )}
            <Icon name={item.icon as "Home"} size={20} />
            <span style={{ fontSize: 9, fontWeight: section === item.key ? 600 : 400, lineHeight: 1 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="h-20 lg:h-0" />

      {/* Footer */}
      <footer style={{ background: "white", borderTop: "1px solid var(--border-color)", marginTop: 32 }} className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontFamily: "'Rubik', sans-serif", fontWeight: 800, fontSize: 14 }}>中</span>
                </div>
                <span style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, fontSize: 16 }}>ChinaBridge</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>Платформа для импорта из Китая. Поставщики, доставка, обучение.</p>
            </div>
            {[
              { title: "Сервисы", links: ["Поставщики", "Доставка", "Обучение", "Аналитика"] },
              { title: "Компания", links: ["О нас", "Блог", "Карьера", "Контакты"] },
              { title: "Поддержка", links: ["Помощь", "Документы", "Правила", "Безопасность"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text-primary)" }}>{col.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, fontSize: 12, color: "var(--text-muted)" }}>
            <span>© 2024 ChinaBridge. Все права защищены.</span>
            <span>+7 800 555-35-35</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
