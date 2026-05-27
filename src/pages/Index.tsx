import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9559d5cc-ec8c-4343-b3ff-97ed72df958c/files/f5690151-17e1-4c10-b28b-1381e69e61a6.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/9559d5cc-ec8c-4343-b3ff-97ed72df958c/files/7e7abed1-1039-4a1a-8aa0-b9ad7a5c9ed1.jpg";

type Section = "home" | "suppliers" | "delivery" | "courses" | "chat" | "profile" | "news";

const suppliers = [
  { id: 1, name: "Guangzhou Elite Textile Co.", category: "Текстиль", rating: 4.9, orders: "2.4K", verified: true, price: "от $0.8/шт", country: "Гуанчжоу", tag: "ТОП" },
  { id: 2, name: "Shenzhen TechParts Ltd.", category: "Электроника", rating: 4.8, orders: "5.1K", verified: true, price: "от $12/шт", country: "Шэньчжэнь", tag: "Надёжный" },
  { id: 3, name: "Yiwu Accessories World", category: "Аксессуары", rating: 4.7, orders: "8.9K", verified: true, price: "от $0.3/шт", country: "Иу", tag: "Оптом" },
  { id: 4, name: "Hangzhou Fashion Group", category: "Одежда", rating: 4.6, orders: "1.2K", verified: false, price: "от $2.5/шт", country: "Ханчжоу", tag: "Новый" },
  { id: 5, name: "Foshan Furniture Factory", category: "Мебель", rating: 4.8, orders: "630", verified: true, price: "от $45/шт", country: "Фошань", tag: "Эксклюзив" },
  { id: 6, name: "Ningbo Sporting Goods", category: "Спорттовары", rating: 4.5, orders: "3.3K", verified: true, price: "от $5/шт", country: "Нинбо", tag: "Хит" },
];

const deliveries = [
  { id: "CB-2024-0891", product: "Электроника (120 ед.)", status: "В пути", statusKey: "transit", progress: 65, from: "Шэньчжэнь", to: "Москва", eta: "3 июня", weight: "48 кг" },
  { id: "CB-2024-0756", product: "Текстиль (500 ед.)", status: "Таможня", statusKey: "pending", progress: 45, from: "Гуанчжоу", to: "СПб", eta: "8 июня", weight: "120 кг" },
  { id: "CB-2024-0634", product: "Аксессуары (1000 ед.)", status: "Доставлен", statusKey: "active", progress: 100, from: "Иу", to: "Казань", eta: "Завершено", weight: "35 кг" },
];

const courses = [
  { id: 1, title: "Старт с нуля: первая закупка в Китае", level: "Начинающий", lessons: 12, students: "4.2K", price: "Бесплатно", duration: "6 ч", emoji: "🚀", color: "from-orange-500 to-red-500" },
  { id: 2, title: "Переговоры с поставщиками на практике", level: "Средний", lessons: 18, students: "2.1K", price: "2 900 ₽", duration: "9 ч", emoji: "🤝", color: "from-yellow-500 to-orange-500" },
  { id: 3, title: "Логистика и таможня без ошибок", level: "Средний", lessons: 15, students: "1.8K", price: "3 500 ₽", duration: "8 ч", emoji: "📦", color: "from-red-500 to-pink-500" },
  { id: 4, title: "Маркировка и сертификация товаров", level: "Продвинутый", lessons: 10, students: "980", price: "1 900 ₽", duration: "5 ч", emoji: "📋", color: "from-amber-500 to-yellow-500" },
];

const news = [
  { id: 1, title: "Новые правила ввоза товаров из Китая в 2024 году", date: "24 мая", tag: "Таможня", hot: true },
  { id: 2, title: "Canton Fair 2024: что везут российские предприниматели", date: "22 мая", tag: "Выставки", hot: true },
  { id: 3, title: "Курс юань/рубль: прогноз на лето 2024", date: "20 мая", tag: "Финансы", hot: false },
  { id: 4, title: "Топ-10 трендовых категорий для импорта этим летом", date: "18 мая", tag: "Аналитика", hot: false },
  { id: 5, title: "Открытие новых маршрутов: Чжэнчжоу — Москва", date: "15 мая", tag: "Логистика", hot: false },
];

