import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/globals.scss';

// Default metadata - pages can override with generateMetadata
export const metadata: Metadata = {
  title: {
    default: 'Funda - Koopwoningen in Nederland',
    template: '%s',
  },
  description: 'Bekijk het aanbod van koopwoningen in Nederland op Funda.',
};

// Root layout - lang="nl" for Dutch SEO
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <header className="header">
          <div className="container header__inner">
            <Link href="/" aria-label="Funda home">
              <Image src="https://assets.fstatic.nl/shared/images/funda-logo-blue.svg" alt="funda" width={99} height={36} priority />
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">Funda Assignment</div>
        </footer>
      </body>
    </html>
  );
}
