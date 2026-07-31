import { CodeBrackets, Menu, Xmark } from 'iconoir-react';
import { useState } from 'react';

const links = [
  ['Trabajo', '#trabajo'],
  ['Perfil', '#perfil'],
  ['Contacto', '#contacto'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark"><CodeBrackets aria-hidden="true" /></span>
        <span>JOSMAR.G</span>
      </a>

      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation">
        {open ? <Xmark /> : <Menu />}
        <span className="sr-only">Abrir navegación</span>
      </button>

      <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href="mailto:josmar.galindo.dev@gmail.com">Hablemos</a>
      </nav>
    </header>
  );
}
