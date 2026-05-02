'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle, Clock, Euro, Home, MapPin, Monitor, ShieldCheck, Star, Truck, User, Users, WashingMachine, Wifi, Wrench } from 'lucide-react';

const servicesSeed = [
  { id: 'tv', name: 'Instalação de TV', category: 'TV & Imagem', price: 39, duration: '60 min', icon: 'Monitor' },
  { id: 'wifi', name: 'Configuração Wi‑Fi', category: 'Internet', price: 29, duration: '45 min', icon: 'Wifi' },
  { id: 'maquina', name: 'Instalação Máquina de Lavar', category: 'Eletrodomésticos', price: 49, duration: '75 min', icon: 'WashingMachine' },
  { id: 'smart', name: 'Smart Home', category: 'Casa Inteligente', price: 59, duration: '90 min', icon: 'Home' }
];

const techSeed = [
  { id: 't1', name: 'Rui Santos', area: 'Lisboa', rating: 4.9 },
  { id: 't2', name: 'João Martins', area: 'Almada', rating: 4.8 },
  { id: 't3', name: 'Miguel Costa', area: 'Oeiras', rating: 4.7 }
];

const status = {
  pending: 'Pendente',
  assigned: 'Atribuído',
  on_way: 'A caminho',
  arrived: 'Técnico chegou',
  completed: 'Concluído'
};

const iconMap = { Monitor, Wifi, WashingMachine, Home };

function defaultStore() {
  return {
    services: servicesSeed,
    technicians: techSeed,
    bookings: [
      {
        id: 'DTS-1001',
        clientName: 'Cliente Demo',
        serviceId: 'tv',
        address: 'Av. da República, Lisboa',
        date: '2026-05-04',
        slot: '14:00 - 16:00',
        technicianId: 't1',
        status: 'on_way',
        rating: null
      }
    ]
  };
}

function Header({ user, setUser }) {
  return (
    <header className="sticky top-0 z-50 bg-darty-red text-white shadow-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white px-4 py-2 text-2xl font-black tracking-tight text-darty-red">Darty</div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">Serviços</p>
            <p className="text-xs opacity-90">Assistência ao domicílio</p>
          </div>
        </div>
        <button onClick={() => setUser(null)} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-bold">Sair</button>
      </div>
    </header>
  );
}

