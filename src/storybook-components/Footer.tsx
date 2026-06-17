import './footer.css';

interface FooterProps {
  copyright?: string;
  href?: string;
  links?: { label: string; href: string }[];
}

export const Footer = ({ copyright = '© 2026 My Company', href = '#', links = [] }: FooterProps) => {
  return (
    <footer className="footer">
      <span><a href={href}>{copyright}</a></span>
      {links.length > 0 && (
        <nav>
          {links.map(({ label, href }) => (
            <a key={href} href={href} style={{ marginLeft: '16px' }}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
};