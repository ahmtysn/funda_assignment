import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Pagina niet gevonden</h1>
      <p>De pagina die je zoekt bestaat niet.</p>
      <Link href="/">Terug naar home</Link>
    </div>
  );
}
