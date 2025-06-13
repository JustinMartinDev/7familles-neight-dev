import '../styles/globals.css';
import { ModeProvider } from '../context/ModeContext';

export const metadata = {
  title: {
    template: '%s | Netlify',
    default: 'Netlify Starter'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen px-6 sm:px-12">
          <div className="flex flex-col w-full max-w-5xl mx-auto grow">
            <ModeProvider>
              <main className="grow">{children}</main>
            </ModeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
