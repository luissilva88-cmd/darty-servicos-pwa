import './globals.css';

export const metadata = {
  title: 'Darty Serviços',
  description: 'PWA de serviços ao domicílio',
  themeColor: '#e30613',
  appleWebApp: {
    capable: true,
    title: 'Darty Serviços',
    statusBarStyle: 'black-translucent'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
