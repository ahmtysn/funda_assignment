import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Woning niet gevonden</h1>
      <p>Deze woning bestaat niet meer of is verkocht.</p>
      <Link href="/">Terug naar overzicht</Link>
    </div>
  );
}