function Login({ setUser }) {
  const [name, setName] = useState('Cliente Demo');
  const profiles = [
    { role: 'client', title: 'Cliente', desc: 'Agendar e acompanhar serviços', icon: User },
    { role: 'tech', title: 'Técnico', desc: 'Receber e concluir serviços', icon: Wrench },
    { role: 'admin', title: 'Admin', desc: 'Gerir pedidos e equipa', icon: ShieldCheck }
  ];
  return (
    <main className="min-h-screen bg-gradient-to-br from-darty-red via-red-700 to-darty-dark px-5 py-8 text-white">
      <section className="mx-auto max-w-5xl pt-8">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex rounded-2xl bg-white px-6 py-3 text-4xl font-black text-darty-red shadow-2xl">Darty</div>
          <h1 className="text-4xl font-black sm:text-6xl">Serviços ao domicílio</h1>
          <p className="mt-3 text-white/80">PWA instalável para Android, pronta para publicar em HTTPS.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 text-darty-dark shadow-2xl sm:p-8">
          <label className="text-sm font-black">Nome para teste</label>
          <input className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-4 text-lg outline-none focus:border-darty-red" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {profiles.map((p) => {
              const Icon = p.icon;
              return (
                <button key={p.role} onClick={() => setUser({ name: name || p.title, role: p.role })} className="rounded-3xl border border-neutral-200 p-6 text-left shadow-sm transition hover:border-darty-red hover:bg-red-50">
                  <Icon className="mb-4 text-darty-red" size={38} />
                  <h2 className="text-2xl font-black">{p.title}</h2>
                  <p className="mt-2 text-neutral-600">{p.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }) {
  return <div className="rounded-3xl bg-white p-5 shadow-sm"><Icon className="mb-3 text-darty-red" /><p className="text-sm text-neutral-500">{label}</p><p className="text-2xl font-black">{value}</p></div>;
}

function BookingCard({ booking, store, children }) {
  const service = store.services.find((s) => s.id === booking.serviceId);
  const tech = store.technicians.find((t) => t.id === booking.technicianId);
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <p className="text-xs font-black text-darty-red">{booking.id}</p>
          <h3 className="text-xl font-black">{service?.name}</h3>
          <p className="mt-1 text-neutral-600">{booking.address}</p>
        </div>
        <span className="h-fit rounded-full bg-darty-dark px-3 py-1 text-sm font-bold text-white">{status[booking.status]}</span>
      </div>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-4">
        <p className="flex items-center gap-2"><Calendar size={16} /> {booking.date}</p>
        <p className="flex items-center gap-2"><Clock size={16} /> {booking.slot}</p>
        <p className="flex items-center gap-2"><Euro size={16} /> {service?.price},00</p>
        <p className="flex items-center gap-2"><Wrench size={16} /> {tech?.name || 'Por atribuir'}</p>
      </div>
      {children && <div className="mt-5 flex flex-wrap gap-2">{children}</div>}
    </article>
  );
}

function Client({ store, setStore, user }) {
  const [form, setForm] = useState({ serviceId: 'tv', address: '', date: '2026-05-04', slot: '14:00 - 16:00' });
  const service = store.services.find((s) => s.id === form.serviceId);
  const mine = store.bookings.filter((b) => b.clientName === user.name || b.clientName === 'Cliente Demo');

  function save(next) { setStore(next); localStorage.setItem('darty-servicos-store', JSON.stringify(next)); }
  function createBooking() {
    if (!form.address.trim()) return;
    save({ ...store, bookings: [{ id: `DTS-${Date.now().toString().slice(-4)}`, clientName: user.name, ...form, technicianId: null, status: 'pending', rating: null }, ...store.bookings] });
    setForm({ ...form, address: '' });
  }
  function rate(id, rating) { save({ ...store, bookings: store.bookings.map((b) => b.id === id ? { ...b, rating } : b) }); }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black">Agendar serviço</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {store.services.map((s) => {
            const Icon = iconMap[s.icon] || Wrench;
            const active = form.serviceId === s.id;
            return <button key={s.id} onClick={() => setForm({ ...form, serviceId: s.id })} className={`rounded-2xl border p-4 text-left ${active ? 'border-darty-red bg-red-50' : 'border-neutral-200'}`}><Icon className="mb-2 text-darty-red" /><p className="text-sm font-black">{s.category}</p></button>;
          })}
        </div>
        <label className="mt-5 block text-sm font-black">Morada</label>
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Rua, cidade" className="mt-2 w-full rounded-2xl border px-4 py-3" />
        <label className="mt-4 block text-sm font-black">Data</label>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 w-full rounded-2xl border px-4 py-3" />
        <label className="mt-4 block text-sm font-black">Horário</label>
        <select value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} className="mt-2 w-full rounded-2xl border px-4 py-3"><option>09:00 - 11:00</option><option>11:00 - 13:00</option><option>14:00 - 16:00</option><option>16:00 - 18:00</option></select>
        <div className="mt-5 rounded-2xl bg-neutral-100 p-4"><p className="text-sm text-neutral-500">Preço estimado</p><p className="text-3xl font-black">€{service?.price},00</p></div>
        <button onClick={createBooking} className="mt-5 w-full rounded-2xl bg-darty-red px-5 py-4 font-black text-white shadow-lg">CONFIRMAR PEDIDO</button>
      </aside>
      <section>
        <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat icon={Calendar} label="Pedidos" value={mine.length} /><Stat icon={Truck} label="Em curso" value={mine.filter((b) => b.status !== 'completed').length} /><Stat icon={Star} label="Avaliações" value={mine.filter((b) => b.rating).length} /></div>
        <h2 className="mb-4 text-2xl font-black">Os meus serviços</h2>
        <div className="space-y-4">{mine.map((b) => <BookingCard key={b.id} booking={b} store={store}>{b.status === 'on_way' && <button className="rounded-xl bg-darty-dark px-4 py-2 font-bold text-white"><MapPin className="mr-2 inline" size={16} />Ver técnico</button>}{b.status === 'completed' && !b.rating && [1,2,3,4,5].map((n) => <button key={n} onClick={() => rate(b.id, n)} className="rounded-xl border px-3 py-2 font-bold"><Star className="inline" size={15} /> {n}</button>)}{b.rating && <span className="font-black text-yellow-600">★ {b.rating}/5</span>}</BookingCard>)}</div>
      </section>
    </div>
  );
}

