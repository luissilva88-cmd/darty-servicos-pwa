export default function manifest() {
  return {
    name: 'Darty Serviços',
    short_name: 'Darty Serviços',
    description: 'Agendamento de serviços ao domicílio',
    start_url: '/',
    display: 'standalone',
    background_color: '#e30613',
    theme_color: '#e30613',
    orientation: 'portrait',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