const chatMessages = [
  { id: 1, name: "Ли Вэй — Guangzhou Elite", avatar: "🏭", text: "Здравствуйте! Готов обсудить условия партии от 500 единиц", time: "10:32", unread: 2 },
  { id: 2, name: "Поддержка ChinaBridge", avatar: "🛟", text: "Ваш запрос #4821 принят в работу", time: "09:15", unread: 0 },
  { id: 3, name: "Чэнь Цзяо — TechParts", avatar: "⚡", text: "Отправил каталог с актуальными ценами", time: "Вчера", unread: 1 },
];

const stats = [
  { label: "Поставщиков", value: "12,400+", icon: "Building2" },
  { label: "Доставок в месяц", value: "8,900", icon: "Package" },
  { label: "Студентов курсов", value: "45K+", icon: "GraduationCap" },
  { label: "Клиентов", value: "23K+", icon: "Users" },
];

const categoryFilters = ["Все", "Текстиль", "Электроника", "Одежда", "Аксессуары", "Мебель", "Спорттовары"];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "suppliers", label: "Поставщики", icon: "Building2" },
    { key: "delivery", label: "Доставка", icon: "Package" },
    { key: "courses", label: "Обучение", icon: "GraduationCap" },
    { key: "chat", label: "Чат", icon: "MessageCircle" },
    { key: "news", label: "Новости", icon: "Newspaper" },
    { key: "profile", label: "Кабинет", icon: "User" },
  ];

  const filteredSuppliers = suppliers.filter(s => {
    const matchCat = activeCategory === "Все" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: '#080808', fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shimmer-btn text-white font-bold text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
              中
            </div>
            <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              China<span className="gradient-text">Bridge</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                style={activeSection === item.key
                  ? { color: '#FF6B2B', backgroundColor: 'rgba(255,107,43,0.1)' }
                  : { color: '#666' }
                }
              >
                <Icon name={item.icon as any} size={16} />
                {item.label}
                {item.key === "chat" && (
                  <span className="ml-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center" style={{ backgroundColor: '#FF3D2E' }}>3</span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shimmer-btn transition-all hover:scale-105">
              <Icon name="LogIn" size={16} />
              Войти
            </button>
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{ color: '#888' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t px-4 py-3 grid grid-cols-4 gap-2" style={{ borderColor: '#1a1a1a', backgroundColor: '#0d0d0d' }}>
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl text-xs transition-all"
                style={activeSection === item.key
                  ? { color: '#FF6B2B', backgroundColor: 'rgba(255,107,43,0.1)' }
                  : { color: '#555' }
                }
              >
                <Icon name={item.icon as any} size={20} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden mb-10" style={{ minHeight: 480 }}>
              <img src={HERO_IMG} alt="ChinaBridge" className="w-full h-full object-cover absolute inset-0" style={{ minHeight: 480 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,8,0.93) 0%, rgba(8,8,8,0.7) 55%, rgba(8,8,8,0.3) 100%)' }} />
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, #FF3D2E, #FFB800, #FF3D2E)', filter: 'blur(60px)' }} />
              <div className="relative z-10 p-8 md:p-14 flex flex-col justify-center" style={{ minHeight: 480 }}>
                <div className="mb-4 animate-fade-in">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border" style={{ backgroundColor: 'rgba(255,107,43,0.1)', borderColor: 'rgba(255,107,43,0.3)', color: '#FF6B2B' }}>
                    <span className="status-dot status-active" />
                    Работаем 24/7 — поддержка на русском
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none animate-fade-in-delay-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  КИТАЙ —<br /><span className="gradient-text">ПРОСТО</span>
                </h1>
                <p className="text-gray-300 text-lg max-w-lg mb-8 animate-fade-in-delay-2">
                  Поставщики, доставка, обучение и поддержка — всё для вашего бизнеса с Китаем в одном месте
                </p>
                <div className="flex flex-wrap gap-3 animate-fade-in-delay-3">
                  <button onClick={() => setActiveSection("suppliers")} className="shimmer-btn px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 glow-orange" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    НАЙТИ ПОСТАВЩИКА
                  </button>
                  <button onClick={() => setActiveSection("courses")} className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 border text-white" style={{ fontFamily: "'Oswald', sans-serif", backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)' }}>
                    НАЧАТЬ ОБУЧЕНИЕ
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`rounded-2xl p-5 border card-hover animate-fade-in-delay-${i + 1}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(255,107,43,0.15)' }}>
                    <Icon name={stat.icon as any} size={20} style={{ color: '#FF6B2B' }} />
                  </div>
                  <div className="text-2xl font-black gradient-text" style={{ fontFamily: "'Oswald', sans-serif" }}>{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-white mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>ВСЕ <span className="gradient-text">СЕРВИСЫ</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { key: "suppliers" as Section, icon: "Building2", title: "Каталог поставщиков", desc: "12 400+ проверенных фабрик и поставщиков из Китая с рейтингами и отзывами", color: "#FF3D2E" },
                { key: "delivery" as Section, icon: "Package", title: "Отслеживание доставки", desc: "Контроль каждого этапа: от склада в Китае до вашего склада в России", color: "#FF6B2B" },
                { key: "courses" as Section, icon: "GraduationCap", title: "Курсы и обучение", desc: "От первой закупки до выстраивания системного импортного бизнеса", color: "#FFB800" },
                { key: "chat" as Section, icon: "MessageCircle", title: "Прямой чат", desc: "Общение с поставщиками и персональной поддержкой на русском языке", color: "#FF3D2E" },
                { key: "profile" as Section, icon: "User", title: "Личный кабинет", desc: "История заказов, аналитика расходов, сохранённые поставщики", color: "#FF6B2B" },
                { key: "news" as Section, icon: "Newspaper", title: "Новости и аналитика", desc: "Актуальные изменения в таможне, курсы валют и тренды рынка", color: "#FFB800" },
              ].map((service, i) => (
                <button key={service.key} onClick={() => setActiveSection(service.key)} className={`text-left rounded-2xl p-6 border card-hover animate-fade-in-delay-${Math.min(i + 1, 4)}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${service.color}20` }}>
                    <Icon name={service.icon as any} size={24} style={{ color: service.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: service.color }}>
                    Перейти <Icon name="ArrowRight" size={14} />
                  </div>
                </button>
              ))}
            </div>

            <div className="relative rounded-3xl overflow-hidden p-8 md:p-12" style={{ backgroundColor: '#111' }}>
              <img src={FACTORY_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-sm font-medium mb-2" style={{ color: '#FFB800' }}>🔥 Специальное предложение</div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>ПЕРВАЯ ЗАКУПКА —<br />БЕЗ КОМИССИИ</h3>
                  <p className="text-gray-400">Сопроводим сделку с поставщиком бесплатно для новых клиентов</p>
                </div>
                <button className="shimmer-btn px-8 py-4 rounded-2xl text-white font-bold whitespace-nowrap transition-all hover:scale-105 glow-orange" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  ПОЛУЧИТЬ УСЛУГУ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUPPLIERS */}
        {activeSection === "suppliers" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>КАТАЛОГ <span className="gradient-text">ПОСТАВЩИКОВ</span></h2>
              <p className="text-gray-500">12 400+ проверенных производителей и поставщиков</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#555' }} />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none transition-all"
                  style={{ backgroundColor: '#111', border: '1px solid #1e1e1e', fontFamily: "'Golos Text', sans-serif", color: 'white' }}
                  placeholder="Поиск по имени или категории..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all" style={{ backgroundColor: '#111', borderColor: '#1e1e1e', color: '#888' }}>
                <Icon name="SlidersHorizontal" size={18} />
                Фильтры
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              {categoryFilters.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={activeCategory === cat
                    ? { background: 'linear-gradient(135deg, #FF3D2E, #FF6B2B)', color: 'white' }
                    : { backgroundColor: '#111', border: '1px solid #1e1e1e', color: '#666' }
                  }>
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSuppliers.map((s, i) => (
                <div key={s.id} className={`rounded-2xl border card-hover overflow-hidden animate-fade-in-delay-${Math.min(i + 1, 4)}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#1a1a1a' }}>🏭</div>
                      <div className="flex items-center gap-2">
                        {s.verified && (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                            <Icon name="BadgeCheck" size={12} /> Проверен
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-lg font-medium" style={{ backgroundColor: 'rgba(255,107,43,0.15)', color: '#FF6B2B' }}>{s.tag}</span>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-1 leading-tight">{s.name}</h3>
                    <div className="flex items-center gap-2 text-sm mb-4" style={{ color: '#555' }}>
                      <Icon name="MapPin" size={12} />
                      {s.country}
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#333' }} />
                      {s.category}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-xl p-3" style={{ backgroundColor: '#0d0d0d' }}>
                        <div className="text-xs mb-1" style={{ color: '#555' }}>Рейтинг</div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-white font-bold">{s.rating}</span>
                        </div>
                      </div>
                      <div className="rounded-xl p-3" style={{ backgroundColor: '#0d0d0d' }}>
                        <div className="text-xs mb-1" style={{ color: '#555' }}>Заказов</div>
                        <div className="text-white font-bold">{s.orders}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold gradient-text-gold">{s.price}</span>
                    </div>
                    <button className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #FF3D2E, #FF6B2B)' }}>
                      Связаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DELIVERY */}
        {activeSection === "delivery" && (
          <div className="animate-fade-in">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>МОИ <span className="gradient-text">ДОСТАВКИ</span></h2>
                <p className="text-gray-500">Отслеживание и управление отправлениями</p>
              </div>
              <button className="shimmer-btn px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2 transition-all hover:scale-105 self-start" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Icon name="Plus" size={18} /> НОВАЯ ДОСТАВКА
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "В пути", count: 1, status: "transit" },
                { label: "На таможне", count: 1, status: "pending" },
                { label: "Доставлено", count: 1, status: "active" },
              ].map(item => (
                <div key={item.label} className="rounded-2xl p-4 border text-center" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={`status-dot status-${item.status}`} />
                    <span className="text-sm" style={{ color: '#666' }}>{item.label}</span>
                  </div>
                  <div className="text-3xl font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.count}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {deliveries.map((d, i) => (
                <div key={d.id} className={`rounded-2xl border overflow-hidden card-hover animate-fade-in-delay-${i + 1}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono px-3 py-1 rounded-lg" style={{ backgroundColor: '#1a1a1a', color: '#FF6B2B' }}>{d.id}</span>
                          <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg font-medium`}
                            style={{
                              color: d.statusKey === 'active' ? '#22c55e' : d.statusKey === 'transit' ? '#FFB800' : '#FF6B2B',
                              backgroundColor: d.statusKey === 'active' ? 'rgba(34,197,94,0.1)' : d.statusKey === 'transit' ? 'rgba(255,184,0,0.1)' : 'rgba(255,107,43,0.1)'
                            }}>
                            <span className={`status-dot status-${d.statusKey}`} />
                            {d.status}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{d.product}</h3>
                        <div className="flex items-center gap-4 text-sm mt-1" style={{ color: '#555' }}>
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={12} /> {d.from} → {d.to}</span>
                          <span className="flex items-center gap-1"><Icon name="Weight" size={12} /> {d.weight}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs mb-1" style={{ color: '#555' }}>Ожидаемая дата</div>
                        <div className="font-bold" style={{ color: d.statusKey === 'active' ? '#22c55e' : '#FFB800' }}>{d.eta}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-2" style={{ color: '#555' }}>
                        <span>Прогресс доставки</span>
                        <span>{d.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ backgroundColor: '#1a1a1a' }}>
                        <div className="h-2 rounded-full progress-bar transition-all duration-500" style={{ width: `${d.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {["Отправлен", "В пути", "Таможня", "Доставлен"].map((step, idx) => {
                        const stepProgress = (idx + 1) * 25;
                        const done = d.progress >= stepProgress;
                        return (
                          <div key={step} className="flex flex-col items-center gap-1">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                              style={done
                                ? { background: 'linear-gradient(135deg, #FF3D2E, #FF6B2B)', borderColor: 'transparent', color: 'white' }
                                : { borderColor: '#333', color: '#444' }
                              }>
                              {done ? <Icon name="Check" size={12} /> : idx + 1}
                            </div>
                            <span className="text-[10px] text-center" style={{ color: done ? '#FF6B2B' : '#444' }}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSES */}
        {activeSection === "courses" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>КУРСЫ <span className="gradient-text">И ОБУЧЕНИЕ</span></h2>
              <p className="text-gray-500">Всё для успешного старта и развития бизнеса с Китаем</p>
            </div>
            <div className="rounded-3xl p-8 mb-8 relative overflow-hidden border" style={{ background: 'linear-gradient(135deg, #1a0a00, #0d0d0d)', borderColor: 'rgba(255,107,43,0.3)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, #FFB800, transparent)', filter: 'blur(40px)' }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl animate-float">🎓</div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(255,184,0,0.15)', color: '#FFB800' }}>🔥 Самый популярный</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>ПОЛНЫЙ КУРС: БИЗНЕС С КИТАЕМ</h3>
                  <p className="mb-4" style={{ color: '#666' }}>48 уроков · 24 часа · Сертификат · Поддержка куратора</p>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black gradient-text" style={{ fontFamily: "'Oswald', sans-serif" }}>9 900 ₽</span>
                    <span className="line-through" style={{ color: '#444' }}>19 900 ₽</span>
                    <button className="shimmer-btn px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105" style={{ fontFamily: "'Oswald', sans-serif" }}>ЗАПИСАТЬСЯ</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, i) => (
                <div key={course.id} className={`rounded-2xl border card-hover overflow-hidden animate-fade-in-delay-${Math.min(i + 1, 4)}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className={`h-1.5 w-full bg-gradient-to-r ${course.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.emoji}</span>
                      <span className="text-xs px-3 py-1 rounded-lg font-medium"
                        style={{ backgroundColor: course.price === 'Бесплатно' ? 'rgba(34,197,94,0.1)' : 'rgba(255,107,43,0.1)', color: course.price === 'Бесплатно' ? '#22c55e' : '#FF6B2B' }}>
                        {course.price}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 leading-snug">{course.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md mb-4 inline-block" style={{ backgroundColor: '#1a1a1a', color: '#888' }}>{course.level}</span>
                    <div className="grid grid-cols-3 gap-2 my-4">
                      {[{ icon: "BookOpen", val: `${course.lessons} уроков` }, { icon: "Clock", val: course.duration }, { icon: "Users", val: course.students }].map(item => (
                        <div key={item.icon} className="flex flex-col items-center rounded-xl py-2" style={{ backgroundColor: '#0d0d0d' }}>
                          <Icon name={item.icon as any} size={14} style={{ color: '#555' }} className="mb-1" />
                          <span className="text-xs" style={{ color: '#777' }}>{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <button className={`w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] bg-gradient-to-r ${course.color}`}>
                      {course.price === "Бесплатно" ? "Начать бесплатно" : "Записаться на курс"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeSection === "chat" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}><span className="gradient-text">СООБЩЕНИЯ</span></h2>
              <p className="text-gray-500">Прямое общение с поставщиками и поддержкой</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1 rounded-2xl border overflow-hidden" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                <div className="p-4 border-b" style={{ borderColor: '#1a1a1a' }}>
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#555' }} />
                    <input className="w-full pl-9 pr-3 py-2 rounded-xl text-white placeholder-gray-600 text-sm outline-none" style={{ backgroundColor: '#0d0d0d', fontFamily: "'Golos Text', sans-serif" }} placeholder="Поиск..." />
                  </div>
                </div>
                <div>
                  {chatMessages.map((msg, i) => (
                    <div key={msg.id} className="p-4 border-b cursor-pointer transition-all hover:bg-white/5" style={{ borderColor: '#1a1a1a', backgroundColor: i === 0 ? 'rgba(255,107,43,0.06)' : '' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: '#1a1a1a' }}>{msg.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-white text-sm font-medium truncate">{msg.name}</span>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#555' }}>{msg.time}</span>
                          </div>
                          <p className="text-xs truncate" style={{ color: '#555' }}>{msg.text}</p>
                        </div>
                        {msg.unread > 0 && (
                          <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF3D2E' }}>{msg.unread}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 rounded-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: '#111', borderColor: '#1e1e1e', minHeight: 480 }}>
                <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#1a1a1a' }}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a' }}>🏭</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ли Вэй — Guangzhou Elite</div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#22c55e' }}>
                      <span className="status-dot status-active" /> Онлайн
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button className="p-2 rounded-xl transition-all hover:text-white" style={{ backgroundColor: '#1a1a1a', color: '#666' }}><Icon name="Phone" size={16} /></button>
                    <button className="p-2 rounded-xl transition-all hover:text-white" style={{ backgroundColor: '#1a1a1a', color: '#666' }}><Icon name="Video" size={16} /></button>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: '#1a1a1a' }}>🏭</div>
                    <div className="rounded-2xl rounded-tl-sm p-3 max-w-xs" style={{ backgroundColor: '#1a1a1a' }}>
                      <p className="text-white text-sm">Здравствуйте! Рады сотрудничеству с российскими партнёрами.</p>
                      <p className="text-xs mt-1" style={{ color: '#555' }}>10:30</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm p-3 max-w-xs" style={{ background: 'linear-gradient(135deg, #FF3D2E, #FF6B2B)' }}>
                      <p className="text-white text-sm">Добрый день! Интересует партия текстиля от 500 единиц. Можете прислать каталог?</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>10:31</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: '#1a1a1a' }}>🏭</div>
                    <div className="rounded-2xl rounded-tl-sm p-3 max-w-xs" style={{ backgroundColor: '#1a1a1a' }}>
                      <p className="text-white text-sm">Готов обсудить условия! Каталог и прайс отправляю в ближайшее время.</p>
                      <p className="text-xs mt-1" style={{ color: '#555' }}>10:32</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t" style={{ borderColor: '#1a1a1a' }}>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl transition-all" style={{ backgroundColor: '#1a1a1a', color: '#666' }}><Icon name="Paperclip" size={18} /></button>
                    <input className="flex-1 px-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none text-sm" style={{ backgroundColor: '#1a1a1a', fontFamily: "'Golos Text', sans-serif" }} placeholder="Написать сообщение..." />
                    <button className="shimmer-btn px-5 py-3 rounded-xl text-white transition-all hover:scale-105"><Icon name="Send" size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEWS */}
        {activeSection === "news" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>НОВОСТИ <span className="gradient-text">И АНАЛИТИКА</span></h2>
              <p className="text-gray-500">Актуальная информация по торговле с Китаем</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                {news.map((item, i) => (
                  <div key={item.id} className={`rounded-2xl border p-6 card-hover cursor-pointer animate-fade-in-delay-${Math.min(i + 1, 4)}`} style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,107,43,0.1)', color: '#FF6B2B' }}>{item.tag}</span>
                          {item.hot && <span className="text-xs px-2 py-1 rounded-lg font-medium" style={{ backgroundColor: 'rgba(255,61,46,0.1)', color: '#FF3D2E' }}>🔥 Горячее</span>}
                          <span className="text-xs ml-auto" style={{ color: '#555' }}>{item.date}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg leading-snug">{item.title}</h3>
                      </div>
                      <Icon name="ArrowUpRight" size={20} style={{ color: '#444' }} className="flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border p-5" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    <Icon name="TrendingUp" size={18} style={{ color: '#FFB800' }} /> КУРС ЮАН / РУБЛЬ
                  </h3>
                  <div className="text-4xl font-black gradient-text-gold mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>12.84 ₽</div>
                  <div className="flex items-center gap-1 text-sm mb-4" style={{ color: '#22c55e' }}>
                    <Icon name="TrendingUp" size={14} /> +0.12 (+0.94%)
                  </div>
                  {[{ label: "USD/RUB", val: "89.20" }, { label: "EUR/RUB", val: "96.40" }].map(c => (
                    <div key={c.label} className="flex justify-between text-sm py-2 border-b" style={{ borderColor: '#1a1a1a' }}>
                      <span style={{ color: '#666' }}>{c.label}</span>
                      <span className="text-white font-semibold">{c.val}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border p-5" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <h3 className="text-white font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>ПОЛЕЗНОЕ</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "FileText", label: "Таможенный калькулятор" },
                      { icon: "Globe", label: "Справочник ТН ВЭД" },
                      { icon: "BarChart2", label: "Аналитика импорта" },
                      { icon: "Calendar", label: "Выставки в Китае" },
                    ].map(link => (
                      <button key={link.label} className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:text-white" style={{ backgroundColor: '#0d0d0d', color: '#777' }}>
                        <Icon name={link.icon as any} size={16} style={{ color: '#FF6B2B' }} />
                        <span className="text-sm">{link.label}</span>
                        <Icon name="ChevronRight" size={14} className="ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeSection === "profile" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>ЛИЧНЫЙ <span className="gradient-text">КАБИНЕТ</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="rounded-2xl border p-6 mb-4" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 shimmer-btn glow-orange">👤</div>
                    <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>Александр К.</h3>
                    <p style={{ color: '#666' }} className="text-sm">Премиум-клиент</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[{ icon: "Mail", val: "alex@example.com" }, { icon: "Phone", val: "+7 (999) 123-45-67" }, { icon: "MapPin", val: "Москва, Россия" }].map(item => (
                      <div key={item.icon} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#0d0d0d' }}>
                        <Icon name={item.icon as any} size={16} style={{ color: '#FF6B2B' }} />
                        <span className="text-sm" style={{ color: '#888' }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 rounded-xl border text-sm font-medium transition-all hover:text-white" style={{ borderColor: '#1e1e1e', color: '#666' }}>
                    Редактировать профиль
                  </button>
                </div>
                <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0800, #0d0d0d)', border: '1px solid rgba(255,107,43,0.3)' }}>
                  <div className="text-sm mb-1" style={{ color: '#666' }}>Баланс кошелька</div>
                  <div className="text-3xl font-black gradient-text mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>₽ 48,200</div>
                  <button className="shimmer-btn w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02]">Пополнить счёт</button>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Заказов", val: "24", icon: "ShoppingBag", color: "#FF6B2B" },
                    { label: "Поставщиков", val: "8", icon: "Building2", color: "#FFB800" },
                    { label: "Курсов", val: "3", icon: "BookOpen", color: "#FF3D2E" },
                    { label: "Сохранено", val: "15", icon: "Heart", color: "#FF6B2B" },
                  ].map(item => (
                    <div key={item.label} className="rounded-2xl p-4 border" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                      <Icon name={item.icon as any} size={20} style={{ color: item.color }} className="mb-2" />
                      <div className="text-2xl font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.val}</div>
                      <div className="text-xs" style={{ color: '#555' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <div className="p-5 border-b" style={{ borderColor: '#1a1a1a' }}>
                    <h3 className="text-white font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>ИСТОРИЯ ЗАКАЗОВ</h3>
                  </div>
                  <div>
                    {[
                      { name: "Текстиль — 500 ед.", date: "15 мая", amount: "₽ 84,000", status: "Доставлен", statusColor: "#22c55e" },
                      { name: "Электроника — 120 ед.", date: "28 апр", amount: "₽ 216,000", status: "В пути", statusColor: "#FFB800" },
                      { name: "Аксессуары — 1000 ед.", date: "10 апр", amount: "₽ 24,000", status: "Доставлен", statusColor: "#22c55e" },
                      { name: "Спорттовары — 200 ед.", date: "2 апр", amount: "₽ 78,000", status: "Доставлен", statusColor: "#22c55e" },
                    ].map((order, i) => (
                      <div key={i} className="px-5 py-4 flex items-center justify-between border-b transition-all hover:bg-white/[0.02]" style={{ borderColor: '#1a1a1a' }}>
                        <div>
                          <div className="text-white text-sm font-medium">{order.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#555' }}>{order.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold text-sm">{order.amount}</div>
                          <div className="text-xs mt-0.5" style={{ color: order.statusColor }}>{order.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border p-5" style={{ backgroundColor: '#111', borderColor: '#1e1e1e' }}>
                  <h3 className="text-white font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>СПОСОБЫ ОПЛАТЫ</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Visa •••• 4521", icon: "CreditCard", primary: true },
                      { name: "СБП / Тинькофф", icon: "Smartphone", primary: false },
                      { name: "USDT / Крипто", icon: "Coins", primary: false },
                    ].map(pm => (
                      <div key={pm.name} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#0d0d0d' }}>
                        <div className="flex items-center gap-3">
                          <Icon name={pm.icon as any} size={18} style={{ color: '#FF6B2B' }} />
                          <span className="text-sm" style={{ color: '#ccc' }}>{pm.name}</span>
                          {pm.primary && <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: 'rgba(255,184,0,0.1)', color: '#FFB800' }}>Основной</span>}
                        </div>
                        <Icon name="ChevronRight" size={16} style={{ color: '#444' }} />
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-2.5 rounded-xl border text-sm flex items-center justify-center gap-2 transition-all hover:text-white" style={{ borderColor: '#1e1e1e', borderStyle: 'dashed', color: '#555' }}>
                    <Icon name="Plus" size={16} /> Добавить способ оплаты
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* BOTTOM NAV mobile */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden border-t z-50" style={{ backgroundColor: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)', borderColor: '#1a1a1a' }}>
        <div className="grid grid-cols-7 px-2 py-2">
          {navItems.map(item => (
            <button key={item.key} onClick={() => setActiveSection(item.key)} className="flex flex-col items-center gap-1 py-1 relative transition-all" style={{ color: activeSection === item.key ? '#FF6B2B' : '#444' }}>
              {item.key === "chat" && (
                <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full text-white text-[8px] font-bold flex items-center justify-center" style={{ backgroundColor: '#FF3D2E' }}>3</span>
              )}
              <Icon name={item.icon as any} size={20} />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="h-20 lg:h-8" />
    </div>
  );
}