function Tech({ store, setStore }) {
  const tech = store.technicians[0];
  const jobs = store.bookings.filter((b) => !b.technicianId || b.technicianId === tech.id);
  function save(next) { setStore(next); localStorage.setItem('darty-servicos-store', JSON.stringify(next)); }
  function update(id, newStatus) { save({ ...store, bookings: store.bookings.map((b) => b.id === id ? { ...b, technicianId: tech.id, status: newStatus } : b) }); }
  return <section><div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat icon={Wrench} label="Técnico" value={tech.name.split(' ')[0]} /><Stat icon={Truck} label="Ativos" value={jobs.filter((j) => j.status !== 'completed').length} /><Stat icon={Star} label="Rating" value={tech.rating} /></div><h2 className="mb-4 text-2xl font-black">Serviços</h2><div className="space-y-4">{jobs.map((b) => <BookingCard key={b.id} booking={b} store={store}><button onClick={() => update(b.id, 'assigned')} className="rounded-xl border px-4 py-2 font-bold">Aceitar</button><button onClick={() => update(b.id, 'on_way')} className="rounded-xl bg-darty-dark px-4 py-2 font-bold text-white">A caminho</button><button onClick={() => update(b.id, 'arrived')} className="rounded-xl bg-darty-red px-4 py-2 font-bold text-white">Cheguei</button><button onClick={() => update(b.id, 'completed')} className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white"><CheckCircle className="mr-2 inline" size={16} />Concluir</button></BookingCard>)}</div></section>;
}

function Admin({ store, setStore }) {
  function save(next) { setStore(next); localStorage.setItem('darty-servicos-store', JSON.stringify(next)); }
  function assign(id, techId) { save({ ...store, bookings: store.bookings.map((b) => b.id === id ? { ...b, technicianId: techId, status: 'assigned' } : b) }); }
  const revenue = store.bookings.reduce((sum, b) => sum + (store.services.find((s) => s.id === b.serviceId)?.price || 0), 0);
  return <section><div className="mb-6 grid gap-4 sm:grid-cols-4"><Stat icon={Calendar} label="Pedidos" value={store.bookings.length} /><Stat icon={Users} label="Técnicos" value={store.technicians.length} /><Stat icon={Wrench} label="Serviços" value={store.services.length} /><Stat icon={Euro} label="Receita" value={`€${revenue}`} /></div><h2 className="mb-4 text-2xl font-black">Administração</h2><div className="space-y-4">{store.bookings.map((b) => <BookingCard key={b.id} booking={b} store={store}><select value={b.technicianId || ''} onChange={(e) => assign(b.id, e.target.value)} className="rounded-xl border px-4 py-2"><option value="">Atribuir técnico</option>{store.technicians.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></BookingCard>)}</div></section>;
}

export default function Page() {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(defaultStore());
  useEffect(() => {
    const saved = localStorage.getItem('darty-servicos-store');
    if (saved) setStore(JSON.parse(saved));
  }, []);
  if (!user) return <Login setUser={setUser} />;
  return <><Header user={user} setUser={setUser} /><main className="mx-auto max-w-6xl px-4 py-6">{user.role === 'client' && <Client store={store} setStore={setStore} user={user} />}{user.role === 'tech' && <Tech store={store} setStore={setStore} />}{user.role === 'admin' && <Admin store={store} setStore={setStore} />}</main></>;
}
